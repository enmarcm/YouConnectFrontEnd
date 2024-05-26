import React from "react";
import { Alert, View } from "react-native"
import { Formik } from "formik";
import ButtonCustom from "./ButtonCustom";
import FormikInputValue from "./FormikInputValue";
import { loginValidationSchema } from "../schemas/login";
import useFetcho from "../customHooks/useFetcho";
import { URL_REQUEST, ROUTES } from "../enums";
import {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";

const Login = () => {
  const fetchWithLoading = useFetcho();
  const { setItem } = useAsyncStorage("UserLogged");

  const initialValues = {
    userName: "",
    password: "",
  };

  const handleSubmitFunction = async (values: any) => {
    try {
      const data = await fetchWithLoading({
        url: URL_REQUEST.URL_LOGIN,
        method: "POST",
        body: values,
      });

      await setItem(JSON.stringify(data));

      Alert.alert("Values", JSON.stringify(values));
      Alert.alert("Data", JSON.stringify(data));
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error.message);
    }
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
            <FormikInputValue
              name="userName"
              type="userName"
              placeholder="Username"
            />
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
