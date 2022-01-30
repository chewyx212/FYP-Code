// Chakra Imports
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  useColorModeValue,
  Button,
  Text,
  Icon,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import NavbarLink from "./NavbarLink";
import routes from "routes";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import classes from "./Navbar.module.css";
import { FiLogOut } from "react-icons/fi";
import { logout } from "app/auth/authSlice";
import { useDispatch } from "react-redux";
import LogoutDialog from "components/Dialog/LogoutDialog";

const Navbar: React.FC = () => {
  let isShow = true;
  const [scrolled, setScrolled] = useState(false);
  let mainText = useColorModeValue("gray.700", "gray.200");
  let secondaryText = useColorModeValue("gray.400", "gray.200");
  let navbarFilter = useColorModeValue(
    "none",
    "drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))"
  );
  let navbarBackdrop = "blur(21px)";
  let navbarShadow = useColorModeValue(
    "0px 7px 23px rgba(0, 0, 0, 0.05)",
    "none"
  );
  let navbarBg = useColorModeValue(
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.8) 110.84%)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.11) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );
  let navbarBorder = useColorModeValue("#FFFFFF", "rgba(255, 255, 255, 0.31)");
  let secondaryMargin = "0px";

  const history = useHistory();
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
    <Flex
      className={activeRoute && !activeRoute.showSide ? classes.fullWidth : ""}
      zIndex="997"
      position="fixed"
      boxShadow={navbarShadow}
      bg={navbarBg}
      borderColor={navbarBorder}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      borderWidth="1.5px"
      borderStyle="solid"
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      alignItems={{ xl: "center" }}
      borderRadius="16px"
      display={isShow ? "flex" : "none"}
      minH="75px"
      justifyContent={{ xl: "center" }}
      lineHeight="25.6px"
      mx="auto"
      mt={secondaryMargin}
      pb="8px"
      right="20px"
      px={{
        sm: "15px",
        md: "30px",
      }}
      ps={{
        xl: "12px",
      }}
      pt="8px"
      top="18px"
      w={{
        base: "calc(100vw - 45px)",
        sm: "calc(100vw - 45px)",
        xl: "calc(100vw - 50px - 275px)",
      }}
    >
      <Flex
        w="100%"
        flexDirection={{
          sm: "column",
          md: "row",
        }}
        justifyContent={{ base: "center", lg: "flex-end" }}
        alignItems={{ md: "center" }}
      >
        {/* <Box ml="auto" mr="2">
          <HStack spacing={5}>

          <Button 
              bg="primary" 
              color="white" 
              _hover={{
                bg: "blue.200",
              }}
              _active={{
                bg: "blue.400",
              }}>Store Clone</Button>
          </HStack>
        </Box> */}

        <NavbarLink />

        <Flex
          className={activeRoute && !activeRoute.showSide ? classes.hidenav : ""}
          w={{ sm: "100%", md: "auto" }}
          alignItems="center"
          justifyContent="right"
          // flexDirection="row"
        >
          <Button
            onClick={ onOpenLogout }
            className={activeRoute?.showSide ? classes.displayLogout : ""}
            ms={{ base: "12px", xl: "0px" }}
            me="12px"
            ml="auto"
            leftIcon={<FiLogOut />}
            _active={{
              bg: "inherit",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: "none",
            }}
            colorScheme="red"
          >
            Logout
          </Button>
        </Flex>
        {/* <Flex
          w={{ sm: "100%", md: "auto" }}
          alignItems="center"
          justifyContent="center"
          flexDirection="row"
        >
          <Button
            onClick={ onOpenLogout }
            className={activeRoute?.showSide ? classes.displayLogout : ""}
            
            display={{ base: "none", md: "block" }}
            ms={{ base: "12px", xl: "0px" }}
            me="12px"
            
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
        </Flex> */}
      </Flex>

      <LogoutDialog isOpen={ isOpenLogout } onClose={ onCloseLogout } cancelRef={ cancelRef } />
    </Flex>
  );
};

export default Navbar;
