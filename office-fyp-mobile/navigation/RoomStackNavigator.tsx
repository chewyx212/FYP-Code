import * as React from "react";
import {
  createStackNavigator,
  StackHeaderProps,
  TransitionPresets,
} from "@react-navigation/stack";
import { getHeaderTitle } from "@react-navigation/elements";
import OrderScreen from "../screens/OrderScreen";
import CameraScreen from "../screens/CameraScreen";
import PrinterScreen from "../screens/PrinterScreen";
import DrawerNavigator from "./DrawerNavigator";
import PaymentScreen from "../screens/PaymentScreen";
import { Ionicons } from "@expo/vector-icons";
import TabNavigator from "./TabNavigator";
import RoomScreen from "../screens/office/RoomScreen";
import AddRoomScreen from "../screens/office/AddRoomScreen";

const Stack = createStackNavigator();
const RoomStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardShadowEnabled: true,
        cardOverlayEnabled: false,
        presentation: "card",
        ...TransitionPresets.FadeFromBottomAndroid,
      }}
      initialRouteName="OfficeRoomList"
    >
      <Stack.Screen name="OfficeRoomList" component={RoomScreen} />
      <Stack.Screen name="OfficeAddRoomSchedule" component={AddRoomScreen} />
    </Stack.Navigator>
  );
};

export default RoomStackNavigator;
