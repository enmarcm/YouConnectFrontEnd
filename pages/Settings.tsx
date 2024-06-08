import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native';
import ButtonCustom from '../components/ButtonCustom';
import FormikInputValue from '../components/FormikInputValue';
import { Formik, useFormikContext } from 'formik';
import useGetUser from '../customHooks/useGetUser';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import useFetcho from '../customHooks/useFetcho';
import { COLORS, ROUTES, URL_REQUEST } from '../enums';
import { useNavigate } from 'react-router-native';

interface User {
    username: string;
    email: string;
    dateOfBirth: string;
  }

  // Asumiendo que estos son los datos usuario
  const initialValues: any = {
    userName: '',
    email: '',
    dateOfBirth: '',
  };
  
  const SettingsForm = () => {
    const { values } = useFormikContext<any>();
    const [isEditing, setIsEditing] = useState(false);
    const { getItem } = useAsyncStorage("UserLogged");
    const fetchWithLoading = useFetcho();
    const userinfo = useGetUser();
    console.log(userinfo);

    const config: any = {
        method: "PUT",
        credentials: "include",
        cors: false ? "cors" : "no-cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: {},
        },
      };


    const handleEdit = async () => {
      setIsEditing(!isEditing);
    }

    const handleSumbmit = async (values: any) => {
        console.log(values);
        let token = await getItem();
        console.log(token);
      if (typeof token === "string") {
        token = token.split("Bearer ")[1].split('"')[0];
        config.headers.Authorization = "Bearer " + token;
      }
  
      try {
        const data = (await fetchWithLoading({
          url: URL_REQUEST.URL_EDIT_USER,
          method: "PUT",
          body: values,
          config: config,
        })) as any;
        if (data.error) {
          console.log(data.error);
        }
      }catch (error) {
        console.error(error);
      }
      setIsEditing(!isEditing);
      };
  
    return (
          <View style={styles.container}>
        <>
        {isEditing ? (
          <>
            <FormikInputValue name="userName" type="userName" placeholder="Name" />
            <FormikInputValue
              name="dateOfBirth"
              type="date"
              placeholder="01/01/2000"
              onlyNumber
              />
            <FormikInputValue name="email" type="email" placeholder="Email" />
            <ButtonCustom onPress={() => handleSumbmit(values)}>Save</ButtonCustom>
          </>
        ) : (
            <>
            <Text style={styles.text}>Username: {values.userName ? values.userName :userinfo.userName }</Text>
            <Text style={styles.text}>Email: {values.email ? values.email: userinfo.email}</Text>
            <Text style={styles.text}>Birth Date: {values.dateOfBirth ? values.dateOfBirth: userinfo.dateOfBirth}</Text>
            <ButtonCustom onPress={handleEdit}>Edit</ButtonCustom>
          </>
        )}
      </>
    </View>
    );
  };
  
  const SettingsUser = () => {

    // const userinfo = useGetUser();
    // console.log(userinfo);
    const { getItem } = useAsyncStorage("UserLogged");
    const fetchWithLoading = useFetcho();
    const navigate = useNavigate();
    
    const config: any = {
        method: "DELETE",
        credentials: "include",
        cors: false ? "cors" : "no-cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: {},
        },
      };

    const handleSumbmit = async (values: any) => {
     console.log(values);
    };

    const handleDelete = async () => {
        let token = await getItem();
        console.log(token);
            Alert.alert(
                'Delete Account',
                'Are you sure you want to delete your account?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Delete',
                        style: 'destructive',
                        onPress: async () => {
                        if (typeof token === "string") {
                            token = token.split("Bearer ")[1].split('"')[0];
                            config.headers.Authorization = "Bearer " + token;
                        }
  
                        try {
                            const data = (await fetchWithLoading({
                            url: URL_REQUEST.URL_DELETE_USER,
                            method: "DELETE",
                            config: config,
                            })) as any;
                            if (data.error) {
                            console.log(data.error);
                            }
                        }catch (error) {
                            console.error(error);
                        } finally{
                            navigate(ROUTES.START);
                        }
                        },
                    },
                ],
                { cancelable: false }
            );
        };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>User Information</Text>
        <Formik initialValues={initialValues} onSubmit={handleSumbmit}>
          <SettingsForm />
        </Formik>
        <View>
            <ButtonCustom color={COLORS.DELETE} onPress={handleDelete}>Delete Account</ButtonCustom>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: '#333',
        marginBottom: 30,
      },
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    //   alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 20,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#666',
      marginBottom: 10,
    },
    form: {
      width: '80%',
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#007BFF',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
  });
  
  export default SettingsUser;

