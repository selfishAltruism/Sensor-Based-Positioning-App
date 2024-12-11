import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, ImageBackground, Animated } from "react-native";

import Scan from "./src/widgets/Scan";
import requestBluetoothPermission from "./src/permissions/requestBluetoothPermission";

const App = () => {
  const [position, setPosition] = useState({
    x: 340, // 원 중심 X 좌표
    y: 750, // 원 중심 Y 좌표
  });

  const scale = useRef(new Animated.Value(1)).current; // 초기 크기 1

  useEffect(() => {
    requestBluetoothPermission();
  }, []);

  /* const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        // 드래그 중 좌표 업데이트
        setPosition((prevPosition) => ({
          ...prevPosition,
          x: gestureState.moveX,
          y: gestureState.moveY,
        }));
      },
    })
  ).current; */

  useEffect(() => {
    // 확대 및 축소 애니메이션 반복
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 0.8,
          duration: 500, // 애니메이션 시간 (밀리초)
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1.2,
          duration: 500, // 애니메이션 시간 (밀리초)
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scale]);

  return (
    <>
      <ImageBackground
        source={require("./assets/images/map.png")}
        style={styles.container}
      >
        <Animated.View
          style={[
            styles.point,
            {
              left: position.x - 12,
              top: position.y - 12,
              transform: [{ scale }], // 애니메이션으로 크기 조정
            },
          ]}
        />
      </ImageBackground>

      <Scan setPosition={(point) => setPosition(point)} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  point: {
    width: 24,
    height: 24,
    backgroundColor: "#d40000ce",
    borderRadius: 25,
    position: "absolute",
  },
  arrowIn: {
    width: 30,
    height: 30,
    position: "absolute",
  },
  arrowOut: {
    width: 30,
    height: 30,
    position: "absolute",
  },
});

export default App;
