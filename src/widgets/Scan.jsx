import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

import { BleManager } from "react-native-ble-plx";
import {
  magnetometer,
  setUpdateIntervalForType,
  gyroscope,
  accelerometer, // 가속도계 추가
  SensorTypes,
} from "react-native-sensors";

const INTERVER = 1000;
const bleManager = new BleManager();

const Scan = () => {
  const [isScanning, setIsScanning] = useState(false); // 스캔 중 상태
  const [scanInterval, setScanInterval] = useState(null); // 스캔 간격 관리

  const magSubscription = useRef(null);
  const gyroSubscription = useRef(null);
  const accelSubscription = useRef(null);

  // 스캔 데이터 종합
  const [bluetouthData, setBluetouthData] = useState(false);
  const [magData, setMagData] = useState(false);
  const [gyroData, setGyroData] = useState(false);
  const [accelhData, setAccelData] = useState(false);

  const devices = useRef([]);

  // Bluetooth 장치 검색 함수
  const scanBluetouth = () => {
    setBluetouthData(devices.current);
    devices.current = [];
    console.log("블루투스 측정 완료");
  };

  const startScanning = () => {
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
      scanBluetouth();
    }, INTERVER);

    setScanInterval(interval);
    setIsScanning(true);
  };

  const stopScanning = () => {
    console.log("[종료]");
    clearInterval(scanInterval);
    bleManager.stopDeviceScan();
    setIsScanning(false);

    if (gyroSubscription.current) gyroSubscription.current.unsubscribe();
    if (magSubscription.current) magSubscription.current.unsubscribe();
    if (accelSubscription.current) accelSubscription.current.unsubscribe();
  };

  useEffect(() => {
    if (isScanning) {
      if (magSubscription.current) magSubscription.current.unsubscribe();
      setUpdateIntervalForType(SensorTypes.magnetometer, INTERVER);
      magSubscription.current = magnetometer.subscribe(
        (data) => {
          setMagData(data);
          console.log("마그네토미터 측정 완료");
        },
        (error) => console.error("마그네토미터 오류: ", error)
      );
    } else {
      if (magSubscription.current) magSubscription.current.unsubscribe();
    }
  }, [isScanning]);

  useEffect(() => {
    if (isScanning) {
      if (gyroSubscription.current) gyroSubscription.current.unsubscribe();
      setUpdateIntervalForType(SensorTypes.gyroscope, INTERVER);
      gyroSubscription.current = gyroscope.subscribe(
        (data) => {
          setGyroData(data);
          console.log("자이로 측정 완료");
        },
        (error) => console.error("자이로 오류: ", error)
      );
    } else {
      if (gyroSubscription.current) gyroSubscription.current.unsubscribe();
    }
  }, [isScanning]);

  useEffect(() => {
    if (isScanning) {
      if (accelSubscription.current) accelSubscription.current.unsubscribe(); // 기존 구독 해제
      setUpdateIntervalForType(SensorTypes.accelerometer, INTERVER);
      accelSubscription.current = accelerometer.subscribe(
        (data) => {
          setAccelData(data);
          console.log("가속도계 측정 완료");
        },
        (error) => console.error("가속도계 오류: ", error)
      );
    } else {
      if (accelSubscription.current) accelSubscription.current.unsubscribe(); // 구독 해제
    }
  }, [isScanning]);

  useEffect(() => {
    if (bluetouthData && gyroData && magData && accelhData) {
      console.log(bluetouthData, gyroData, magData, accelhData);
      setAccelData(false);
      setBluetouthData(false);
      setGyroData(false);
      setMagData(false);
    }
  }, [bluetouthData, gyroData, magData, accelhData]);

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
  });

  const scanHandler = () => {
    if (isScanning) {
      stopScanning();
    } else {
      startScanning();
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={scanHandler}>
        <Text style={styles.buttonText}>
          {isScanning ? "SCAN OFF" : "SCAN ON"}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default Scan;
