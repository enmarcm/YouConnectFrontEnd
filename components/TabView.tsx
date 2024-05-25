import React from "react";
import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from "react-native";
import { COLORS } from "../enums";
import useTab from "../customHooks/useTabs";

const tabStyle = (isActive: boolean): ViewStyle => ({
  flex: 1,
  alignItems: "center",
  padding: 10,
  borderRadius: 30,
  backgroundColor: isActive ? 'white' : 'transparent'
});
const textStyle = (isActive: boolean): TextStyle => ({ color: isActive ? 'black' : 'white' });

const TabView = ({ tabs, children }: { tabs: string[], children: React.ReactNode[] }) => {
  const { activeTab, handlePress } = useTab(tabs);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", backgroundColor: COLORS.BG, borderRadius: 30, margin: 10, padding: 5 }}>
        {tabs.map((tab, index) => {
          const isActive = activeTab === index;
          return (
            <TouchableOpacity
              key={index}
              style={tabStyle(isActive)}
              onPress={() => handlePress(index)}
            >
              <Text style={textStyle(isActive)}>{tab}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={{ flex: 1, backgroundColor: 'transparent' }}>
        {children[activeTab]}
      </View>
    </View>
  );
};

export default TabView;