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
import { CompanyApi } from "../../api/CompanyApi";
import { BranchState } from "../../types/branchType";
import { VisitorApi } from "../../api/VisitorApi";

type CheckInResultScreenNavigationProp = BottomTabNavigationProp<
  RootStackParamList,
  "OfficeCheckInResult"
>;
type CheckInResultScreenRouteProp = RouteProp<
  RootStackParamList,
  "OfficeCheckInResult"
>;
const CheckInResultScreen = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ duration: string }>();
  const [isRefreshing, setIsRefreshing] = useState<boolean>(true);
  const [branchDetail, setBranchDetail] = useState<BranchState>();
  const toast = useToast();
  const navigation = useNavigation<CheckInResultScreenNavigationProp>();
  const route = useRoute<CheckInResultScreenRouteProp>();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const token = useAppSelector((state) => state.auth.token);

  const { branchId } = route.params;
  useEffect(() => {
    if (isLoggedIn && token && branchId) {
      getBranchDetail();
    } else {
      setIsRefreshing(false);
      navigation.navigate("OfficeHome");
      // dispatch(logout());
    }
  }, []);

  const getBranchDetail = async () => {
    setIsRefreshing(true);
    const result = await CompanyApi.getBranchDetail(branchId);
    if (result && result.status === 200 && result.data) {
      console.log(result.data);
      setBranchDetail(result.data);
    } else {
      navigation.navigate("OfficeHome");
    }
    setIsRefreshing(false);
  };

  const onCheckIn = async () => {
    if (branchDetail) {
      const result = await VisitorApi.checkin(branchDetail.id);
      
      navigation.navigate("OfficeHome");
    }
  };

  return (
    <>
      <VStack safeAreaTop h="100%" mx={4}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={getBranchDetail}
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
                  Check In
                </Heading>
                <Flex flex={1}></Flex>
              </Flex>
              <Flex
                bg={useColorModeValue("white", "greyColor.1000")}
                borderRadius="xl"
                px={4}
                py={5}
              >
                <Text
                  fontFamily="sf-pro-text-medium"
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
                    color={useColorModeValue(
                      "themeColor.500",
                      "themeColor.400"
                    )}
                  >
                    {branchDetail?.name}
                  </Text>

                  <Text
                    fontFamily="sf-pro-text-regular"
                    fontSize={15}
                    fontWeight="500"
                  >
                    {branchDetail?.address}
                  </Text>
                </Flex>
                <Button
                  bg={useColorModeValue("themeColor.600", "themeColor.300")}
                  _text={{ color: useColorModeValue("white", "greyColor.50") }}
                  _pressed={{
                    // @ts-ignore: Unreachable code error
                    _text: {
                      color: useColorModeValue("white", "greyColor.50"),
                    },
                    bg: useColorModeValue("themeColor.700", "themeColor.700"),
                  }}
                  onPress={onCheckIn}
                >
                  Check In
                </Button>
              </Flex>
            </>
          )}
        </ScrollView>
      </VStack>
    </>
  );
};

export default CheckInResultScreen;
