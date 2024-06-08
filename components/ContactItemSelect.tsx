import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Checkbox } from "react-native-paper";

interface ContactItemSelectExProps {
  contact: {
    id: string;
    name: string;
    phone: string;
  };
  selected: boolean;
  onSelectChange: (selected: boolean) => void; // Agregar esta línea
}

const ContactItemSelect: React.FC<ContactItemSelectExProps> = ({
  contact,
  selected,
  onSelectChange,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onSelectChange(!selected)}
    >
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{contact.name}</Text>
        <Text style={styles.phone}>{contact.phone}</Text>
      </View>
      <Checkbox
        status={selected ? "checked" : "unchecked"}
        onPress={() => onSelectChange(!selected)}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  phone: {
    fontSize: 14,
    color: "#666",
  },
  contact: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  selectedContact: {
    backgroundColor: "#e0e0e0", // Un color de fondo diferente para destacar
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  checkmark: {
    // Estilo para el ícono o texto que indica selección
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: "-50%" }],
  },
});

export default ContactItemSelect;
