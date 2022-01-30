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
  Select,
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
import CalendarPicker from "react-native-calendar-picker";
import moment, { Moment } from "moment";
import { timeList } from "../../assets/DUMMY_TIME";

type AddRoomScreenNavigationProp = BottomTabNavigationProp<
  RootStackParamList,
  "OfficeAddRoomSchedule"
>;
type AddRoomScreenRouteProp = RouteProp<
  RootStackParamList,
  "OfficeAddRoomSchedule"
>;

type ScheduleType = {
  id: string;
  date: Moment;
  startTime: number;
  endTime: number;
};
const AddRoomScreen = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ duration: string }>();
  const [isRefreshing, setIsRefreshing] = useState<boolean>(true);
  const [filteredStartTimeList, setFilteredStartTimeList] = useState(timeList);
  const [filteredEndTimeList, setFilteredEndTimeList] = useState(timeList);
  const [startTime, setStartTime] = useState<number>();
  const [endTime, setEndTime] = useState<number>();
  const [date, setDate] = useState<Moment>();
  const [room, setRoom] = useState<RoomType>();
  const [schedules, setSchedules] = useState<ScheduleType[]>([]);
  const cancelRef = useRef(null);
  const toast = useToast();
  const navigation = useNavigation<AddRoomScreenNavigationProp>();
  const route = useRoute<AddRoomScreenRouteProp>();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const token = useAppSelector((state) => state.auth.token);
  const { roomId } = route.params;
  const selectedBranch = useAppSelector(
    (state) => state.company.selectedBranch
  );
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  useEffect(() => {
    if (isLoggedIn && token && roomId) {
      getRoomDetail();
    } else {
      setIsRefreshing(false);
      navigation.navigate("OfficeHome");
      // dispatch(logout());
    }
  }, []);

  const getRoomDetail = async () => {
    setIsRefreshing(true);
    if (selectedBranch) {
      const result = await RoomApi.getOneRoomDetail(roomId);
      if (result.status === 200) {
        if (result.data) {
          setRoom(result.data);
          if (result.data.schedules.length > 0) {
            setSchedules(
              result.data.schedules.map((schedule) => ({
                id: schedule.id,
                date: moment(schedule.date, "yy-MM-DD"),
                startTime: schedule.startTime,
                endTime: schedule.endTime,
              }))
            );
          }
        }
        // let branchList: BranchState[] = [];

        // if (result.data.deskSchedules.length > 0) {
        //   setDeskSchedules(result.data.roomSchedules);
        // }
      }
    }
    setIsRefreshing(false);
  };

  const onDateChange = (date: Moment) => {
    setStartTime(undefined);
    setEndTime(undefined);
    setDate(date);
    if (schedules.length > 0) {
      const findSchedule: ScheduleType[] = schedules.filter(
        (schedules) =>
          schedules.date.format("yy-MM-DD") === date.format("yy-MM-DD")
      );
      if (findSchedule.length > 0) {
        let startList = [...timeList];
        let endList = [...timeList];
        findSchedule.forEach((found) => {
          console.log(found);
          startList = startList.filter(
            (time) =>
              (time.id < found.startTime || time.id >= found.endTime) &&
              time.id !== 25
          );
          endList = endList.filter(
            (time) => time.id <= found.startTime || time.id > found.endTime
          );
        });
        setFilteredStartTimeList(startList);
        setFilteredEndTimeList(endList);
      } else {
        setFilteredStartTimeList(timeList);
        setFilteredEndTimeList(timeList);
      }
    } else {
      setFilteredStartTimeList(timeList);
      setFilteredEndTimeList(timeList);
    }
  };

  const onSelectStartTime = (value: number) => {
    if (endTime && endTime <= value) {
      setEndTime(value + 1);
    }
    if (schedules.length > 0 && date) {
      const findSchedule: ScheduleType[] = schedules.filter(
        (schedules) =>
          schedules.date.format("yy-MM-DD") === date.format("yy-MM-DD")
      );
      if (findSchedule.length > 0) {
        let endList = [...timeList];
        findSchedule.forEach((found) => {
          endList = endList.filter(
            (time) => time.id <= found.startTime || time.id > found.endTime
          );
        });
        endList = endList.filter((state) => state.id > value);
        if (endList.length > 0) {
          let prevIndex: number = endList[0].id;
          endList = endList.filter((state) => {
            if (state.id === prevIndex) {
              return state;
            }
            if (state.id === prevIndex + 1) {
              prevIndex++;
              return state;
            }
          });
        }
        setFilteredEndTimeList(endList);
      }
    }

    setStartTime(value);
  };

  const onSubmit = async () => {
    if (startTime && endTime && date && selectedBranch) {
      console.log(startTime);
      console.log(endTime);
      console.log(date.toString());

      const result = await RoomApi.scheduleRoom({
        branchId: selectedBranch.id,
        roomId,
        startTime,
        endTime,
        date: date.format("yyyy-MM-DD").toString(),
      });
      console.log(result);
      if (result.status === 201) {
        await toast.closeAll();
        toast.show({
          title: `Booking Success`,
          status: "success",
          placement: "top",
          isClosable: true,
        });
        setStartTime(undefined);
        setEndTime(undefined);
        setDate(undefined);
        navigation.navigate("OfficeRoomList");
      } else {
        await toast.closeAll();
        toast.show({
          title: `Something wrong...`,
          status: "error",
          placement: "top",
          isClosable: true,
        });
      }
    } else {
      await toast.closeAll();
      toast.show({
        title: `Please fill all field`,
        status: "warning",
        placement: "top",
        isClosable: true,
      });
    }
  };

  return (
    <>
      <VStack safeAreaTop h="100%" mx={4}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={getRoomDetail}
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
                  onPress={() => navigation.navigate("OfficeRoomList")}
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
                  Schedule
                </Heading>
                <Flex flex={1}></Flex>
              </Flex>
              <Flex>
                <Flex
                  py={3}
                  borderRadius="xl"
                  bg={useColorModeValue("white", "greyColor.500")}
                >
                  <CalendarPicker
                    onDateChange={onDateChange}
                    restrictMonthNavigation
                    minDate={minDate}
                    maxDate={maxDate}
                    scrollable
                    selectedDayColor="#EC720F"
                    selectedDayTextColor="#fefefe"
                    previousComponent={
                      <Pressable>
                        <Icon
                          ml={3}
                          color={useColorModeValue(
                            "greyColor.800",
                            "greyColor.600"
                          )}
                          as={FontAwesome}
                          name="chevron-left"
                          size={4}
                        />
                      </Pressable>
                    }
                    nextComponent={
                      <Pressable>
                        <Icon
                          mr={3}
                          color={useColorModeValue(
                            "greyColor.800",
                            "greyColor.600"
                          )}
                          as={FontAwesome}
                          name="chevron-right"
                          size={4}
                        />
                      </Pressable>
                    }
                  />
                </Flex>
                <Text
                  fontFamily="sf-pro-text-semibold"
                  fontWeight="600"
                  fontSize={15}
                  py={2}
                >
                  Selected Date
                </Text>
                <Input
                  isReadOnly
                  value={date ? date.format("LL") : ""}
                  pl={5}
                  h={12}
                  placeholder="Date"
                  type="text"
                  fontFamily="sf-pro-text-regular"
                  fontSize="15px"
                  _focus={{
                    borderWidth: 0.5,
                    borderColor: "dark.200",
                  }}
                />
                <Text
                  fontFamily="sf-pro-text-semibold"
                  fontWeight="600"
                  fontSize={15}
                  py={2}
                >
                  Start Time
                </Text>
                <Select
                  selectedValue={startTime?.toString()}
                  minWidth="200"
                  accessibilityLabel="Choose start time"
                  placeholder="Start Time"
                  _selectedItem={{
                    bg: "themeColor.300",
                    endIcon: (
                      <Icon
                        color="themeColor.500"
                        as={FontAwesome}
                        name="check-circle-o"
                        size="5"
                      />
                    ),
                  }}
                  mt={1}
                  onValueChange={(itemValue) =>
                    onSelectStartTime(parseInt(itemValue))
                  }
                  pl={5}
                  h={12}
                  fontFamily="sf-pro-text-regular"
                  fontSize="15px"
                >
                  {filteredStartTimeList
                    .filter((time) => time.id !== 25)
                    .map((selection) => {
                      return (
                        <Select.Item
                          key={selection.id}
                          label={selection.time.format("HH:mm")}
                          value={selection.id.toString()}
                        />
                      );
                    })}
                </Select>

                <Text
                  fontFamily="sf-pro-text-semibold"
                  fontWeight="600"
                  fontSize={15}
                  py={2}
                >
                  End Time
                </Text>
                <Select
                  selectedValue={endTime?.toString()}
                  minWidth="200"
                  accessibilityLabel="Choose end time"
                  placeholder="End Time"
                  _selectedItem={{
                    bg: "themeColor.50",
                    endIcon: (
                      <Icon
                        color="themeColor.500"
                        as={FontAwesome}
                        name="check-circle-o"
                        size="5"
                      />
                    ),
                  }}
                  mt={1}
                  onValueChange={(itemValue) => setEndTime(parseInt(itemValue))}
                  pl={5}
                  h={12}
                  fontFamily="sf-pro-text-regular"
                  fontSize="15px"
                >
                  {filteredEndTimeList
                    .filter((time) => startTime && time.id > startTime)
                    .map((selection) => {
                      return (
                        <Select.Item
                          key={selection.id}
                          label={selection.time.format("HH:mm")}
                          value={selection.id.toString()}
                        />
                      );
                    })}
                </Select>
              </Flex>
              <Button
                onPress={onSubmit}
                mt={10}
                py={3}
                colorScheme="themeColor"
                _text={{
                  color: "textColor.buttonText",
                  fontFamily: "sf-pro-text-medium",
                  fontSize: "13px",
                }}
              >
                Confirm
              </Button>
            </>
          )}
        </ScrollView>
      </VStack>
    </>
  );
};

export default AddRoomScreen;
