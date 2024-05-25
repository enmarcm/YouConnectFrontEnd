import GradientBackground from "../components/GradientBackground";
import { Text, View, StyleSheet } from "react-native";
import Logo from "../components/Logo";
import { COLORS } from "../enums";
import TabView from "../components/TabView";

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
        <View>
          <Text>Login</Text>
        </View>
        <View>
          <Text>Register</Text>
        </View>
      </TabView>
    </View>
  );
};

const Auth = () => {
  return (
    <GradientBackground>
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
  },
  container: {
    flex: 1,
  },
});

export default Auth;
