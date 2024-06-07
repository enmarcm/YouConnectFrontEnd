import React from "react";
import { View } from "react-native";
import { Formik } from "formik";
import ButtonCustom from "./ButtonCustom";
import FormikInputValue from "./FormikInputValue";
import { loginValidationSchema } from "../schemas/login";
import useFetcho from "../customHooks/useFetcho";
import { URL_REQUEST, ROUTES } from "../enums";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useNavigate } from "react-router-native";
import { useToast } from "../customHooks/useToast";

const Login = () => {
  const fetchWithLoading = useFetcho();
  const { setItem } = useAsyncStorage("UserLogged");
  const navigation = useNavigate();
  const { showToast } = useToast();

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
      const data = await fetchWithLoading({
        url: URL_REQUEST.URL_LOGIN,
        method: "POST",
        body: values,
        config: config,
      });

      const { token, error: errorData } = data as any;
      const message = errorData ? errorData : "";

      if (token) {
        await setItem(JSON.stringify(token));
        showToast("Login", "success");
        navigation(ROUTES.HOME);

        return;
      } else {
        showToast(`Error: ${message}`, "error");
        return;
      }
    } catch (error) {
      console.error(error);
      showToast(`Error: ${error}`, "error");
    }
  };

  return (
    <Formik
      validationSchema={loginValidationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmitFunction} 
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