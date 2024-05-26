import React from "react";
import { Alert, TextInput, View } from "react-native";
import { Formik } from "formik";
import ButtonCustom from "./ButtonCustom";
import FormikInputValue from "./FormikInputValue";
import { loginValidationSchema } from "../schemas/login";
import useFetcho from "../customHooks/useFetcho";
import { URL_REQUEST } from "../enums";

const Login = () => {
  const fetchWithLoading = useFetcho();
  const initialValues = {
    userName: "",
    password: "",
  };

  const handleSubmitFunction = async (values: any, { resetForm }) => {
    console.log(values);
    const data = await fetchWithLoading({
      url: URL_REQUEST.URL_LOGIN,
      method: "POST",
      body: values,
    });

    Alert.alert("Values", JSON.stringify(values));
    Alert.alert("Data", JSON.stringify(data));
  };

  return (
    <Formik
      validationSchema={loginValidationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmitFunction} //!Aqui vamos a hacer la peticion a la API
    >
      {({ handleSubmit }) => {
        return (
          <View style={{ gap: 10 }}>
            <FormikInputValue name="userName" type="userName" placeholder="username" />
            <FormikInputValue
              name="password"
              type="password"
              placeholder="password"
            />
            <ButtonCustom onPress={handleSubmit}>Login</ButtonCustom>
          </View>
        );
      }}
    </Formik>
  );
};

export default Login;
