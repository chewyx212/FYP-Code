import {
  Text,
  Stack,
  HStack,
  useColorModeValue,
  Heading,
  Box,
  Button,
  VStack,
  ScrollView,
  FlatList,
  Flex,
  Image,
  Pressable,
  View,
  Icon,
  Checkbox,
  Radio,
  AlertDialog,
  Modal,
  IconButton,
  useToast,
  TextArea,
  KeyboardAvoidingView,
  Circle,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../RootStackParams";
import { logout } from "../../app/auth/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

type LandingScreenNavigationProp = BottomTabNavigationProp<
  RootStackParamList,
  "OfficeLanding"
>;
type LandingScreenRouteProp = RouteProp<RootStackParamList, "OfficeLanding">;
const LandingScreen = () => {
  const dummyAnnouncements = [
    {
      time: "Monday, 24 January 2022",
      title: "Hello, wear mask lah 😷",
      detail:
        "Lorem dasdasdsadummmy dummy dummy dummy ipsuasdada m dolor sqsasdasdit amet asdasdasd td consectetur athis is just some dummy dummy udmmy dummy loreom in spum text please beeeeee edummy asdadsadsagebb dipisicing asdadasdadsaadadasdasdadadasdasdad",
    },
    {
      time: "Monday, 23 January 2022",
      title: "Please Wear your mask 😷",
      detail:
        "Lorem dummmy dummy dummy dummy ipsuasdada m dolor sqsasdasdit amet asdasdasd td consectetur athis is just some dummy dummy udmmy dummy loreom in spum text please beeeeee edummy asdadsadsagebb dipisicing asdadasdadsaadadasdasdadadasdasdad",
    },
  ];
  const [announcements, setAnnouncements] = useState<any[]>(dummyAnnouncements);
  const cancelRef = useRef(null);
  const toast = useToast();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const route = useRoute<ProfileScreenRouteProp>();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const token = useAppSelector((state) => state.auth.token);
  useEffect(() => {
    if (isLoggedIn && token) {
      getCompany();
    } else {
      dispatch(logout());
    }
  }, []);

  const getCompany = async () => {};

  return (
    <VStack safeAreaTop h="100%" mx={4}>
      <ScrollView _contentContainerStyle={{ pb: 16 }}>
        <Flex direction="row" w="100%" justify="center" align="center" my={5}>
          <Heading
            fontFamily="sf-pro-text-semibold"
            fontSize={20}
            fontWeight="700"
          >
            Profile
          </Heading>
        </Flex>
        <Flex
          bg={useColorModeValue("white", "greyColor.1000")}
          borderRadius="xl"
          px={4}
          py={5}
        >
          <Text fontFamily="sf-pro-text-medium" fontSize={17} fontWeight="600">
            Hi, John Doe
          </Text>
          <Text fontFamily="sf-pro-text-regular" fontSize={15} fontWeight="500">
            Monday, 24 January 2022
          </Text>
          <Flex direction="row" my={2}>
            <Text
              fontFamily="sf-pro-text-semibold"
              fontSize={17}
              fontWeight="700"
            >
              Check In to
            </Text>
            <Text
              pl={1}
              fontFamily="sf-pro-text-semibold"
              fontSize={17}
              fontWeight="600"
              color={useColorModeValue("themeColor.500", "themeColor.400")}
            >
              Southern HQ
            </Text>
          </Flex>
          <Button
            bg={useColorModeValue("themeColor.600", "themeColor.300")}
            _text={{ color: useColorModeValue("white", "greyColor.50") }}
            _pressed={{
              // @ts-ignore: Unreachable code error
              _text: { color: useColorModeValue("white", "greyColor.50") },
              bg: useColorModeValue("themeColor.700", "themeColor.700"),
            }}
          >
            Check In
          </Button>
        </Flex>
        <Flex direction="row" justify="space-between" mt={5} align="center">
          <Heading
            fontFamily="sf-pro-text-semibold"
            fontSize={17}
            fontWeight="700"
          >
            Annoucement
          </Heading>
          <Button
            p={0}
            variant="unstyled"
            _text={{
              fontFamily: "sf-pro-text-semibold",
              fontSize: 13,
              fontWeight: "700",
              color: useColorModeValue("themeColor.700", "themeColor.700"),
            }}
          >
            View All
          </Button>
        </Flex>
        {announcements.length > 0 &&
          announcements.map((announcement) => {
            return (
              <Flex
                bg={useColorModeValue("white", "greyColor.1000")}
                borderRadius="xl"
                px={3}
                py={3}
                my={1}
              >
                <Text
                  fontFamily="sf-pro-text-regular"
                  fontSize={13}
                  fontWeight="500"
                >
                  {announcement.time}
                </Text>
                <Text
                  fontFamily="sf-pro-text-medium"
                  fontSize={15}
                  fontWeight="700"
                  my={1}
                >
                  {announcement.title}
                </Text>
                <Text
                  fontFamily="sf-pro-text-regular"
                  fontSize={15}
                  fontWeight="500"
                  color={useColorModeValue("greyColor.400", "greyColor.400")}
                  noOfLines={2}
                  isTruncated
                >
                  {announcement.detail}
                </Text>
              </Flex>
            );
          })}

        <Flex direction="row" justify="space-between" mt={5} align="center">
          <Heading
            fontFamily="sf-pro-text-semibold"
            fontSize={17}
            fontWeight="700"
          >
            Scheduled
          </Heading>
          <Button
            p={0}
            variant="unstyled"
            _text={{
              fontFamily: "sf-pro-text-semibold",
              fontSize: 13,
              fontWeight: "700",
              color: useColorModeValue("themeColor.700", "themeColor.700"),
            }}
          >
            View All
          </Button>
        </Flex>
        {announcements.length > 0 &&
          announcements.map((announcement) => {
            return (
              <Flex
                bg={useColorModeValue("white", "greyColor.1000")}
                borderRadius="xl"
                px={3}
                py={3}
                my={1}
              >
                <Text
                  fontFamily="sf-pro-text-regular"
                  fontSize={13}
                  fontWeight="500"
                >
                  {announcement.time}
                </Text>
                <Text
                  fontFamily="sf-pro-text-medium"
                  fontSize={15}
                  fontWeight="700"
                  my={1}
                >
                  {announcement.title}
                </Text>
                <Text
                  fontFamily="sf-pro-text-regular"
                  fontSize={15}
                  fontWeight="500"
                  color={useColorModeValue("greyColor.400", "greyColor.400")}
                  noOfLines={2}
                  isTruncated
                >
                  {announcement.detail}
                </Text>
              </Flex>
            );
          })}
      </ScrollView>
    </VStack>
  );
};

export default LandingScreen;
