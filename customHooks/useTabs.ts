import { useRef, useState } from "react";
import { Animated, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const useTab = (tabs: string[]) => {
  const [activeTab, setActiveTab] = useState(0);
  const indicatorPosition = useRef(new Animated.Value(0)).current;

  const handlePress = (index: number) => {
    if (index === activeTab) return;

    setActiveTab(index);
    Animated.timing(indicatorPosition, {
      toValue: (index * width) / tabs.length,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return { activeTab, handlePress };
};

export default useTab;
