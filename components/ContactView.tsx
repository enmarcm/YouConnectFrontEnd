import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, FlatList} from "react-native";

const ContactsView = (contacts: any) => {

    const contactsView = [{
        id: 1,
        name: "John Doe",
        phoneNumber: "1234567890"
    }];

    return (
        <View style={styles.container}>
            <FlatList
                data={contactsView}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text style={styles.item}>{item.name}</Text>
                        <Text>{item.phoneNumber}</Text>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 22,
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  });
export default ContactsView;