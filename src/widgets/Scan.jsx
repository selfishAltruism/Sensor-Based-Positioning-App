import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

import { BleManager } from "react-native-ble-plx";

import { postData, checkState } from "../services/main";
import { resizingX, resizingY, resizingAngle } from "../utils/points";
import EightDirectionButton from "./EightDirectionButton";

const INTERVAL = 1000;
const bleManager = new BleManager();

const Scan = ({ setPosition }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanInterval, setScanInterval] = useState(null);

  const [label, setLabel] = useState(false);

  const devices = useRef([]);

  // Bluetooth 장치 검색 함수
  const initializeData = async () => {
    const res = await postData({
      key: Date.now() + "-bluetooth",
      value: devices.current,
    });

    setPosition({
      x: resizingX(res.coordination[0]), // 원 중심 X 좌표
      y: resizingY(res.coordination[1]), // 원 중심 Y 좌표
      outgoingAngle: resizingAngle(res.direction),
    });

    setLabel(res.label);

    console.log("[블루투스 값 전송 완료]");
  };

  const stopScanning = async () => {
    await initializeData();

    console.log("[스캔 종료 & INTERVAL 실행]");

    const interval = setInterval(async () => {
      const res = await checkState();

      setPosition({
        x: resizingX(res.coordination[0]),
        y: resizingY(res.coordination[1]),
        outgoingAngle: resizingAngle(res.direction),
      });

      setLabel(res.label);

      if (res.request) {
        clearInterval(interval);
        startScanning();
      }
    }, INTERVAL);

    setScanInterval(interval);
  };

  const startScanning = () => {
    console.log("[스캔 시작]");
    devices.current = [];

    setTimeout(() => {
      stopScanning();
    }, 5000);
  };

  const startChecking = () => {
    bleManager.startDeviceScan([], null, (error, device) => {
      if (error) console.log(error);
      if (device && !devices.current.some((d) => d.id === device.id)) {
        devices.current.push({
          id: device.id,
          name: device.name,
          rssi: device.rssi,
        });
      }
    });

    const interval = setInterval(async () => {
      const res = await checkState();

      setPosition({
        x: resizingX(res.coordination[0]),
        y: resizingY(res.coordination[1]),
        outgoingAngle: resizingAngle(res.direction),
      });

      setLabel(res.label);

      if (res.request) {
        clearInterval(interval);
        startScanning();
      }
    }, INTERVAL);

    setScanInterval(interval);
    setIsScanning(true);
  };

  const stopChecking = () => {
    bleManager.stopDeviceScan();
    clearInterval(scanInterval);
    setIsScanning(false);
  };

  const checkingHandler = () => {
    if (!isScanning) {
      startChecking();
    } else {
      stopChecking();
    }
  };

  const styles = StyleSheet.create({
    button: {
      position: "absolute",
      top: 20,
      right: 20,
      padding: 10,
      backgroundColor: isScanning ? "#920007" : "#0f0092",
      borderRadius: 5,
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
    },
    text: {
      position: "absolute",
      top: 68,
      right: 20,
      width: 80,
      textAlign: "center",
      borderRadius: 5,
      backgroundColor: "white",
      fontSize: 18,
      fontWeight: "bold",
    },
  });

  return (
    <>
      <Text style={styles.text}>{label ? label : "NaN"}</Text>
      <TouchableOpacity style={styles.button} onPress={checkingHandler}>
        <Text style={styles.buttonText}>
          {isScanning ? "SCAN OFF" : "SCAN ON"}
        </Text>
      </TouchableOpacity>
      <EightDirectionButton />
    </>
  );
};

export default Scan;
