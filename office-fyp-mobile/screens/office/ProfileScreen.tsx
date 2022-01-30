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
  Input,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../RootStackParams";
import { logout } from "../../app/auth/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

type ProfileScreenNavigationProp = BottomTabNavigationProp<
  RootStackParamList,
  "OfficeProfile"
>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, "OfficeProfile">;
const ProfileScreen = () => {
  const [logoutModal, setLogoutModal] = useState<boolean>(false);
  const cancelRef = useRef(null);
  const toast = useToast();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const route = useRoute<ProfileScreenRouteProp>();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  useEffect(() => {
    if (isLoggedIn && token && user) {
    } else {
      dispatch(logout());
    }
  }, []);

  const onLogout = async () => {
    dispatch(logout());
  };

  return (
    <VStack safeAreaTop h="100%" mx={4}>
      <ScrollView _contentContainerStyle={{ pb: 16 }}>
        <Flex
          direction="row"
          w="100%"
          justify="space-between"
          align="center"
          my={5}
        >
          <Flex flex={1}></Flex>
          <Heading
            textAlign="center"
            flex={1}
            fontFamily="sf-pro-text-semibold"
            fontSize={20}
            fontWeight="800"
          >
            Profile
          </Heading>
          <Pressable
            alignItems="flex-end"
            flex={1}
            onPress={() => setLogoutModal(true)}
          >
            <Icon
              mr={3}
              color={useColorModeValue("themeColor.500", "greyColor.600")}
              as={AntDesign}
              name="logout"
              size={5}
            />
          </Pressable>
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
          pl={5}
          h={12}
          value={user.name}
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
          Email
        </Text>
        <Input
          isReadOnly
          value={user.email}
          pl={5}
          h={12}
          type="text"
          fontFamily="sf-pro-text-regular"
          fontSize="15px"
          _focus={{
            borderWidth: 0.5,
            borderColor: "dark.200",
          }}
        />
      </ScrollView>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={logoutModal}
        onClose={() => setLogoutModal(false)}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Log Out?</AlertDialog.Header>
          <AlertDialog.Body>
            This will remove all data and you will need to login again. This action
            cannot be reversed. Are you sure you still want to proceed?
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={() => setLogoutModal(false)}
                ref={cancelRef}
              >
                Cancel
              </Button>
              <Button colorScheme="danger" onPress={onLogout}>
                Log Out
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </VStack>
  );
};

export default ProfileScreen;
