import {
  Text,
  Stack,
  useColorModeValue,
  Flex,
  View,
  useToast,
  Heading,
  Icon,
  Pressable,
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../RootStackParams";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { Camera } from "expo-camera";
type CheckInScreenNavigationProp = BottomTabNavigationProp<
  RootStackParamList,
  "OfficeCheckIn"
>;
type CheckInScreenRouteProp = RouteProp<RootStackParamList, "OfficeCheckIn">;
const CheckInScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const toast = useToast();
  const navigation = useNavigation<CheckInScreenNavigationProp>();
  const route = useRoute<CheckInScreenRouteProp>();
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View flex={1}>
      <Camera
        onBarCodeScanned={(...args) => {
          const data = args[0].data;
          console.log("inside");
          setScanned(true);
          navigation.navigate("OfficeCheckInResult", { branchId: data });
        }}
        style={{ flex: 1 }}
        barCodeScannerSettings={{
          barCodeTypes: ["qr"],
        }}
      >
        <View
          flex=" 1"
          backgroundColor="transparent"
          flexDirection="row"
          ml="6"
          mt="12"
        >
          <Pressable flex={1} onPress={() => navigation.navigate("OfficeHome")}>
            <Icon
              pl={2}
              color={useColorModeValue("themeColor.500", "greyColor.600")}
              as={FontAwesome}
              name="chevron-left"
              size={8}
            />
          </Pressable>
        </View>
      </Camera>
    </View>
  );
};

export default CheckInScreen;
