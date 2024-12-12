import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { putDirection } from "../services/main";

const EightDirectionButton = () => {
  const [selectedDirection, setSelectedDirection] = useState(null);

  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

  const handleDirectionPress = (direction) => {
    setSelectedDirection(direction);
    console.log(`Selected direction: ${direction}`);

    putDirection(direction + 1);
  };

  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      top: 110,
      right: 11,
      width: 100,
      height: 100,
      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      borderRadius: 20,
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: () => ({
      color: "black",
      fontWeight: "bold",
      fontSize: 18,
    }),
    circleButton: (index) => ({
      position: "absolute",
      transform: [
        { rotate: `${index * 45}deg` },
        { translateX: -0 },
        { translateY: -50 },
      ],
    }),
  });

  return (
    <View style={styles.container}>
      {directions.map((direction, index) => (
        <TouchableOpacity
          key={direction}
          style={[styles.button, styles.circleButton(index)]}
          onPress={() => handleDirectionPress(index)}
        >
          <Text
            style={{
              ...styles.buttonText(),
              color: selectedDirection === index ? "#d40000" : "black",
            }}
          >
            {direction}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default EightDirectionButton;
