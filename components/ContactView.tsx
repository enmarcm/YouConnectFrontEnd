import React from "react";
import { View, SectionList, Text, StyleSheet } from "react-native";
import { ContactItemProps } from "../types";
import ContactItem from "./ContactItem";
import getItemLayout from "react-native-section-list-get-item-layout";
import useContacts from "../customHooks/useContacts";

const ContactsView = () => {
  const contacts = useContacts();

  const contactsGroupedByLetter = contacts.reduce(
    (groupedContacts: any, contact: any) => {
      const firstLetter = contact.name[0].toUpperCase();
      if (!groupedContacts[firstLetter]) {
        groupedContacts[firstLetter] = [];
      }
      groupedContacts[firstLetter].push(contact);
      return groupedContacts;
    },
    {}
  );

  // Convierte el objeto en un array de secciones para SectionList
  const sections = Object.keys(contactsGroupedByLetter)
    .sort()
    .map((letter) => ({
      title: letter,
      data: contactsGroupedByLetter[letter],
    }));

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const renderItem = ({ item }) => <ContactItem contact={item} />;

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 20,
    paddingLeft: 10,
    paddingTop: 1,
    paddingBottom: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 10
  },
});

export default ContactsView;
