import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import useFetcho from "../customHooks/useFetcho";
import { number } from "yup";
import { Formik } from "formik";
import FormikInputValue from "./FormikInputValue";
import ButtonCustom from "./ButtonCustom";
import { URL_REQUEST } from "../enums";


const AddContact = () => {
    const {getItem} = useAsyncStorage("UserLogged");
    const fetchWithLoading = useFetcho();
    const initialValues = {
        name: "",
        number: [],
        email: "",
    }

    const config: any = {
        method: "POST",
        credentials: "include",
        cors: false ? "cors" : "no-cors",
        headers: {
            "Content-Type": "application/json",
            Authorization: {},
        },


    };

    const handleSubmitFunction = async (values: any) => {
        let token = await getItem();
        if (typeof token === "string") {
            token = token.split("Bearer ")[1].split('"')[0];
            config.headers.Authorization = "Bearer " + token;
        }

        try {
            const data = await fetchWithLoading({
                url: URL_REQUEST.URL_ADD_CONTACT,
                method: "POST",
                body: values,
                config: config,
            });
            const {message} = data as any;
            console.log(message);

        } catch (error) {
            console.error(error);
            Alert.alert("Error", error.message);
        }

    }

    return (
        <Formik
        initialValues={initialValues}
        onSubmit={handleSubmitFunction}
        >
            {({handleSubmit}) => {
                return(
                    <View>
                        <FormikInputValue
                        name="name"
                        type="name"
                        placeholder="Name"
                        />
                        <FormikInputValue
                        name="number"
                        type="number"
                        placeholder="Number"
                        />
                        <FormikInputValue
                        name="email"
                        type="email"
                        placeholder="Email"
                        />
                        <ButtonCustom onPress={handleSubmit}>Add</ButtonCustom>                   
                    </View>
                )
            }}
        </Formik>
    )
    
} 
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      backgroundColor: '#f9c2ff',
      height: 150,
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      justifyContent: 'flex-start', // Centra el contenido en la parte superior
      alignItems: 'center', // Centra el contenido horizontalmente
    },
    text: {
      fontSize: 18,
      color: '#333',
      textAlign: 'center', // Centra el texto horizontalmente
    },
    // ...
  });

export default AddContact;