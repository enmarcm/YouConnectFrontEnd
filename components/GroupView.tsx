import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import useGroups from "../customHooks/useGroups";
import GroupsItem from "../components/GroupsItem";

const GroupView = () => {
  const groups = useGroups();

  if (!Array.isArray(groups) || groups.length === 0) {
    return (
      <View style={styles.noGroupsContainer}>
        <Text style={styles.noGroupsText}>No Groups in the account</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => <GroupsItem group={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10, // Añadido para dar espacio alrededor de la lista
  },
  noGroupsContainer: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center", // Añadido para centrar verticalmente en caso de que haya espacio
    flex: 1, // Asegura que el contenedor ocupe todo el espacio disponible
  },
  noGroupsText: {
    fontSize: 20,
    fontWeight: "600", // Cambiado de 600 a "600" para asegurar compatibilidad
    color: "#333", // Añadido para definir un color de texto
  },
  listContentContainer: {
    paddingBottom: 10, // Añadido para dar espacio al final de la lista
  },
});

export default GroupView;
