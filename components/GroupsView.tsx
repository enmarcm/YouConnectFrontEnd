import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import GroupsItem from "./GroupsItem";
import useGroups from "../customHooks/useGroups";
import { FAB } from "react-native-paper";
import { COLORS } from "../enums";
import { useNavigate } from "react-router-native";

const GroupsView = () => {
  const groups = useGroups();
  const navigate = useNavigate();
  const handleAddGroup = () => navigate("/addGroup");

  if (!Array.isArray(groups) || groups.length === 0) {
    return (
      <View style={{ padding: 16, alignItems: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: 600 }}>No Groups</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => <GroupsItem group={item} />;

  return (
    <View>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <FAB style={styles.fab} icon="plus"onPress={handleAddGroup}/>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    marginRight: 20,
  },
  title: {
    color: COLORS.WHITE,
    fontWeight: "bold",
    fontSize: 34,
  },
  body: {
    flex: 0.1,
    backgroundColor: COLORS.WHITE,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1.84,
    elevation: 5,
    padding: 10,
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

export default GroupsView;
