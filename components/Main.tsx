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
import AddContact from "./AddContact";
import ContactPage from "./ContactPage";
import GroupPage from "./GroupPage";
import ToastWrapper from "./ToastWrapper";
import AddGroup from "./AddGroup";
import SelectContacts from "./SelectContact";
import EditContact from "./EditContact";

const Main = () => {
  useBackButtonHandler();
  const { isLoading } = useContext(LoadingContext);

  return (
    <View style={viewStyle}>
      <StatusBar style="dark" />
      <Routes>
        <Route path={ROUTES.START} element={<Start />} />
        <Route path={ROUTES.AUTH} element={<Auth />} />
        <Route path={ROUTES.HOME} element={<Home />}></Route>
        <Route path={ROUTES.ADDCONTACT} element={<AddContact />} />
        <Route path="/addGroup" element={<AddGroup />} />
        <Route path="/contactSelection" element={<SelectContacts />} />
        <Route path="/home/contacts/:id" element={<ContactPage />} />
        <Route path="/groups/view/:id" element={<GroupPage />} />
        <Route path="/editContact/:id" element={<EditContact />} />
      </Routes>
      {isLoading && <Loader />}
      <ToastWrapper />
    </View>
  );
};

const viewStyle = {
  marginTop: Constants.statusBarHeight,
  flex: 1,
};

export default Main;
