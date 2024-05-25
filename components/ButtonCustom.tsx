import React from "react";
import { Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Link } from "react-router-native";
import { ButtonCustomProps } from "../types";
import { COLORS } from "../enums";

const ButtonCustom: React.FC<ButtonCustomProps> = ({
  to,
  children,
  color = COLORS.BUTTON,
  onPress,
  shadow = false,
}) => {
  const buttonStyle = [
    styles.button,
    { backgroundColor: color },
    shadow ? styles.shadow : null,
  ];

  if (to) {
    return (
      <Link to={to} style={buttonStyle}>
        <Text style={styles.text}>{children}</Text>
      </Link>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  shadow: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    android: {
      elevation: 5,
    },
  }),
});

export default ButtonCustom;
