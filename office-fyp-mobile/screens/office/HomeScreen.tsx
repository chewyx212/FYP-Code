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
import { AuthApi } from "../../api/AuthApi";
import { CompanyApi } from "../../api/CompanyApi";
import { BranchState } from "../../types/branchType";
import moment, { Moment } from "moment";
import {
  saveCompany,
  saveCompanyBranch,
  selectBranch,
} from "../../app/company/companySlice";
import { timeList } from "../../assets/DUMMY_TIME";
import { Platform, RefreshControl } from "react-native";

type HomeScreenNavigationProp = BottomTabNavigationProp<
  RootStackParamList,
  "OfficeHome"
>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, "OfficeHome">;
const HomeScreen = () => {
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
  const [roomSchedules, setRoomSchedules] = useState<any[]>([]);
  const [deskSchedules, setDeskSchedules] = useState<any[]>([]);
  const [allScheduleList, setAllScheduleList] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(true);
  const [gotCompanyOrBranch, setGotCompanyOrBranch] = useState<boolean>(false);
  const [availableBranch, setAvailableBranch] = useState<BranchState[]>([]);
  const [chooseBranchModal, setChooseBranchModal] = useState<boolean>(false);
  useState<boolean>(true);
  const cancelRef = useRef(null);
  const toast = useToast();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute<HomeScreenRouteProp>();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  const selectedBranch = useAppSelector(
    (state) => state.company.selectedBranch
  );
  useEffect(() => {
    if (isLoggedIn && token) {
      getUserDetail();
    } else {
      dispatch(logout());
    }
  }, []);

  const getUserDetail = async () => {
    setIsRefreshing(true);
    const result = await AuthApi.getDetail();
    if (result && result.status === 200) {
      let branchList: BranchState[] = [];
      if (result.data.branches.length > 0) {
        result.data.branches.forEach((branch: BranchState) => {
          branchList.push(branch);
        });
      }
      if (result.data.company && result.data.company.branches.length > 0) {
        result.data.company.branches.forEach((branch: BranchState) => {
          branchList.push(branch);
        });
        dispatch(saveCompany({ company: result.data.company }));
      }
      if (branchList.length > 0) {
        setGotCompanyOrBranch(true);
        dispatch(saveCompanyBranch({ branches: branchList }));
      }
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
        setRoomSchedules(roomScheduleFromHttp);
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
        setDeskSchedules(deskScheduleFromHttp);
      }

      if (roomScheduleFromHttp.length > 0 || deskScheduleFromHttp.length > 0) {
        scheduleArray = [...deskScheduleFromHttp, ...roomScheduleFromHttp];
        scheduleArray.sort((a, b) =>
          a.date < b.date ? -1 : a.date > b.date ? 1 : 0
        );
        let scheduleList = scheduleArray.filter((schedule) =>
          moment().isBefore(schedule.date)
        );
        if (scheduleList.length > 5) {
          scheduleList = scheduleList.slice(0, 5);
        }
        setAllScheduleList(scheduleList);
      }

      if (branchList.length === 1) {
        dispatch(selectBranch({ branch: branchList[0] }));
      }

      setAvailableBranch(branchList);
      if (!selectedBranch && branchList.length > 1) {
        setChooseBranchModal(true);
      }
    }
    console.log("here");
    console.log(gotCompanyOrBranch);
    setIsRefreshing(false);
  };

  const onCloseBranchModal = () => {
    if (selectedBranch) {
      setChooseBranchModal(false);
    }
  };

  return (
    <VStack safeAreaTop h="100%" mx={4}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={getUserDetail} />
        }
        _contentContainerStyle={{ pb: 16 }}
      >
        {!isRefreshing && !gotCompanyOrBranch && (
          <>
            <Flex
              direction="row"
              w="100%"
              justify="center"
              align="center"
              my={5}
            >
              <Heading
                fontFamily="sf-pro-text-semibold"
                fontSize={20}
                fontWeight="800"
              >
                Home
              </Heading>
            </Flex>
            <Flex
              bg={useColorModeValue("white", "greyColor.1000")}
              borderRadius="xl"
              px={4}
              py={5}
            >
              <Text
                fontFamily="sf-pro-text-medium"
                fontSize={17}
                fontWeight="600"
              >
                Hi, {user.name}
              </Text>
              <Text
                fontFamily="sf-pro-text-regular"
                fontSize={15}
                fontWeight="500"
              >
                {`${new Date().toDateString()} ${new Date().toLocaleTimeString()}`}
              </Text>
              <Text
                my={2}
                fontFamily="sf-pro-text-semibold"
                fontSize={17}
                fontWeight="700"
              >
                Check In Now
              </Text>
              <Button
                bg={useColorModeValue("themeColor.600", "themeColor.300")}
                _text={{ color: useColorModeValue("white", "greyColor.50") }}
                _pressed={{
                  // @ts-ignore: Unreachable code error
                  _text: { color: useColorModeValue("white", "greyColor.50") },
                  bg: useColorModeValue("themeColor.700", "themeColor.700"),
                }}
                onPress={() => navigation.navigate("OfficeCheck")}
              >
                Check In
              </Button>
            </Flex>
            <Flex
              bg={useColorModeValue("white", "greyColor.1000")}
              borderRadius="xl"
              mt={3}
              px={4}
              py={5}
            >
              <Text>
                You are currently not invited to any company. Ask your admin to
                add you in!
              </Text>
            </Flex>
          </>
        )}
        {!isRefreshing && selectedBranch && (
          <>
            <Flex
              direction="row"
              w="100%"
              justify="center"
              align="center"
              my={5}
            >
              <Heading
                fontFamily="sf-pro-text-semibold"
                fontSize={20}
                fontWeight="800"
              >
                {selectedBranch?.name}
              </Heading>
            </Flex>
            <Flex
              bg={useColorModeValue("white", "greyColor.1000")}
              borderRadius="xl"
              px={4}
              py={5}
            >
              <Text
                fontFamily="sf-pro-text-medium"
                fontSize={17}
                fontWeight="600"
              >
                Hi, {user.name}
              </Text>
              <Text
                fontFamily="sf-pro-text-regular"
                fontSize={15}
                fontWeight="500"
              >
                {`${new Date().toDateString()} ${new Date().toLocaleTimeString()}`}
              </Text>
              <Flex direction="row" my={2} align="center">
                <Text
                  fontFamily="sf-pro-text-semibold"
                  fontSize={17}
                  fontWeight="700"
                >
                  Check In to{" "}
                </Text>
                <Text
                  fontFamily="sf-pro-text-semibold"
                  fontSize={17}
                  fontWeight="700"
                  color={useColorModeValue("themeColor.500", "themeColor.400")}
                >
                  {selectedBranch.name}
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
                onPress={() => navigation.navigate("OfficeCheck")}
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
              announcements.map((announcement, index) => {
                return (
                  <Flex
                    key={index}
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
                      color={useColorModeValue(
                        "greyColor.400",
                        "greyColor.400"
                      )}
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
                onPress={() => navigation.navigate("OfficeSchedule")}
              >
                View All
              </Button>
            </Flex>

            {allScheduleList.length > 0 &&
              allScheduleList.map((schedule) => {
                if (schedule.type === "room") {
                  return (
                    <Flex
                      key={schedule.id}
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
                        {schedule.date.format("ll")}
                      </Text>
                      <Text
                        fontFamily="sf-pro-text-medium"
                        fontSize={15}
                        fontWeight="700"
                        my={1}
                      >
                        {schedule.room.name}
                      </Text>
                      <Text
                        fontFamily="sf-pro-text-regular"
                        fontSize={15}
                        fontWeight="500"
                        color={useColorModeValue(
                          "greyColor.400",
                          "greyColor.400"
                        )}
                        noOfLines={2}
                        isTruncated
                      >
                        {schedule.startTime.format("HH:mm")} -
                        {schedule.endTime.format("HH:mm")}
                      </Text>
                    </Flex>
                  );
                } else {
                  return (
                    <Flex
                      key={schedule.id}
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
                        {schedule.date.format("ll")}
                      </Text>
                      <Text
                        fontFamily="sf-pro-text-medium"
                        fontSize={15}
                        fontWeight="700"
                        my={1}
                      >
                        {schedule.desk.name}
                      </Text>

                      <Text
                        fontFamily="sf-pro-text-regular"
                        fontSize={15}
                        fontWeight="500"
                        color={useColorModeValue(
                          "greyColor.400",
                          "greyColor.400"
                        )}
                        noOfLines={2}
                        isTruncated
                      >
                        {schedule.area}
                      </Text>
                    </Flex>
                  );
                }
              })}
          </>
        )}
      </ScrollView>

      <Modal isOpen={chooseBranchModal} onClose={onCloseBranchModal}>
        <KeyboardAvoidingView
          w="100%"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Modal.Content alignSelf="center" maxWidth="600px">
            <Modal.CloseButton />
            <Modal.Header>Choose Branch</Modal.Header>
            <Modal.Body _scrollview={{ scrollEnabled: false }}>
              {availableBranch.map((selection) => {
                <Pressable>
                  <Text>{selection.name}</Text>
                </Pressable>;
              })}
            </Modal.Body>
          </Modal.Content>
        </KeyboardAvoidingView>
      </Modal>
    </VStack>
  );
};

export default HomeScreen;
