import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../enums";
import useTab from "../customHooks/useTabs";

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.BG,
    borderRadius: 30,
    margin: 10,
    padding: 5,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    borderRadius: 30,
  },
  tabText: {},
  childrenContainer: {
    flex: 1,
    backgroundColor: "transparent",
    marginTop: 25,
  },
});

// Component
const TabView = ({ tabs, children }) => {
  const { activeTab, handlePress } = useTab(tabs);

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {tabs.map((tab, index) => {
          const isActive = activeTab === index;
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.tab,
                { backgroundColor: isActive ? "white" : "transparent" },
              ]}
              onPress={() => handlePress(index)}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: isActive ? "black" : "white" },
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.childrenContainer}>{children[activeTab]}</View>
    </View>
  );
};

export default TabView;
