import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import useFetcho from "../customHooks/useFetcho";
import { Formik } from "formik";
import FormikInputValue from "./FormikInputValue";
import ButtonCustom from "./ButtonCustom";
import { ROUTES, URL_REQUEST } from "../enums";
import { useToast } from "../customHooks/useToast";
import addContactSchema from "../schemas/addContact";
import { useNavigate } from "react-router-native";
import useContacts from "../customHooks/useContacts";

const AddContact = () => {
  const { getItem } = useAsyncStorage("UserLogged");
  const fetchWithLoading = useFetcho();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    number: "",
    email: "",
  };

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
      if (!values.email) delete values.email;

      const data = (await fetchWithLoading({
        url: URL_REQUEST.URL_ADD_CONTACT,
        method: "POST",
        body: values,
        config: config,
      })) as any;

      if (data.error) {
        return showToast(data.error, "error");
      }

      showToast("Contact added", "success");

    } catch (error) {
      console.error(error);
      showToast("Error adding contact", "error");
    } finally {
      navigate(ROUTES.HOME);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            style={styles.profileImage}
          />
        </View>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmitFunction}
          validationSchema={addContactSchema}
        >
          {({ handleSubmit }) => (
            <>
              <FormikInputValue name="name" type="name" placeholder="Name" />
              <FormikInputValue
                name="number"
                type="string"
                placeholder="+584261231234"
                multiple
                onlyNumber
              />
              <FormikInputValue name="email" type="email" placeholder="Email" />
              <ButtonCustom onPress={handleSubmit}>Add</ButtonCustom>
            </>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 30,
    gap: 10,
    flexGrow: 1,
  },
  item: {
    backgroundColor: "#f9c2ff",
    height: 150,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  flexContainer: {
    flex: 1,
  },
});

export default AddContact;
