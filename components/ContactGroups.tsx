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
  
    const renderContact = ({ item }) => (
      <View style={styles.contact}>
        <Text>{item.name}</Text>
      </View>
    );
  
    const renderGroup = ({ item }) => (
      <View style={styles.group}>
        <Text style={styles.groupTitle}>{item.nameGroup}</Text>
        <FlatList
          data={item.contacts}
          renderItem={renderContact}
          keyExtractor={(contact) => contact.id}
        />
      </View>
    );
  
    return (
    
        <FlatList
          data={contactGroups}
          renderItem={renderGroup}
          keyExtractor={(group) => group.idGroup}
        />
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    group: {
      marginBottom: 20,
    },
    groupTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    contact: {
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
    },
  });
  
  export default ContactGroups;