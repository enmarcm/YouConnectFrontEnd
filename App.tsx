import { NativeRouter } from "react-router-native";
import Main from "./components/Main";
import { LoadingProvider } from "./context/LoadingContext";
import { ToastProvider } from "./context/ToastContext";

export default function App() {
  return (
    <NativeRouter>
      <LoadingProvider>
        <ToastProvider>
            <Main />
        </ToastProvider>
      </LoadingProvider>
    </NativeRouter>
  );
}
