import React from "react";
import { View } from "react-native";
import { Formik } from "formik";
import ButtonCustom from "./ButtonCustom";
import FormikInputValue from "./FormikInputValue";
import useFetcho from "../customHooks/useFetcho";
import { URL_REQUEST } from "../enums";
import { registerValidationSchema } from "../schemas/register";
import { useToast } from "../customHooks/useToast";

const Register = () => {
  const { showToast } = useToast();
  const fetchWithLoading = useFetcho();
  const initialValues = {
    userName: "",
    password: "",
    email: "",
    dateOfBirth: "",
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
    const data = (await fetchWithLoading({
      url: URL_REQUEST.URL_REGISTER,
      method: "POST",
      body: values,
      config: config,
    })) as any;

    data?.error
      ? showToast(data.error, "error")
      : showToast("Register", "success");
  };

  return (
    <Formik
      validationSchema={registerValidationSchema}
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
            <FormikInputValue name="email" type="email" placeholder="E-mail" />
            <FormikInputValue
              name="password"
              type="password"
              placeholder="Password"
            />
            <FormikInputValue
              name="dateOfBirth"
              type="date"
              placeholder="month-day-year"
            />
            <ButtonCustom onPress={handleSubmit}>Register</ButtonCustom>
          </View>
        );
      }}
    </Formik>
  );
};

export default Register;
