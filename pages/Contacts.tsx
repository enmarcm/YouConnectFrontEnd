import React from "react";
import { View, Text, StyleSheet } from "react-native";
import GradientBackground from "../components/GradientBackground";
import { COLORS } from "../enums";
import FormikInputValue from "../components/FormikInputValue";
import { Formik } from "formik";
import ContactsView from "../components/ContactView";

const Contacts = () => {
  const initialValues = {
    contact: "",
  };
  const handleSubmitFunction = async (values: any, { resetForm }) => {};

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
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
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
});

export default Contacts;
