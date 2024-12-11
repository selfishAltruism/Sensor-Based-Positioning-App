import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

import { BleManager } from "react-native-ble-plx";

import { postData, checkState } from "../services/main";
import { resizingX, resizingY } from "../utils/points";

const INTERVER = 1000;
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
      x: resizingX(res.x), // 원 중심 X 좌표
      y: resizingY(res.y), // 원 중심 Y 좌표
    });

    setLabel(res.label);

    devices.current = [];
    console.log("[블루투스 값 전송 완료]");
  };

  const stopScanning = () => {
    initializeData();

    console.log("[스캔 종료]");
    bleManager.stopDeviceScan();

    //다시 시작
    startChecking();
  };

  const startScanning = () => {
    console.log("[스캔 시작]");
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

    setTimeout(() => {
      stopScanning();
    }, 5000);
  };

  const startChecking = () => {
    const interval = setInterval(async () => {
      const res = await checkState();

      setPosition({
        x: resizingX(res.x), // 원 중심 X 좌표
        y: resizingY(res.y), // 원 중심 Y 좌표
      });

      setLabel(res.label);

      if (res.label === "" && stop) {
        clearInterval(scanInterval);
        startScanning();
      }
    }, INTERVER);

    setScanInterval(interval);
    setIsScanning(true);
  };

  const stopChecking = () => {
    clearInterval(scanInterval);
    setIsScanning(false);
  };

  const checkingHandler = () => {
    if (isScanning) {
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
      top: 20,
      left: 20,
      fontSize: 20,
      fontWeight: "bold",
    },
  });

  return (
    <>
      <Text style={styles.text}>{label}</Text>
      <TouchableOpacity style={styles.button} onPress={checkingHandler}>
        <Text style={styles.buttonText}>
          {isScanning ? "SCAN OFF" : "SCAN ON"}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default Scan;
