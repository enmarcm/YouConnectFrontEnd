import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, ICONS } from "../enums";
import useTab from "../customHooks/useTabs";
import Icon from "react-native-vector-icons/Ionicons";

// Styles
const stylesFunct = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    tabsContainer: {
      flexDirection: "row",
      backgroundColor: COLORS.BG,
      padding: 5,
      position: "absolute",
      bottom: 0,
      width: "100%",
      height: 80,
      zIndex: 1,
    },
    tab: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 15,
      margin: 5,
    },
    tabText: {
      color: "white",
    },
    childrenContainer: {
      flex: 1,
      backgroundColor: "transparent",
      marginBottom: 60,
    },
  });

const AppBarCustom: React.FC<{ tabs: string[], children: React.ReactNode[] }> = ({ tabs, children }) => {
  const { activeTab, handlePress } = useTab(tabs);
  const styles = stylesFunct();

  return (
    <View style={styles.container}>
      <View style={styles.childrenContainer}>{children[activeTab]}</View>
      <View style={styles.tabsContainer}>
        {tabs.map((tab: string, index: number) => {
          const isActive = activeTab === index;
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.tab,
                {
                  backgroundColor: isActive ? COLORS.SECONDARY : "transparent",
                  elevation: isActive ? 5 : 0, // for Android
                  shadowOpacity: isActive ? 0.5 : 0, // for iOS
                },
              ]}
              onPress={() => handlePress(index)}
            >
              {tab in ICONS && <Icon name={ICONS[tab]} size={20} color="white" />}
              <Text style={styles.tabText}>{tab}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default AppBarCustom;