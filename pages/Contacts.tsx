import React from "react";
import { View, StyleSheet } from "react-native";
import GradientBackground from "../components/GradientBackground";
import { COLORS } from "../enums";
import FormikInputValue from "../components/FormikInputValue";
import { Formik } from "formik";
import ContactsView from "../components/ContactView";
import { useNavigate } from "react-router-native";
import { FAB } from "react-native-paper";

const Contacts = () => {
  const initialValues = {
    contact: "",
  };
  const navigate = useNavigate()
  const handleSubmitFunction = async (_values: any) => {};
  const handleAddContact = () => navigate("/addContact");

  return (
    <View style={styles.container}>
      <GradientBackground style={styles.body}>
        <Formik initialValues={initialValues} onSubmit={handleSubmitFunction}>
          {({}) => {
            return (
              <View>
                <FormikInputValue
                  name="Contacts"
                  type="Contacts"
                  placeholder="Search"
                />
              </View>
            );
          }}
        </Formik>
      </GradientBackground>
      <ContactsView />
      <FAB style={styles.fab} icon="plus" onPress={handleAddContact} />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    marginRight: 20,
  },
  title: {
    color: COLORS.WHITE,
    fontWeight: "bold",
    fontSize: 34,
  },
  body: {
    flex: 0.1,
    backgroundColor: COLORS.WHITE,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1.84,
    elevation: 5,
    padding: 10,
  },
  container: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Contacts;
