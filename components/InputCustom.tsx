import React, { useState } from "react";
import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ICONS } from "../enums";
import useInputStyles from "../customHooks/useInputsStyles";
import useFocusAnimation from "../customHooks/useFocusAnimation";

const InputCustom = ({
  style = {},
  type = "text",
  error,
  onChangeText,
  ...props
}) => {
  const { secureTextEntry, handleEyePress, inputStyle, containerStyle } =
    useInputStyles({ type, style, error, styles });

  const translateY = useFocusAnimation(props.focus);

  const [date, setDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    setDate(date);
    hideDatePicker();
    if (onChangeText) onChangeText(date.toISOString());
    return;
  };

  return (
    <Animated.View style={[{ transform: [{ translateY }] }]}>
      <View style={containerStyle}>
        {type in ICONS && <Icon name={ICONS[type]} size={20} />}
        {type === "date" ? (
          <TouchableOpacity
            onPress={showDatePicker}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Icon
              name="calendar-outline"
              size={20}
              style={{ marginRight: 10 }}
            />
            <Text style={{ color: "gray" }}>
              {date ? date.toLocaleDateString() : "MM/DD/YYYY"}
            </Text>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </TouchableOpacity>
        ) : (
          <TextInput
            style={inputStyle}
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}
            {...props}
          />
        )}
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
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 7,
    marginTop: 7,
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
    marginTop: -5,
    marginLeft: 10,
  },
});

export default InputCustom;
