import React, { useState, useEffect } from "react";
import {
  View,
  SectionList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import getItemLayout from "react-native-section-list-get-item-layout";
import useContacts from "../customHooks/useContacts";
import { FAB } from "react-native-paper";
import { useNavigate } from "react-router-native";
import ContactItemSelect from "./ContactItemSelect";
import { useSelectedContacts } from "../context/SelectContactsContext";

interface SelectContactsProps {
  onSelectionConfirm?: () => void; 
}

const SelectContacts = ({ onSelectionConfirm }: SelectContactsProps) => {
  const { contactView, loading } = useContacts();
  const navigate = useNavigate();
  const {
    selectedContacts: initiallySelectedContacts,
    setSelectedContacts: toggleContacts,
  } = useSelectedContacts();
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  useEffect(() => {
    setSelectedContacts(initiallySelectedContacts);
  }, [initiallySelectedContacts]);

  if (loading) return null;

  if (!Array.isArray(contactView) || contactView.length === 0) {
    return (
      <View style={styles.centeredView}>
        <Text style={styles.boldText}>No Contacts</Text>
        <Text style={styles.regularText}>You don't have any contacts yet.</Text>
      </View>
    );
  }

  const handleToggleContactSelection = (id: string) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(
        selectedContacts.filter((contactId) => contactId !== id)
      );
    } else {
      setSelectedContacts([...selectedContacts, id]);
    }
  };

  const contactsGroupedByLetter = contactView.reduce(
    (groupedContacts, contact) => {
      const firstLetter = contact.name[0].toUpperCase();
      if (!groupedContacts[firstLetter]) {
        groupedContacts[firstLetter] = [];
      }
      groupedContacts[firstLetter].push(contact);
      return groupedContacts;
    },
    {}
  );

  const sections = Object.keys(contactsGroupedByLetter)
    .sort()
    .map((letter) => ({
      title: letter,
      data: contactsGroupedByLetter[letter],
    }));

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleToggleContactSelection(item.id)}>
      <ContactItemSelect
        contact={item}
        selected={selectedContacts.includes(item.id)}
        onSelectChange={() => handleToggleContactSelection(item.id)}
      />
    </TouchableOpacity>
  );

  // Paso 2: Usar la propiedad en el componente
  const handleConfirmSelection = () => {
    toggleContacts(selectedContacts);
    navigate(-1);
    // Aquí puedes llamar a onSelectionConfirm si es necesario
    if (onSelectionConfirm) {
      onSelectionConfirm();
    }
    // No es necesario actualizar el contexto aquí si ya se actualiza en toggleContactSelection
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        getItemLayout={getItemLayout({
          getItemHeight: () => 30,
          getSectionHeaderHeight: () => 15,
        })}
      />
      <FAB
        style={styles.fab}
        small
        icon="check"
        onPress={handleConfirmSelection}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 20,
    paddingLeft: 10,
    paddingTop: 1,
    paddingBottom: 1,
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  boldText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  regularText: {
    fontSize: 16,
    color: "#666",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default SelectContacts;
