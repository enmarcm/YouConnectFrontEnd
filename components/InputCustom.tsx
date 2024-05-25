import React, { useState, useEffect } from "react";
import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ICONS } from "../enums";
import useInputStyles from "../customHooks/useInputsStyles";
import useFocusAnimation from "../customHooks/useFocusAnimation";

const InputCustom = ({ style = {}, type = "text", error, ...props }) => {
  const { secureTextEntry, handleEyePress, inputStyle, containerStyle } =
    useInputStyles({ type, style, error, styles });

  const translateY = useFocusAnimation(props.focus);

  return (
    <Animated.View style={[styles.view, { transform: [{ translateY }] }]}>
      <View style={containerStyle}>
        {type in ICONS && <Icon name={ICONS[type]} size={20} />}
        <TextInput
          style={inputStyle}
          secureTextEntry={secureTextEntry}
          {...props}
        />
        {type === "password" && (
          <TouchableOpacity onPress={handleEyePress}>
            <Icon
              name={secureTextEntry ? "eye-off-outline" : "eye-outline"}
              size={20}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  errorContainer: {
    borderColor: "red",
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
  },
  errorText: {
    color: "red",
    marginTop: -15,
    marginLeft: 10,
  },
  view: {
    marginVertical: 10,
  },
});

export default InputCustom;
