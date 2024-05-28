import React from "react";
import { Alert, View } from "react-native";
import { Formik } from "formik";
import ButtonCustom from "./ButtonCustom";
import FormikInputValue from "./FormikInputValue";
import { loginValidationSchema } from "../schemas/login";
import useFetcho from "../customHooks/useFetcho";
import { URL_REQUEST, ROUTES } from "../enums";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useNavigate } from "react-router-native";

const Login = () => {
  const {fetchWithLoading, setIsLoading} = useFetcho();
  const { setItem } = useAsyncStorage("UserLogged");
  const navigation = useNavigate();

  const initialValues = {
    userName: "",
    password: "",
  };

  const config: any = {
    method: "POST",
    credentials: "include",
    cors: false ? "cors" : "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const handleSubmitFunction = async (values: any) => {
    try {
      setIsLoading(true);
      const data = await fetchWithLoading({
        url: URL_REQUEST.URL_LOGIN,
        method: "POST",
        body: values,
        config: config,
      });

      const { token, message } = data as any;

      if (token) {
        await setItem(JSON.stringify(token));
        navigation(ROUTES.HOME);

        return;
      } else {
        Alert.alert("Error", JSON.stringify(message));
        return;
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error.message);
    }finally{
      setIsLoading(false)
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
