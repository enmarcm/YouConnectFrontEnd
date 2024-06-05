import React, { createContext, useState } from "react";
import { ToastContextType } from "../types";

const initialValues: ToastContextType = {
  toastData: {
    isVisible: false,
    message: "",
    type: "success",
  },
  toggleToast: () => {},
  showToast: (message: string, type: string) => {},
  hideToast: () => {},
};

export const ToastContext = createContext(initialValues);

export const ToastProvider = ({ children }) => {
  const [toastData, setToastData] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });

  function hideToast() {
    setToastData((prevToastData) => ({
      ...prevToastData,
      isVisible: false,
    }));
  }

  function toggleToast() {
    setToastData((prevToastData) => ({
      ...prevToastData,
      isVisible: !prevToastData.isVisible,
    }));
  }

  function showToast(message, type = "success") {
    setToastData({ isVisible: true, message, type });
  }

  return (
    <ToastContext.Provider
      value={{ toastData, toggleToast, showToast, hideToast }}
    >
      {children}
    </ToastContext.Provider>
  );
};
