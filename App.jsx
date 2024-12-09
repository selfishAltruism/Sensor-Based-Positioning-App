import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  PanResponder,
  Animated,
} from "react-native";

const App = () => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const scale = useRef(new Animated.Value(1)).current; // 초기 크기 1

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        // 드래그 중 좌표 업데이트
        setPosition({
          x: gestureState.moveX,
          y: gestureState.moveY,
        });
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
              left: position.x - 25,
              top: position.y - 25,
              transform: [{ scale }], // 애니메이션으로 크기 조정
            },
          ]}
          {...panResponder.panHandlers}
        />
      </ImageBackground>
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>SCAN</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
    backgroundColor: "#0f0092",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  point: {
    width: 25,
    height: 25,
    backgroundColor: "#ffa600ce",
    borderRadius: 25,
    position: "absolute",
  },
});

export default App;
