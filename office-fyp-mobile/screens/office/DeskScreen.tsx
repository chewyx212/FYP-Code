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
import { AreaType, AreaTypeWithDesk } from "../../types/areaType";
import ENV from "../../env";

type DeskScreenNavigationProp = BottomTabNavigationProp<
  RootStackParamList,
  "OfficeDesk"
>;

type LatLng = [Number, Number];
type DeskScreenRouteProp = RouteProp<RootStackParamList, "OfficeDesk">;
const DeskScreen = () => {
  const [deskSchedules, setDeskSchedules] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(true);
  const [selectedArea, setSelectedArea] = useState<AreaTypeWithDesk>();
  // const [deskList, setDeskList] = useState<DeskType[]>([]);
  const [chooseBranchModal, setChooseBranchModal] = useState<boolean>(false);
  useState<boolean>(true);
  const cancelRef = useRef(null);
  const toast = useToast();
  const navigation = useNavigation<DeskScreenNavigationProp>();
  const route = useRoute<DeskScreenRouteProp>();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const token = useAppSelector((state) => state.auth.token);
  const { areaId } = route.params;
  const selectedBranch = useAppSelector(
    (state) => state.company.selectedBranch
  );

  useEffect(() => {
    if (isLoggedIn && token && selectedBranch) {
      getAreaDetail();
    } else {
      dispatch(logout());
    }
  }, []);

  const getAreaDetail = async () => {
    setIsRefreshing(true);
    if (areaId) {
      const result = await DeskApi.getOneArea(areaId);
      if (result.status === 200) {
        console.log(result.data);
        if (result.data) {
          setSelectedArea({
            id: result.data.id,
            name: result.data.name,
            status: result.data.status,
            imagePath: ENV.API_URL + result.data.image,
            desks: result.data.desks.map((desk: any) => ({
              id: desk.id,
              name: desk.name,
              status: desk.status,
              lat: desk.lat,
              lng: desk.lng,
            })),
          });
        }
      }
    } else {
      navigation.navigate("OfficeArea");
    }
    setIsRefreshing(false);
  };
  const onSelectDesk = (id: string) => {
    navigation.navigate("OfficeAddDesk", { deskId: id });
  };

  return (
    <VStack safeAreaTop h="100%" mx={4}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={getAreaDetail} />
        }
        _contentContainerStyle={{ pb: 16 }}
      >
        {selectedArea && (
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
                Select Desk
              </Heading>
              <Flex flex={1}></Flex>
            </Flex>
            {selectedArea.desks.length > 0 &&
              selectedArea.desks
                .filter((desk) => desk.status === true)
                .map((desk) => {
                  return (
                    <Pressable
                      key={desk.id}
                      onPress={() => onSelectDesk(desk.id)}
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
                          <Flex pl={5}>
                            <Text
                              fontFamily="sf-pro-text-medium"
                              fontSize={15}
                              fontWeight="700"
                            >
                              {desk.name}
                            </Text>
                            <Text
                              color={useColorModeValue(
                                "greyColor.400",
                                "greyColor.400"
                              )}
                              fontFamily="sf-pro-text-regular"
                              fontSize={13}
                              fontWeight="500"
                              pt={3}
                            >
                              {desk.lat} - {desk.lng}
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
  );
};

export default DeskScreen;
