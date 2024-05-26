import React, { useContext } from "react";
import { View } from "react-native";
import { Route, Routes } from "react-router-native";
import Start from "../pages/Start";
import { ROUTES } from "../enums";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { useBackButtonHandler } from "../customHooks/useBackButtonHandler";
import Auth from "../pages/Auth";
import Loader from "./Loader";
import { LoadingContext } from "../context/LoadingContext";
import Home from "../pages/Home";

const Main = () => {
  useBackButtonHandler();
  const { isLoading } = useContext(LoadingContext);

  return (
    <View style={viewStyle}>
      <StatusBar style="dark" />
      {isLoading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path={ROUTES.START} element={<Start />} />
          <Route path={ROUTES.AUTH} element={<Auth />} />
          <Route path={ROUTES.HOME} element={<Home />}></Route>
        </Routes>
      )}
    </View>
  );
};

const viewStyle = {
  marginTop: Constants.statusBarHeight,
  flex: 1,
};

export default Main;
