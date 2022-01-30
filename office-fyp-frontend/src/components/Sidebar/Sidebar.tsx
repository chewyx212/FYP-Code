import {
  Box,
  Button,
  Icon,
  Flex,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import routes, { routeType } from "routes";
import SidebarItem, { SidebarType } from "./SidebarItem";
import SidebarLink from "./SidebarLink";
import classes from "./Sidebar.module.css";
import { FiLogOut } from "react-icons/fi";
import { logout } from "app/auth/authSlice";
import { useDispatch } from "react-redux";
import LogoutDialog from "components/Dialog/LogoutDialog";
// FUNCTIONS
const Sidebar: React.FC = () => {
  let activeColor = useColorModeValue("gray.700", "white");
  const [isShow, setIsShow] = useState<Boolean>(true);
  let location = useLocation();
  let activeRoute = routes.find(
    (route) => route.layout + route.path === location.pathname
  );
  const dispatch = useDispatch();

  const {
    isOpen: isOpenLogout,
    onOpen: onOpenLogout,
    onClose: onCloseLogout,
  } = useDisclosure();

  const cancelRef = useRef(null);

  return (
    <Box
      zIndex="999"
      className={activeRoute && !activeRoute.showSide ? classes.hidenav : ""}
      display={{ base: "none", sm: "none", xl: "block" }}
      position="fixed"
      transition={"0.2s linear"}
      w="260px"
      maxW="260px"
      ms={{
        sm: "30px",
      }}
      my={{
        sm: "16px",
      }}
      h="calc(100vh - 32px)"
      ps="20px"
      pe="20px"
      m={"16px 0px 16px 16px"}
    >
      <Box my="16px" textAlign="center" fontSize="20px">
        SpaceB
      </Box>
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
      
      <LogoutDialog isOpen={ isOpenLogout } onClose={ onCloseLogout } cancelRef={ cancelRef } />
      
    </Box>
  );
};

export default Sidebar;
