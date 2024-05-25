import { NativeRouter } from "react-router-native";
import Main from "./components/Main";
import { LoadingProvider } from "./context/LoadingContext";

export default function App() {
  return (
    <NativeRouter>
      <LoadingProvider>
        <Main />
      </LoadingProvider>
    </NativeRouter>
  );
}
