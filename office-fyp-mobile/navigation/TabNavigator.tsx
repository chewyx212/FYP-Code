import * as React from "react";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { useWindowDimensions } from "react-native";
import { FontAwesome, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import {
  Box,
  Flex,
  Icon,
  Text,
  Pressable,
  useColorModeValue,
  Image,
  Menu,
} from "native-base";
import HomeScreen from "../screens/office/HomeScreen";
import ProfileScreen from "../screens/office/ProfileScreen";
import LandingScreen from "../screens/office/LandingScreen";
import AddDeskScreen from "../screens/office/AddDeskScreen";
import DeskScreen from "../screens/office/DeskScreen";
import AreaScreen from "../screens/office/AreaScreen";
import AllScheduleScreen from "../screens/office/AllScheduleScreen";
import { useAppSelector } from "../app/hooks";
import { BranchState } from "../types/branchType";
import BranchScreen from "../screens/office/BranchScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const dimensions = useWindowDimensions();
  const selectedBranch = useAppSelector(
    (state) => state.company.selectedBranch
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props: BottomTabBarProps) => (
        <CustomTabBar selectedBranch={selectedBranch} props={props} />
      )}
      initialRouteName="OfficeHome"
    >
      <Tab.Screen name="OfficeHome" component={HomeScreen} />
      <Tab.Screen name="OfficeLanding" component={LandingScreen} />
      <Tab.Screen name="OfficeProfile" component={ProfileScreen} />
      <Tab.Screen name="OfficeBranch" component={BranchScreen} />
      <Tab.Screen name="OfficeDesk" component={DeskScreen} />
      <Tab.Screen name="OfficeArea" component={AreaScreen} />
      <Tab.Screen name="OfficeAddDesk" component={AddDeskScreen} />
      <Tab.Screen name="OfficeSchedule" component={AllScheduleScreen} />
      {/* <Tab.Screen name="OfficeRoom" component={RoomScreen} />
      <Tab.Screen name="OfficeAddRoom" component={AddRoomScreen} /> */}
    </Tab.Navigator>
  );
};
const CustomTabBar = ({
  props,
  selectedBranch,
}: {
  props: BottomTabBarProps;
  selectedBranch: undefined | BranchState;
}) => {
  const currentRoute = props.state.routeNames[props.state.index];

  return (
    <Box
      display={
        currentRoute === "OfficeDesk" ||
        currentRoute === "OfficeAddDesk" ||
        currentRoute === "OfficeArea"
          ? "none"
          : "flex"
      }
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      py={4}
      px={8}
      _light={{
        bg: "white",
      }}
      _dark={{
        bg: "greyColor.1000",
      }}
      shadow={3}
    >
      {!selectedBranch && (
        <>
          <Pressable onPress={() => props.navigation.navigate("OfficeHome")}>
            <Flex direction="column" align="center">
              <Icon
                color={useColorModeValue("greyColor.900", "greyColor.600")}
                as={Feather}
                name="home"
                size={5}
              />
            </Flex>
          </Pressable>
        </>
      )}
      {selectedBranch && (
        <>
          <Menu
            placement="top"
            trigger={(triggerProps) => {
              return (
                <Pressable
                  accessibilityLabel="More options menu"
                  {...triggerProps}
                >
                  <Flex direction="column" align="center">
                    <Icon
                      color={useColorModeValue(
                        "greyColor.900",
                        "greyColor.600"
                      )}
                      as={FontAwesome}
                      name="building-o"
                      size={5}
                    />
                  </Flex>
                </Pressable>
              );
            }}
          >
            <Menu.Item
              onPress={() => props.navigation.navigate("OfficeSchedule")}
            >
              View All Schedule
            </Menu.Item>
            <Menu.Item
              onPress={() => props.navigation.navigate("OfficeBranch")}
            >
              View All Branchs
            </Menu.Item>
          </Menu>

          <Menu
            placement="top"
            trigger={(triggerProps) => {
              return (
                <Pressable
                  accessibilityLabel="More options menu"
                  {...triggerProps}
                >
                  <Icon
                    color={useColorModeValue("themeColor.500", "greyColor.600")}
                    as={FontAwesome}
                    name="plus"
                    size={5}
                  />
                </Pressable>
              );
            }}
          >
            <Menu.Item onPress={() => props.navigation.navigate("OfficeArea")}>
              Book Desk
            </Menu.Item>
            <Menu.Item onPress={() => props.navigation.navigate("OfficeRoom")}>
              Book Room
            </Menu.Item>
          </Menu>
        </>
      )}

      <Pressable onPress={() => props.navigation.navigate("OfficeProfile")}>
        <Flex direction="column" align="center">
          <Icon
            color={useColorModeValue("greyColor.900", "greyColor.600")}
            as={FontAwesome}
            name="user-o"
            size={5}
          />
        </Flex>
      </Pressable>
    </Box>
  );
};

export default TabNavigator;
