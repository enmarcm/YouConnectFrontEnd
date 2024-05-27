import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, FlatList} from "react-native";
import useFetcho from "../customHooks/useFetcho";
import { URL_REQUEST } from "../enums";
import { useCallback } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const ContactsView =  (contacts: any) => {
    const { getItem } = useAsyncStorage("UserLogged");
    const fetchWithLoading = useFetcho();

    const contactView = [{
        id: 1,
        name: "John Doe",
        phoneNumber: "1234567890"
    }];

    const config: any = {
        method: "GET",
        credentials: "include",
        cors: false ? "cors" : "no-cors",
        headers: {
          "Content-Type": "application/json",
          "Authorization": {},
        },
      };

        const fetchAllContacts = async () => {
          let token = await getItem();
        //   console.log(typeof token);
          if (typeof token === 'string') {
            token = token.split("Bearer ")[1].split('"')[0];
            // console.log(token);
            config.headers.Authorization = "Bearer " + token;;
          }
      
          try {
            const data = await fetchWithLoading({
              url: URL_REQUEST.URL_CONTACTS,
              config: config,
            });
            // console.log(data);
            console.log(data);
            return data;
          } catch (error) {
            console.error(error);
          }
        };

        // const contact = fetchAllContacts();
        // console.log(contact);
        useEffect(() => {
            fetchAllContacts()
    
            });

    return (
        <View style={styles.container}>
            <FlatList
                data={contactView}
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