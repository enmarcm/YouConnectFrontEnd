import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import useFetcho from "../customHooks/useFetcho";
import { Formik } from "formik";
import FormikInputValue from "./FormikInputValue";
import ButtonCustom from "./ButtonCustom";
import { ROUTES, URL_REQUEST } from "../enums";
import { useToast } from "../customHooks/useToast";
import { useNavigate } from "react-router-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelectedContacts } from "../context/SelectContactsContext";

const AddGroup = () => {
  const { getItem } = useAsyncStorage("UserLogged");
  const fetchWithLoading = useFetcho();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { selectedContacts, setSelectedContacts, formValues, setFormValues } =
    useSelectedContacts();

  const initialValues = formValues;
  console.log(initialValues);

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
    console.log("Valores del formulario antes de enviar:", values);

    let token = await getItem();
    console.log("Token recuperado:", token);

    if (typeof token === "string") {
      token = token.split("Bearer ")[1].split('"')[0];
      config.headers.Authorization = "Bearer " + token;
    }

    if (!values.name || !values.description) {
      showToast("Name and description are required", "error");
      return;
    }

    const newValues = {
      ...values,
      contacts: selectedContacts,
    };

    try {
      const data = (await fetchWithLoading({
        url: URL_REQUEST.URL_ADD_GROUP,
        method: "POST",
        body: newValues,
        config: config,
      })) as any;

      if (data.error) {
        return showToast(data.error, "error");
      }

      showToast("Group added", "success");
    } catch (error) {
      console.error(error);
      showToast("Error adding group", "error");
    } finally {
      setFormValues({ name: "", description: "" });
      setSelectedContacts([]);
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
          <Icon name="people-circle-outline" size={150} color="#333" />
        </View>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmitFunction}
          enableReinitialize
        >
          {({ handleSubmit, values }) => (
            <>
              <FormikInputValue
                name="name"
                type="name"
                placeholder="Name"
              />
              <FormikInputValue
                name="description"
                type="text"
                placeholder="Description"
              />
              <ButtonCustom
                onPress={() => {
                  setFormValues(values);
                  navigate("/contactSelection");
                }}
              >
                Select Contacts
              </ButtonCustom>
              <View>
                {selectedContacts.length > 0 && (
                  <Text>{`${selectedContacts.length} contact(s) selected`}</Text>
                )}
              </View>
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

export default AddGroup;
