import { NativeBaseProvider } from "native-base";
import { Routes } from "./src/Routes";

import { StatusBar } from "react-native";
import "./firebaseConfig";

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" translucent />
      <Routes />
    </NativeBaseProvider>
  );
}
