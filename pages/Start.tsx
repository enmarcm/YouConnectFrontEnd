import { View, Text, StyleSheet, Platform } from "react-native";
import Logo from "../components/Logo";
import ButtonCustom from "../components/ButtonCustom";
import { ROUTES } from "../enums";

const Start = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
        <Text style={styles.text}>Ready for connect?</Text>
      </View>

      <View style={styles.buttonContainer}>
        <ButtonCustom to={ROUTES.AUTH} shadow>Start</ButtonCustom>
      </View>
      <View style={styles.buttonContainer}>
        <ButtonCustom to={ROUTES.HOME} shadow>Home</ButtonCustom>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  logoContainer: {
    flex: 0.55,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
    marginTop: 45,
  },
  buttonContainer: {
    flex: 0.45,
    justifyContent: "center",
    width: "80%",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});

export default Start;