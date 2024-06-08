import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-native";
import FormikInputValue from "./FormikInputValue";
import ButtonCustom from "./ButtonCustom";
import { ROUTES, URL_REQUEST } from "../enums";
import { useToast } from "../customHooks/useToast";
import useFetcho from "../customHooks/useFetcho";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const fetchWithLoading = useFetcho();
  const { getItem } = useAsyncStorage("UserLogged");
  const [initialValues, setInitialValues] = useState({
    name: "",
    number: "",
    email: "",
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const token = await getItem();
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const data = await fetchWithLoading({
          url: `${URL_REQUEST.URL_VIEW_CONTACT}/${id}`,
          method: "GET",
          config: config,
        });
        if (data) {
          setInitialValues({
            name: data.name as any,
            number: data.number as any,
            email: data.email as any,
          });
        }
      } catch (error) {
        console.error(error);
        showToast("Error fetching contact", "error");
      }
    };

    fetchContact();
  }, [id]);

  const handleSubmitFunction = async (values) => {
    try {
      const token = await getItem();
      const config = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      };

      const data = (await fetchWithLoading({
        url: `${URL_REQUEST.URL_UPDATE_CONTACT}/${id}`,
        config: config,
      })) as any;

      if (data.error) {
        showToast(data.error, "error");
      } else {
        showToast("Contact updated successfully", "success");
        navigate(ROUTES.HOME);
      }
    } catch (error) {
      console.error(error);
      showToast("Error updating contact", "error");
    }
  };

  const handleDelete = async () => {
    try {
      const token = await getItem();
      const config = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = (await fetchWithLoading({
        url: `${URL_REQUEST.URL_DELETE_CONTACT}/${id}`,
        config: config,
      })) as any;

      if (data.error) {
        showToast(data.error, "error");
      } else {
        showToast("Contact deleted successfully", "success");
        navigate(ROUTES.HOME);
      }
    } catch (error) {
      console.error(error);
      showToast("Error deleting contact", "error");
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
          //   validationSchema={editContactSchema}
        >
          {({ handleSubmit }) => (
            <>
              <FormikInputValue name="name" type="name" placeholder="Name" />
              <FormikInputValue
                name="number"
                type="string"
                placeholder="+584261231234"
              />
              <FormikInputValue name="email" type="email" placeholder="Email" />
              <ButtonCustom onPress={handleSubmit}>Update</ButtonCustom>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDelete}
              >
                <Text style={styles.deleteButtonText}>Delete Contact</Text>
              </TouchableOpacity>
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
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  deleteButton: {
    marginTop: 20,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default EditContact;
