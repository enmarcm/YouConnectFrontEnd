import { useState, useEffect } from "react";
import { Animated } from "react-native";

const useFocusAnimation = (focus: boolean) => {
  const [focusAnim] = useState(new Animated.Value(0));
  opacity: 0;

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: focus ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [focus]);

  const translateY = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  return translateY;
};

export default useFocusAnimation;
