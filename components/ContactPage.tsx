import React, { FC, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useParams } from 'react-router-native';
import { StyleSheet } from 'react-native';
import useContactsPage from '../customHooks/useContactsPage';
import { Image } from 'react-native'; // Import the Image component from react-native

const ContactPage: FC = () => {
const { id } = useParams();


    const data:any = useContactsPage({id})
    console.log(data)

    if (!data) {
            return <Text>Loading...</Text>;
    }

    return (
            <View style={styles.container}>
                <Image style={styles.image} source={{ uri: data.image }} />
                <Text style={styles.name}>{data.name}</Text>
                <Text style={styles.email}>{data.email}</Text>
                <Text style={styles.number}>{data.number}</Text>
            </View>
        );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  email: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 10,
  },
  number: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#333333',
    padding: 10,
    marginTop: 20,
  },
});

export default ContactPage;