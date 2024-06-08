import { NativeRouter } from "react-router-native";
import Main from "./components/Main";
import { LoadingProvider } from "./context/LoadingContext";
import { ToastProvider } from "./context/ToastContext";
import { SelectedContactsProvider } from "./context/SelectContactsContext";

export default function App() {
  return (
    <NativeRouter>
      <LoadingProvider>
        <ToastProvider>
          <SelectedContactsProvider>
            <Main />
          </SelectedContactsProvider>
        </ToastProvider>
      </LoadingProvider>
    </NativeRouter>
  );
}
