import React from "react";
import{ View, Text, StyleSheet } from "react-native";
import GradientBackground from "../components/GradientBackground";
import { COLORS } from "../enums";
import FormikInputValue from "../components/FormikInputValue";
import { Formik } from "formik";

const Contacts = () => {
    const initialValues = {
        contact: "",
    }
    const handleSubmitFunction = async (values: any, {resetForm}) => {

    }

    return (    
        <GradientBackground style={styles.body}>
            <Formik
        initialValues={initialValues}
        onSubmit={handleSubmitFunction}
        >
            {({handleSubmit}) => {
                return (
                    <View >
                        <FormikInputValue name="contact" type="contact" placeholder="Search"/>
                    </View>
                )
            }}
        </Formik>
        </GradientBackground>
    )
}


const styles = StyleSheet.create({
    header: {
      flex: 0.3,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    logoContainer: {
      marginRight: 20,
    },
    title: {
      color: COLORS.WHITE,
      fontWeight: "bold",
      fontSize: 34,
    },
    body: {
      flex: 0.074,
      backgroundColor: COLORS.WHITE,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      padding: 15,
    },
    container: {
      flex: 1,
    },
  });

export default Contacts;