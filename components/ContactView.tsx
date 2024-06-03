import React, { useContext } from "react";
import { View, SectionList, Text, StyleSheet } from "react-native";
import { ContactItemProps } from "../types";
import ContactItem from "./ContactItem";
import getItemLayout from "react-native-section-list-get-item-layout";
import useContacts from "../customHooks/useContacts";

const ContactsView = () => {
  const contacts = useContacts();
  console.log(contacts);

  if (!Array.isArray(contacts) || contacts.length === 0) {
    return (
      <View style={{ padding: 16, alignItems: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: 600 }}>No contacts!</Text>
      </View>
    );
  }

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
});

export default ContactsView;
