import { View } from "react-native";
import { Route, Routes } from "react-router-native";
import Start from "../pages/Start";
import { ROUTES } from "../enums";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { useBackButtonHandler } from "../customHooks/useBackButtonHandler";
import Auth from "../pages/Auth";

const Main = () => {
  useBackButtonHandler();

  return (
    <View style={viewStyle}>
      {/* <AppBar/>  <-- En este ApppBar hay que meter lo de StatusBar -> Mientras lo pongo fuera*/}

      <StatusBar style="light" />
      <Routes>
        <Route path={ROUTES.START} element={<Start />} />
        <Route path={ROUTES.AUTH} element={<Auth />} />
      </Routes>
    </View>
  );
};

const viewStyle = {
  marginTop: Constants.statusBarHeight,
  flex: 1,
};

export default Main;
