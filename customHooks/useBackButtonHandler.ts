import { useEffect } from "react";
import { BackHandler } from "react-native";
import { useNavigate, useLocation } from "react-router-native";
import { ROUTES } from "../enums";

export const useBackButtonHandler = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const onBackPress = () => {
      if (pathname === ROUTES.START) return false;
      navigate(-1);
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  }, [navigate, pathname]);
};
