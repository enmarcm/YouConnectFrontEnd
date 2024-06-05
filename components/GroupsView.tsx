import React from "react";
import { View, Text, FlatList } from "react-native";
import GroupsItem from "./GroupsItem";
import useGroups from "../customHooks/useGroups";

const GroupsView = () => {
  const groups = useGroups();

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
    </View>
  );
};

export default GroupsView;
