import React, { FC } from "react";
import { View, Text, StyleSheet, SectionList } from "react-native";
import ContactItem from "./ContactItem";
import getItemLayout from "react-native-section-list-get-item-layout";
import useGroupsPage from "../customHooks/useGroupPage";
import { useParams } from "react-router-native";

const GroupPage: FC = () => {
  const { id } = useParams();
  const { _doc: groupDetails, contacts } = useGroupsPage({ id }) as any;

  if (!Array.isArray(contacts) || contacts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noContacts}>No contacts!</Text>
      </View>
    );
  }

  const contactsGroupedByLetter = contacts.reduce((groupedContacts: any, contact: any) => {
    const firstLetter = contact.name[0].toUpperCase();
    if (!groupedContacts[firstLetter]) {
      groupedContacts[firstLetter] = [];
    }
    groupedContacts[firstLetter].push(contact);
    return groupedContacts;
  }, {});

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
      <View style={styles.groupDetails}>
        <Text style={styles.groupName}>{groupDetails.name}</Text>
        <Text style={styles.groupDescription}>{groupDetails.description}</Text>
        <Text style={styles.groupMaxContacts}>Max Contacts: {groupDetails.maxContacts}</Text>
      </View>
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
  groupDetails: {
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  groupName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  groupDescription: {
    fontSize: 16,
    marginTop: 4,
  },
  groupMaxContacts: {
    fontSize: 14,
    marginTop: 4,
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
  centered: {
    padding: 16,
    alignItems: "center",
  },
  noContacts: {
    fontSize: 20,
    fontWeight: "600",
  },
});

export default GroupPage;