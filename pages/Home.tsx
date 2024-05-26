import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TabView from "../components/TabView";
import { COLORS, ICONS } from "../enums";
import Contacts from "./Contacts";
import AppBarCustom from "../components/AppBarCustom";

const Home = () => {
  return (
    <View style={styles.container}>
      <AppBarCustom tabs={["Contacts", "Groups", "Settings"]}>
        <Contacts />
        <View>
          <Text>Group</Text>
        </View>
        <View>
          <Text>Settings</Text>
        </View>
      </AppBarCustom>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 0.3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  gradiant: {
    flex: 1,
  },
  logoContainer: {
    marginRight: 20,
  },
  title: {
    color: COLORS.WHITE,
    fontWeight: "bold",
    fontSize: 34,
  },
  body: {
    flex: 0.7,
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 15,
  },
  container: {
    flex: 1,
  },
});

export default Home;
