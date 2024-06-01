import React, { useContext, useEffect, useState } from "react";
import { View, SectionList, Text, StyleSheet, StatusBar, VirtualizedList } from "react-native";
import { ContactItemProps } from "../types";
import ContactItem from "./ContactItem";
import getItemLayout from "react-native-section-list-get-item-layout";
import useGroups from "../customHooks/useGroups";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native";
import { number } from "yup";

import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import useContactGroups from "../customHooks/useContactGroups";


const ContactGroups = () => {
    const contactGroups = useContactGroups();
  
    const renderItem = ({ item }) => (
      <ContactItem contact={item} />
    );
  
    const renderSectionHeader = ({ section: { title } }) => (
      <Text style={styles.sectionHeader}>{title}</Text>
    );
  
    return (
      <View>
        <SectionList
          sections={contactGroups.map(group => ({ title: group.nameGroup, data: group.contacts }))}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingLeft: 10,
    paddingTop: 1,
    paddingBottom: 1,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  item: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
});
  
  export default ContactGroups;