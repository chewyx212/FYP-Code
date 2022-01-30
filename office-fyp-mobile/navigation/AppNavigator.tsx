import React, { useRef } from "react";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import ProtectedNavigator from "./ProtectedNavigator";
import { useAppSelector } from "../app/hooks";
import { Box, useColorModeValue } from "native-base";
const AppNavigator = () => {
  let isAuth = false;

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  console.log("isLoggedIn");
  console.log(isLoggedIn);
  return (
    <NavigationContainer>
      {/* <ProtectedNavigator /> */}
      {!isLoggedIn && <AuthNavigator />}
      {isLoggedIn && <ProtectedNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
