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
  Input,
  Modal,
  IconButton,
  useToast,
  TextArea,
  KeyboardAvoidingView,
  Circle,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import {
  AntDesign,
  Entypo,
  Feather,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../RootStackParams";
import { logout } from "../../app/auth/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Platform, RefreshControl } from "react-native";
import { DeskApi } from "../../api/DeskApi";
import { AreaType } from "../../types/areaType";
import { useForm, Controller } from "react-hook-form";
import SlideFromBottom from "../../components/Ui/SlideFromBottom";
import { RoomApi } from "../../api/RoomApi";
import { RoomType } from "../../types/roomType";

type RoomScreenNavigationProp = BottomTabNavigationProp<
  RootStackParamList,
  "OfficeRoomList"
>;
type RoomScreenRouteProp = RouteProp<RootStackParamList, "OfficeRoomList">;
const RoomScreen = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ duration: string }>();
  const [isRefreshing, setIsRefreshing] = useState<boolean>(true);
  const [openBook, setOpenBook] = useState<boolean>(false);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [roomList, setRoomList] = useState<RoomType[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<RoomType | undefined>();
  useState<boolean>(true);
  const cancelRef = useRef(null);
  const toast = useToast();
  const navigation = useNavigation<RoomScreenNavigationProp>();
  const route = useRoute<RoomScreenRouteProp>();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const token = useAppSelector((state) => state.auth.token);
  const selectedBranch = useAppSelector(
    (state) => state.company.selectedBranch
  );
  useEffect(() => {
    if (isLoggedIn && token && selectedBranch) {
      getAllRoom();
    } else {
      setIsRefreshing(false);
      navigation.navigate("OfficeHome");
      // dispatch(logout());
    }
  }, []);

  const getAllRoom = async () => {
    setIsRefreshing(true);
    if (selectedBranch) {
      const result = await RoomApi.getAllRoom(selectedBranch.id);
      if (result.status === 200) {
        console.log(result.data);
        if (result.data.length > 0) {
          setRoomList(result.data);
        }
        // let branchList: BranchState[] = [];

        // if (result.data.deskSchedules.length > 0) {
        //   setDeskSchedules(result.data.roomSchedules);
        // }
      }
    }
    console.log("here");
    console.log(date);
    setIsRefreshing(false);
  };

  const onSelectRoom = (room: RoomType) => {
    navigation.navigate("OfficeAddRoomSchedule", { roomId: room.id });
    // setSelectedRoom(room);
    // setOpenBook(true);
  };

  const onCloseBook = () => {
    setSelectedRoom(undefined);
    setOpenBook(false);
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  return (
    <>
      <VStack safeAreaTop h="100%" mx={4}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={getAllRoom} />
          }
          _contentContainerStyle={{ pb: 16 }}
        >
          {!isRefreshing && (
            <>
              <Flex
                direction="row"
                w="100%"
                justify="space-between"
                align="center"
                my={5}
              >
                <Pressable
                  flex={1}
                  onPress={() => navigation.navigate("OfficeHome")}
                >
                  <Icon
                    pl={2}
                    color={useColorModeValue("themeColor.500", "greyColor.600")}
                    as={FontAwesome}
                    name="chevron-left"
                    size={5}
                  />
                </Pressable>
                <Heading
                  textAlign="center"
                  flex={1}
                  fontFamily="sf-pro-text-semibold"
                  fontSize={20}
                  fontWeight="800"
                >
                  Room
                </Heading>
                <Flex flex={1}></Flex>
              </Flex>
              {roomList.length > 0 &&
                roomList
                  .filter((room) => room.status === true)
                  .map((room) => {
                    return (
                      <Pressable
                        key={room.id}
                        onPress={() => onSelectRoom(room)}
                      >
                        <Flex
                          direction="row"
                          justify="space-between"
                          align="center"
                          bg={useColorModeValue("white", "greyColor.1000")}
                          borderRadius="xl"
                          pr={5}
                          pl={2}
                          py={2}
                          my={1}
                        >
                          <Flex direction="row">
                            <Image
                              size={"lg"}
                              mr={5}
                              borderRadius="sm"
                              source={require("./../../assets/snooker.jpg")}
                              alt="room image"
                            />
                            <Flex>
                              <Text
                                fontFamily="sf-pro-text-medium"
                                fontSize={15}
                                fontWeight="700"
                              >
                                {room.name}
                              </Text>
                              <Text
                                color={useColorModeValue(
                                  "greyColor.400",
                                  "greyColor.400"
                                )}
                                fontFamily="sf-pro-text-regular"
                                fontSize={13}
                                fontWeight="500"
                              >
                                {room.detail}
                              </Text>
                            </Flex>
                          </Flex>
                          <Icon
                            color={useColorModeValue(
                              "themeColor.500",
                              "greyColor.600"
                            )}
                            as={FontAwesome}
                            name="chevron-right"
                            size={4}
                          />
                        </Flex>
                      </Pressable>
                    );
                  })}
            </>
          )}
        </ScrollView>
      </VStack>
    </>
  );
};

export default RoomScreen;
