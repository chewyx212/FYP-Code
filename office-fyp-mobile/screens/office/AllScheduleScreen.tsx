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
import { timeList } from "../../assets/DUMMY_TIME";
import { RoomType } from "../../types/roomType";
import moment, { Moment } from "moment";
import { AuthApi } from "../../api/AuthApi";

type AllScheduleScreenNavigationProp = BottomTabNavigationProp<
  RootStackParamList,
  "OfficeSchedule"
>;
type AllScheduleScreenRouteProp = RouteProp<
  RootStackParamList,
  "OfficeSchedule"
>;
const AllScheduleScreen = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ duration: string }>();
  const [isRefreshing, setIsRefreshing] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const [allScheduleList, setAllScheduleList] = useState<any[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [selectedRoom, setSelectedRoom] = useState<RoomType | undefined>();
  useState<boolean>(true);
  const cancelRef = useRef(null);
  const toast = useToast();
  const navigation = useNavigation<AllScheduleScreenNavigationProp>();
  const route = useRoute<AllScheduleScreenRouteProp>();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const token = useAppSelector((state) => state.auth.token);
  const selectedBranch = useAppSelector(
    (state) => state.company.selectedBranch
  );
  const categoryList = [
    {
      id: 1,
      name: "All",
    },
    {
      id: 2,
      name: "Room",
    },
    {
      id: 3,
      name: "Desk",
    },
  ];
  useEffect(() => {
    if (isLoggedIn && token && selectedBranch) {
      getUserDetail();
    } else {
      setIsRefreshing(false);
      navigation.navigate("OfficeHome");
      // dispatch(logout());
    }
  }, []);

  const getUserDetail = async () => {
    setIsRefreshing(true);
    const result = await AuthApi.getDetail();
    if (result && result.status === 200) {
      let scheduleArray = [];
      let roomScheduleFromHttp = [];
      let deskScheduleFromHttp = [];
      if (result.data.roomSchedules.length > 0) {
        roomScheduleFromHttp = result.data.roomSchedules.map((data) => {
          let startTime = timeList.find(
            (time) => time.id === data.startTime
          )?.time;
          let endTime = timeList.find((time) => time.id === data.endTime)?.time;
          return {
            id: data.id,
            room: data.room,
            date: moment(data.date, "YYYYMMDD"),
            startTime,
            endTime,
            type: "room",
          };
        });
        roomScheduleFromHttp.sort((a, b) =>
          a.date < b.date ? -1 : a.date > b.date ? 1 : 0
        );
      }

      if (result.data.deskSchedules.length > 0) {
        deskScheduleFromHttp = result.data.deskSchedules.map((data) => {
          return {
            id: data.id,
            date: moment(data.date, "YYYYMMDD"),
            desk: {
              id: data.desk.id,
              name: data.desk.name,
              detail: data.desk.detail,
            },
            area: data.desk.area.name,
            type: "desk",
          };
        });
        deskScheduleFromHttp.sort((a, b) =>
          a.date < b.date ? -1 : a.date > b.date ? 1 : 0
        );
      }

      if (roomScheduleFromHttp.length > 0 || deskScheduleFromHttp.length > 0) {
        console.log(deskScheduleFromHttp);
        scheduleArray = [...deskScheduleFromHttp, ...roomScheduleFromHttp];
        scheduleArray.sort((a, b) =>
          a.date < b.date ? -1 : a.date > b.date ? 1 : 0
        );
        const scheduleList = scheduleArray.filter((schedule) =>
          moment().isBefore(schedule.date)
        );
        setAllScheduleList(scheduleList);
      }
    }
    setIsRefreshing(false);
  };

  return (
    <>
      <VStack safeAreaTop h="100%" mx={4}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={getUserDetail}
            />
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
                  Scheduled
                </Heading>
                <Flex flex={1}></Flex>
              </Flex>
              <Stack maxH={{ md: "9%" }}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  overflow="scroll"
                  _contentContainerStyle={{
                    m: "1%",
                    py: "10px",
                  }}
                >
                  {categoryList.map((category) => {
                    let isActive = category.id === selectedCategory;
                    let bgColor = useColorModeValue(
                      "transparent",
                      "transparent"
                    );
                    let textColor = useColorModeValue("muted.500", "muted.400");
                    let pressedBgColor = useColorModeValue(
                      "themeColor.50",
                      "themeColoer.50"
                    );
                    let pressedTextColor = useColorModeValue(
                      "themeColor.900",
                      "themeColoer.900"
                    );
                    if (isActive) {
                      bgColor = useColorModeValue(
                        "themeColor.500",
                        "themeColor.700"
                      );
                      textColor = useColorModeValue(
                        "textColor.buttonText",
                        "greyColor.50"
                      );
                    }
                    return (
                      <Button
                        key={category.id}
                        bg={bgColor}
                        _text={{
                          color: textColor,
                          fontFamily: "sf-pro-text-medium",
                          fontSize: { base: 15, md: 13 },
                        }}
                        _pressed={{
                          bg: pressedBgColor,
                          // @ts-ignore: Unreachable code error
                          _text: { color: pressedTextColor },
                        }}
                        disabled={isActive}
                        borderRadius="2xl"
                        mx={1}
                        onPress={() => {
                          setSelectedCategory(category.id);
                        }}
                      >
                        {category.name}
                      </Button>
                    );
                  })}
                </ScrollView>
              </Stack>
              {allScheduleList.length > 0 &&
                allScheduleList.map((schedule) => {
                  if (
                    schedule.type === "room" &&
                    (selectedCategory === 1 || selectedCategory === 2)
                  ) {
                    return (
                      <Pressable key={schedule.id}>
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
                                {schedule.room.name}
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
                                {schedule.date.format("ll")}
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
                                {schedule.startTime.format("HH:mm")} -
                                {schedule.endTime.format("HH:mm")}
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
                  } else if (
                    schedule.type === "desk" &&
                    (selectedCategory === 1 || selectedCategory === 3)
                  ) {
                    return (
                      <Pressable key={schedule.id}>
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
                              source={require("./../../assets/desk.jpg")}
                              alt="room image"
                            />
                            <Flex>
                              <Text
                                fontFamily="sf-pro-text-medium"
                                fontSize={15}
                                fontWeight="700"
                              >
                                {schedule.desk.name}
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
                                {schedule.date.format("ll")}
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
                                {schedule.area}
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
                  }
                })}
            </>
          )}
        </ScrollView>
      </VStack>
    </>
  );
};

export default AllScheduleScreen;
