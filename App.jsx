import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  PanResponder,
  Animated,
  Image,
} from "react-native";

import Scan from "./src/widgets/Scan";

const App = () => {
  const [position, setPosition] = useState({
    x: 150, // 원 중심 X 좌표
    y: 400, // 원 중심 Y 좌표
    outgoingAngle: 200, // 나가는 방향 각도 (0도)
    incomingAngle: 100, // 들어오는 방향 각도 (90도)
  });

  const scale = useRef(new Animated.Value(1)).current; // 초기 크기 1

  const panResponder = useRef(
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
  ).current;

  useEffect(() => {
    // 확대 및 축소 애니메이션 반복
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.4, // 확대 비율
          duration: 500, // 애니메이션 시간 (밀리초)
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1, // 축소 비율
          duration: 500, // 애니메이션 시간 (밀리초)
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scale]);

  const calculateArrowPosition = (angle, radius) => {
    // 각도를 라디안으로 변환
    const radian = (angle * Math.PI) / 180;
    // X, Y 위치 계산
    const arrowX = position.x + radius * Math.cos(radian);
    const arrowY = position.y - radius * Math.sin(radian); // Y축은 반대로 이동
    return { arrowX, arrowY };
  };

  const outgoingPosition = calculateArrowPosition(position.outgoingAngle, 20);
  const incomingPosition = calculateArrowPosition(position.incomingAngle, 35);

  return (
    <>
      <ImageBackground
        source={require("./assets/images/map.png")}
        style={styles.container}
      >
        {/* 중심 점 */}
        <Animated.View
          style={[
            styles.point,
            {
              left: position.x - 12,
              top: position.y - 12,
              transform: [{ scale }], // 애니메이션으로 크기 조정
            },
          ]}
          {...panResponder.panHandlers}
        />

        {/* 나가는 방향 화살표 */}
        <Image
          source={require("./assets/images/arrow.png")}
          style={[
            styles.arrowOut,
            {
              left: outgoingPosition.arrowX - 15, // 화살표 중심 맞춤
              top: outgoingPosition.arrowY - 15, // 화살표 중심 맞춤
              transform: [
                { scaleX: -1 },
                { rotate: `${position.outgoingAngle}deg` },
              ], // 각도 회전
            },
          ]}
        />

        {/* 들어오는 방향 화살표 */}
        <Image
          source={require("./assets/images/arrow.png")}
          style={[
            styles.arrowIn,
            {
              left: incomingPosition.arrowX - 15, // 화살표 중심 맞춤
              top: incomingPosition.arrowY - 15, // 화살표 중심 맞춤
              transform: [{ rotate: `${-position.incomingAngle}deg` }], // 각도 회전
            },
          ]}
        />
      </ImageBackground>

      <Scan />
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
