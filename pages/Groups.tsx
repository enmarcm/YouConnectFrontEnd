import React from "react";
import { View, StyleSheet } from "react-native";
import { COLORS } from "../enums";
import { FAB } from "react-native-paper";
import GroupView from "../components/GroupView";
import { useNavigate } from "react-router-native";

const Groups = () => {
  const navigate = useNavigate();
  const handleAddGroup = () => navigate("/addGroup");

  return (
    <View style={styles.container}>
      <GroupView />

      <FAB style={styles.fab} icon="plus" onPress={handleAddGroup} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: COLORS.WHITE,
    fontWeight: "bold",
    fontSize: 34,
  },
  container: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 16,
    backgroundColor: "#9bfabc",
  },
});

export default Groups;
