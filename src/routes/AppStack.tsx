import React from "react";

import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { Chat } from "../screens/App/Chat";
import { Login } from "../screens/Auth/Login/Login";
import { SignUp } from "../screens/Auth/SignUp/SignUp";

export type AppStackParamList = {
  Login: undefined;
  SignUp: undefined;

  Chat: undefined;
};

export type AppStackProps = NativeStackNavigationProp<AppStackParamList>;

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
      <Screen name="SignUp" component={SignUp} />

      <Screen name="Chat" component={Chat} />
    </Navigator>
  );
}
