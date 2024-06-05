import React, { useEffect } from "react";
import Toast, { BaseToast } from "react-native-toast-message";
import { useToast } from "../customHooks/useToast";

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "green" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
      }}
    />
  ),
  error: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "red" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
      }}
    />
  ),
};

const ToastWrapper = () => {
  const { toastData, hideToast } = useToast();

  useEffect(() => {
    if (toastData.isVisible) {
      Toast.show({
        type: toastData.type,
        text1: toastData.message,
      });
    }
  }, [toastData]);

  return (
    <Toast
      config={toastConfig}
      visibilityTime={3000}
      autoHide={true}
      onHide={hideToast}
      position="top"
    />
  );
};

export default ToastWrapper;
