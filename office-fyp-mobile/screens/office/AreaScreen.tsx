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
import { AuthApi } from "../../api/AuthApi";
import { CompanyApi } from "../../api/CompanyApi";
import { BranchState } from "../../types/branchType";
import {
  saveCompany,
  saveCompanyBranch,
  selectBranch,
} from "../../app/company/companySlice";
import { Platform, RefreshControl } from "react-native";
import { DeskApi } from "../../api/DeskApi";
import { AreaType } from "../../types/areaType";

type AreaScreenNavigationProp = BottomTabNavigationProp<
  RootStackParamList,
  "OfficeArea"
>;
type AreaScreenRouteProp = RouteProp<RootStackParamList, "OfficeArea">;
const AreaScreen = () => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(true);
  const [areaList, setAreaList] = useState<AreaType[]>([]);
  useState<boolean>(true);
  const cancelRef = useRef(null);
  const toast = useToast();
  const navigation = useNavigation<AreaScreenNavigationProp>();
  const route = useRoute<AreaScreenRouteProp>();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const token = useAppSelector((state) => state.auth.token);
  const selectedBranch = useAppSelector(
    (state) => state.company.selectedBranch
  );
  useEffect(() => {
    if (isLoggedIn && token && selectedBranch) {
      getAllArea();
    } else {
      dispatch(logout());
    }
  }, []);

  const getAllArea = async () => {
    setIsRefreshing(true);
    if (selectedBranch) {
      const result = await DeskApi.getAllArea(selectedBranch.id);
      if (result.status === 200) {
        console.log(result.data);
        if (result.data.length > 0) {
          setAreaList(result.data);
        }
        // let branchList: BranchState[] = [];

        // if (result.data.deskSchedules.length > 0) {
        //   setDeskSchedules(result.data.roomSchedules);
        // }
      }
    }
    setIsRefreshing(false);
  };

  return (
    <VStack safeAreaTop h="100%" mx={4}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={getAllArea} />
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
                Choose Area
              </Heading>
              <Flex flex={1}></Flex>
            </Flex>
            {areaList.length > 0 &&
              areaList.map((area) => {
                return (
                  <Pressable
                    key={area.id}
                    onPress={() =>
                      navigation.navigate("OfficeDesk", { areaId: area.id })
                    }
                  >
                    <Flex
                      direction="row"
                      justify="space-between"
                      bg={useColorModeValue("white", "greyColor.1000")}
                      borderRadius="xl"
                      px={5}
                      py={5}
                      my={1}
                    >
                      <Text
                        fontFamily="sf-pro-text-medium"
                        fontSize={15}
                        fontWeight="700"
                      >
                        {area.name}
                      </Text>
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
  );
};

export default AreaScreen;
