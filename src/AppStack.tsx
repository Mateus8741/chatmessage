import React from "react";

import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./screens/Login";
import { SignIn } from "./screens/SignIn";

export type AppStackParamList = {
  Login: undefined;
  SignIn: undefined;
};

export type AppStackProps = NativeStackNavigationProp<AppStackParamList>

export function AppStack() {
  const { Navigator, Screen } = createNativeStackNavigator<AppStackParamList>();

  return (
    <Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Login" component={Login} />
      <Screen name="SignIn" component={SignIn} />
    </Navigator>
  );
}
