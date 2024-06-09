import { FC } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { useNavigate } from "react-router-native";
import { GroupItemProps } from "../types";

const GroupsItem: FC<GroupItemProps> = ({ group }) => {
  const navigate = useNavigate();

  const handlePress = () => {
    navigate(`/groups/view/${group.id}`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.groupContainer}>
        <Text style={styles.groupName}>{group.name}</Text>
        <Text style={styles.groupDescription}>{group.description}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  groupContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  groupName: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#333",
  },
  groupDescription: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
});

export default GroupsItem;
