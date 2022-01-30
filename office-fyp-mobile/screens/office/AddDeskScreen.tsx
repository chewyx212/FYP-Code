import {
  Text,
  useColorModeValue,
  Heading,
  Button,
  VStack,
  ScrollView,
  Flex,
  Pressable,
  Icon,
  Input,
  useToast,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../RootStackParams";
import { logout } from "../../app/auth/authSlice";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Platform, RefreshControl } from "react-native";
import { DeskApi } from "../../api/DeskApi";
import { RoomApi } from "../../api/RoomApi";
import { RoomType } from "../../types/roomType";
import CalendarPicker from "react-native-calendar-picker";
import moment, { Moment } from "moment";

type AddDeskScreenNavigationProp = BottomTabNavigationProp<
  RootStackParamList,
  "OfficeAddDesk"
>;
type AddDeskScreenRouteProp = RouteProp<RootStackParamList, "OfficeAddDesk">;

type ScheduleType = {
  id: string;
  date: Moment;
  startTime: number;
  endTime: number;
};
const AddDeskScreen = () => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(true);
  const [date, setDate] = useState<Moment>();
  const [desk, setDesk] = useState<RoomType>();
  const [schedules, setSchedules] = useState<any[]>([]);
  const cancelRef = useRef(null);
  const toast = useToast();
  const navigation = useNavigation<AddDeskScreenNavigationProp>();
  const route = useRoute<AddDeskScreenRouteProp>();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const token = useAppSelector((state) => state.auth.token);
  const { deskId } = route.params;
  const selectedBranch = useAppSelector(
    (state) => state.company.selectedBranch
  );
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  useEffect(() => {
    if (isLoggedIn && token && deskId) {
      getDeskDetail();
    } else {
      setIsRefreshing(false);
      navigation.navigate("OfficeArea");
      // dispatch(logout());
    }
  }, []);

  const getDeskDetail = async () => {
    setIsRefreshing(true);
    if (selectedBranch) {
      const result = await DeskApi.getOneDeskDetail(deskId);
      if (result.status === 200) {
        if (result.data) {
          setDesk(result.data);
          console.log(result.data);
          if (result.data.schedules.length > 0) {
            console.log(result.data.schedules);
            setSchedules(
              result.data.schedules.map((schedule) =>
                moment(schedule.date, "yy-MM-DD")
              )
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
    setDate(date);
  };

  const onSubmit = async () => {
    if (date && selectedBranch) {
      console.log(date.toString());

      const result = await DeskApi.scheduleDesk({
        branchId: selectedBranch.id,
        deskId,
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
        setDate(undefined);
        navigation.navigate("OfficeSchedule");
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
              onRefresh={getDeskDetail}
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
                  onPress={() => navigation.navigate("OfficeArea")}
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
                    disabledDates={schedules}
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

export default AddDeskScreen;
