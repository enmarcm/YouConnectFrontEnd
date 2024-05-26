import GradientBackground from "../components/GradientBackground";
import { Text, View, StyleSheet } from "react-native";
import Logo from "../components/Logo";
import { COLORS } from "../enums";
import TabView from "../components/TabView";
import Login from "../components/Login";
import Register from "../components/Register";

const AuthHeader = () => {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Logo color={COLORS.WHITE} width={85} />
      </View>
      <Text style={styles.title}>YouConnect</Text>
    </View>
  );
};

const AuthBody = () => {
  return (
    <View style={styles.body}>
      <TabView tabs={["Login", "Register"]}>
        <Login />
        <View>
          <Register />
        </View>
      </TabView>
    </View>
  );
};

const Auth = () => {
  return (
    <GradientBackground style={styles.gradiant}>
      <View style={styles.container}>
        <AuthHeader />
        <AuthBody />
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 0.3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  gradiant:{
    flex: 1,
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
    flex: 0.7,
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
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

export default Auth;
