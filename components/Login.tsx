import React from "react";
import { Alert, TextInput, View } from "react-native";
import { Formik } from "formik";
import ButtonCustom from "./ButtonCustom";
import FormikInputValue from "./FormikInputValue";
import { loginValidationSchema } from "../schemas/login";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <Formik
      validationSchema={loginValidationSchema}
      initialValues={initialValues}
      onSubmit={(values) => Alert.alert(JSON.stringify(values))} //Aqui vamos a hacer la peticion a la API
    >
      {({ handleSubmit }) => {
        return (
          <View>
            <FormikInputValue name="email" type="email" placeholder="E-mail" />
            <FormikInputValue
              name="password"
              type="password"
              placeholder="Password"
            />
            <ButtonCustom onPress={handleSubmit}>Login</ButtonCustom>
          </View>
        );
      }}
    </Formik>
  );
};

export default Login;
