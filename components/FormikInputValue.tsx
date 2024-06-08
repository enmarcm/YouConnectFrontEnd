import { useField } from "formik";
import { useState, useEffect } from "react";
import InputCustom from "./InputCustom";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const FormikInputValue = ({
  name,
  type,
  placeholder,
  multiple = false,
  ...props
}) => {
  const [_field, meta, helpers] = useField(name);
  const [values, setValues] = useState(multiple ? [""] : [""]);
  const [animations, setAnimations] = useState(
    multiple ? [new Animated.Value(0)] : [new Animated.Value(0)]
  );

  useEffect(() => {
    animations.forEach((animation, _index) => {
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  }, [animations]);

  const handleValueChange = (value, index) => {
    if (multiple) {
      const updatedValues = [...values];
      updatedValues[index] = value;
      setValues(updatedValues);
      helpers.setValue(updatedValues);
    } else {
      setValues([value]);
      helpers.setValue(value);
    }
  };

  const addInput = () => {
    const newAnimations = [...animations, new Animated.Value(0)];
    setAnimations(newAnimations);
    setValues([...values, ""]);
  };

  const removeInput = (index) => {
    const filteredValues = values.filter((_, i) => i !== index);
    const newAnimations = animations.filter((_, i) => i !== index);
    Animated.timing(animations[index], {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setAnimations(newAnimations);
      setValues(filteredValues);
      helpers.setValue(multiple ? filteredValues : filteredValues[0] || "");
    });
  };

  return (
    <View>
      {multiple ? (
        values.map((value, index) =>
          animations[index] ? (
            <Animated.View
              key={index}
              style={[
                styles.inputContainer,
                {
                  opacity: animations[index],
                  transform: [
                    {
                      scale: animations[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.5, 1],
                      }),
                    },
                  ],
                },
              ]}
            >
              <InputCustom
                type={type}
                placeholder={placeholder}
                onBlur={() => helpers.setTouched(true)}
                value={value}
                onChangeText={(text) => handleValueChange(text, index)}
                error={meta.touched && meta.error}
                style={styles.input}
                {...props}
              />
              {values.length > 1 && (
                <TouchableOpacity
                  onPress={() => removeInput(index)}
                  style={styles.removeButton}
                >
                  <Icon name="close" size={20} color="white" />
                </TouchableOpacity>
              )}
            </Animated.View>
          ) : null
        )
      ) : (
        <InputCustom
          type={type}
          placeholder={placeholder}
          onBlur={() => helpers.setTouched(true)}
          value={values[0]}
          onChangeText={(text: string) => handleValueChange(text, 0)}
          error={meta.touched && meta.error}
          {...props}
        />
      )}
      {multiple && (
        <TouchableOpacity onPress={addInput} style={styles.addButton}>
          <Icon name="add" size={20} color="white" />
          <Text style={{ color: "#fff" }}>Add More</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "center",
  },
  input: {
    flex: 1,
  },
  removeButton: {
    marginLeft: 10,
    marginRight: 10,
    padding: 8,
    borderRadius: 100,
    backgroundColor: "#cb3234",
  },
  addButton: {
    alignSelf: "flex-end",
    flexDirection: "row",
    backgroundColor: "#072fae",
    padding: 8,
    borderRadius: 400,
    color: "#fff",
  },
});

export default FormikInputValue;
