import React from "react";
import { Alert, View } from "react-native";
import { Formik } from "formik";
import ButtonCustom from "./ButtonCustom";
import FormikInputValue from "./FormikInputValue";
import useFetcho from "../customHooks/useFetcho";
import { URL_REQUEST } from "../enums"
import { registerValidationSchema } from "../schemas/register";

const Register = () => {
    const fetchWithLoading = useFetcho();
    const initialValues = {
        userName: "",
        password: "",
        email: "",
        dateOfBirth: "",
    }
    const config: any = {
        method: "POST",
        credentials: "include",
        cors: false ? "cors" : "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
      };

    const handleSubmitFunction = async (values: any, {resetForm}) => {
        console.log(values)
        const data = await fetchWithLoading({
            url: URL_REQUEST.URL_REGISTER,
            method: "POST",
            body: values,
            config: config
        });

        Alert.alert("Values", JSON.stringify(values));
        Alert.alert("Data", JSON.stringify(data));
    }

    return (
        <Formik
        validationSchema={registerValidationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmitFunction}
        >
            {({handleSubmit}) => {
                return (
                    <View style={{gap: 10}}>
                        <FormikInputValue name="userName" type="userName" placeholder="username" />
                        <FormikInputValue name="password" type="password" placeholder="password" />
                        <FormikInputValue name="email" type="email" placeholder="e-mail" />
                        <FormikInputValue name="dateOfBirth" type="dateOfBirth" placeholder="month-day-year" />
                        <ButtonCustom onPress={handleSubmit}>Register</ButtonCustom>
                    </View>
                )
            }}
        </Formik>
    )
}

export default Register;