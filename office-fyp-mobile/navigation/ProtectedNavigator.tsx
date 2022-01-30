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
import {
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Text,
  Box,
  useColorModeValue,
  useColorMode,
} from "native-base";
import {
  getFocusedRouteNameFromRoute,
  useNavigationState,
} from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import TabNavigator from "./TabNavigator";
import RoomStackNavigator from "./RoomStackNavigator";
import CheckInNavigator from "./CheckInNavigator";

const Stack = createStackNavigator();
const ProtectedNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardShadowEnabled: true,
        cardOverlayEnabled: false,
        presentation: "card",
        ...TransitionPresets.FadeFromBottomAndroid,
      }}
      initialRouteName="Office"
    >
      <Stack.Screen name="Office" component={TabNavigator} />
      <Stack.Screen name="OfficeRoom" component={RoomStackNavigator} />
      <Stack.Screen name="OfficeCheck" component={CheckInNavigator} />
      {/* <Stack.Screen name="Home" component={DrawerNavigator} />
      <Stack.Screen name="Order" component={OrderScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Printer" component={PrinterScreen} /> */}
    </Stack.Navigator>
  );
};

const CustomHeader = ({ navigation, route, options }: StackHeaderProps) => {
  const title = getHeaderTitle(options, route.name);
  let routeName = getFocusedRouteNameFromRoute(route) ?? title;
  return (
    <Flex
      direction="row"
      bg={useColorModeValue("white", "greyColor.1000")}
      shadow={1}
      justify="space-between"
      align="center"
      px={6}
      pb={1}
      safeAreaTop
    >
      <Flex direction="row" align="center">
        {routeName === "Payment" ? (
          <IconButton
            _icon={{
              color: "primary.500",
              size: "8",
            }}
            py={4}
            colorScheme="primary"
            icon={<Icon as={Ionicons} name="arrow-back" size="sm" />}
            onPress={() => navigation.goBack()}
          />
        ) : (
          <Image
            w={16}
            h={16}
            alt="bg image"
            source={require("./../assets/logo-min-1.png")}
          />
        )}
        <Heading
          fontFamily="sf-pro-display-bold"
          fontWeight={700}
          fontSize={30}
          pl={8}
        >
          {routeName}
        </Heading>
      </Flex>
      <Flex direction="row">
        <IconButton
          _pressed={{
            bg: "greyColor.50",
          }}
          icon={
            <Icon
              as={Ionicons}
              name="sync-outline"
              size="sm"
              color={useColorModeValue(
                "iconColor.lightGrey",
                "iconColor.darkGrey"
              )}
            />
          }
          onPress={useColorMode().toggleColorMode}
        />
      </Flex>
    </Flex>
  );
};

export default ProtectedNavigator;
