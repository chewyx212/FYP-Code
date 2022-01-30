import { FiMenu,FiLogOut} from "react-icons/fi";
import {
  Box,
  Icon,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Stack,
  useColorModeValue,
  useDisclosure,
  Button,
  Text
} from "@chakra-ui/react";
import SidebarLink from "./SidebarLink";
import SidebarItem,{ SidebarType } from "./SidebarItem";
import { useDispatch } from "react-redux";
import { logout } from "app/auth/authSlice";
import LogoutDialog from "components/Dialog/LogoutDialog";
import { useRef } from "react";

const Sidebar = () => {
  let hamburgerColor = useColorModeValue("gray.500", "gray.200");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const {
    isOpen: isOpenLogout,
    onOpen: onOpenLogout,
    onClose: onCloseLogout,
  } = useDisclosure();

  const cancelRef = useRef(null);

  return (
    <Flex display={{ sm: "flex", xl: "none" }} alignItems="center">
      <Icon
        as={FiMenu}
        color={hamburgerColor}
        fontSize="20px"
        ms={{ base: "16px", xl: "0px" }}
        me="16px"
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} onClose={onClose} placement={"left"}>
        <DrawerOverlay />
        <DrawerContent
          w="250px"
          maxW="250px"
          ms={{
            sm: "16px",
          }}
          my={{
            sm: "16px",
          }}
          borderRadius="16px"
        >
          <DrawerCloseButton
            _focus={{ boxShadow: "none" }}
            _hover={{ boxShadow: "none" }}
          />
          <DrawerBody maxW="250px" px="1rem">
            <Box maxW="100%" h="90vh">
              <Box>CRM Module</Box>
              <Stack direction="column" mb="40px">
                <Box>
                  {SidebarItem.map((prop: SidebarType) => {
                    return <SidebarLink key={prop.name} routes={prop} />;
                  })}
                  <Button
                    onClick={ onOpenLogout }
                    boxSize="initial"
                    justifyContent="flex-start"
                    alignItems="center"
                    bg="transparent"
                    mb={{
                      xl: "12px",
                    }}
                    mx={{
                      xl: "auto",
                    }}
                    py="12px"
                    ps={{
                      sm: "10px",
                      xl: "16px",
                    }}
                    borderRadius="15px"
                    w="100%"
                    _active={{
                      bg: "inherit",
                      transform: "none",
                      borderColor: "transparent",
                    }}
                    _focus={{
                      boxShadow: "none",
                    }}
                  >
                    <Flex>
                      <Flex
                        alignItems={"center"}
                        justifyContent={"center"}
                        borderRadius={"12px"}
                        bg={useColorModeValue("white", "gray.700")}
                        color="red"
                        h="30px"
                        w="30px"
                        me="12px"
                        transition="0.2s linear"
                      >
                        <Icon as={FiLogOut} />
                      </Flex>
                      <Text color="red" my="auto" fontSize="sm">
                        Logout
                      </Text>
                    </Flex>
                  </Button>
                </Box>
              </Stack>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <LogoutDialog isOpen={ isOpenLogout } onClose={ onCloseLogout } cancelRef={ cancelRef } />
    </Flex>
  );
};

export default Sidebar;
