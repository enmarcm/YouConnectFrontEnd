import { NativeRouter } from "react-router-native";
import Main from "./components/Main";
import { Text } from "react-native";

export default function App() {
  return (
    <NativeRouter>
      <Main />
    </NativeRouter>
  );
}

