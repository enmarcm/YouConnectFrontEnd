import { useNavigate, useLocation } from "react-router-native";
import { useBackHandler } from "@react-native-community/hooks"; 

import { ROUTES } from "../enums";

export const useBackButtonHandler = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useBackHandler(() => {
    if (pathname === ROUTES.START) return false;
    navigate(-1);
    return true;
  });
};
