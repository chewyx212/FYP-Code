import * as React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import CheckInScreen from "../screens/office/CheckInScreen";
import CheckInResultScreen from "../screens/office/CheckInResultScreen";
import { useFocusEffect } from "@react-navigation/native";

const Stack = createStackNavigator();
const CheckInNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardShadowEnabled: true,
        cardOverlayEnabled: false,
        presentation: "card",
        ...TransitionPresets.FadeFromBottomAndroid,
      }}
      initialRouteName="OfficeCheckIn"
    >
      <Stack.Screen name="OfficeCheckIn" component={CheckInScreen} />
      <Stack.Screen
        name="OfficeCheckInResult"
        component={CheckInResultScreen}
      />
    </Stack.Navigator>
  );
};

export default CheckInNavigator;
