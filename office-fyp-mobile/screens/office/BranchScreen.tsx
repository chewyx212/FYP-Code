import {
  Text,
  useColorModeValue,
  Heading,
  VStack,
  ScrollView,
  Flex,
  Pressable,
  Icon,
  useToast,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../RootStackParams";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RefreshControl } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { AuthApi } from "../../api/AuthApi";
import { BranchState } from "../../types/branchType";
import {
  saveCompany,
  saveCompanyBranch,
  selectBranch,
} from "../../app/company/companySlice";

type BranchScreenNavigationProp = BottomTabNavigationProp<
  RootStackParamList,
  "OfficeBranch"
>;
type BranchScreenRouteProp = RouteProp<RootStackParamList, "OfficeBranch">;
const BranchScreen = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ duration: string }>();
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [allBranchList, setAllBranchList] = useState<any[]>([]);
  useState<boolean>(true);
  const cancelRef = useRef(null);
  const toast = useToast();
  const navigation = useNavigation<BranchScreenNavigationProp>();
  const route = useRoute<BranchScreenRouteProp>();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const token = useAppSelector((state) => state.auth.token);
  const selectedBranch = useAppSelector(
    (state) => state.company.selectedBranch
  );
  const branchList = useAppSelector((state) => state.company.branches);
  useEffect(() => {
    if (isLoggedIn && token && selectedBranch && branchList) {
      //   getUserDetail();
      setAllBranchList(branchList);
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
        dispatch(saveCompanyBranch({ branches: branchList }));
      }
    }
    setIsRefreshing(false);
  };
  const onSelectedBranch = async (branch: BranchState) => {
    if (branch.id === selectedBranch?.id) {
      await toast.closeAll();
      toast.show({
        title: `Already selected`,
        status: "info",
        placement: "top",
        isClosable: true,
      });
    } else {
      dispatch(selectBranch({ branch }));
    }
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
                  Branch
                </Heading>
                <Flex flex={1}></Flex>
              </Flex>
              {allBranchList.length > 0 &&
                allBranchList.map((branch) => {
                  return (
                    <Pressable
                      key={branch.id}
                      onPress={() => onSelectedBranch(branch)}
                    >
                      <Flex
                        direction="row"
                        justify="space-between"
                        align="center"
                        bg={useColorModeValue("white", "greyColor.1000")}
                        borderRadius="xl"
                        pr={5}
                        pl={4}
                        py={4}
                        my={1}
                      >
                        <Flex>
                          <Text
                            fontFamily="sf-pro-text-medium"
                            fontSize={15}
                            fontWeight="700"
                          >
                            {branch.name}
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
                            {branch.address}
                          </Text>
                        </Flex>
                        {selectedBranch && branch.id === selectedBranch.id && (
                          <Icon
                            color={useColorModeValue(
                              "themeColor.500",
                              "greyColor.600"
                            )}
                            as={FontAwesome}
                            name="check"
                            size={4}
                          />
                        )}
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

export default BranchScreen;
