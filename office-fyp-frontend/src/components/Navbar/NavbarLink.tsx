import { FiUser, FiSettings, FiBell, FiShoppingCart } from "react-icons/fi";
import { BiSync } from "react-icons/bi";
import {
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  SimpleGrid,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "ColorModeSwitcher";
// Custom Icons
// import { ProfileIcon, SettingsIcon } from "components/Icons/Icons";
// Custom Components
// import { ItemContent } from "components/Menu/ItemContent";
// import { SidebarResponsive } from "components/Sidebar/Sidebar";
import React from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import SidebarResponsive from "components/Sidebar/SidebarResponsive";
import classes from "./NavbarLink.module.css";
import routes from "routes";

const NavbarLink = () => {
  let navbarIcon = useColorModeValue("gray.500", "gray.200");
  const history = useHistory();
  let location = useLocation();
  let activeRoute = routes.find(
    (route) => route.layout + route.path === location.pathname
  );
  return (
    <Flex
      className={activeRoute && !activeRoute.showSide ? classes.hidenav : ""}
      // pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      justifyContent="center"
      flexDirection="row"
    >
      {/* <Button
        display={{ base: "none", md: "block" }}
        variant="outline"
        borderColor="primary"
        color="primary"
        ms={{ base: "12px", xl: "0px" }}
        me="12px"
        onClick={() => history.push("/integration")}
      >
        Sync
      </Button>
      <Icon
        as={BiSync}
        cursor="pointer"
        color={navbarIcon}
        fontSize="20px"
        display={{ base: "block", md: "none" }}
        ms={{ base: "12px", xl: "0px" }}
        me="12px"
        onClick={() => history.push("/integration")}
      /> */}
      <Icon
        as={FiUser}
        cursor="pointer"
        color={navbarIcon}
        fontSize="20px"
        ms={{ base: "12px", xl: "0px" }}
        me="12px"
        onClick={() => history.push("/profile")}
      />

      <Menu>
        <MenuButton>
          <Icon
            as={FiSettings}
            color={navbarIcon}
            fontSize="20px"
            ms={{ base: "12px", xl: "0px" }}
            me="12px"
          />
        </MenuButton>
        <MenuList p="16px 8px">
          <Flex flexDirection="column">
            {/* <MenuItem onClick={ () => history.push("/order-setting") } icon={<FiShoppingCart />} borderRadius="8px" mb="10px">
              Order Setting
            </MenuItem> */}
          </Flex>
        </MenuList>
      </Menu>

      <Menu>
        <MenuButton>
          <Icon
            as={FiBell}
            color={navbarIcon}
            fontSize="20px"
            ms={{ base: "12px", xl: "0px" }}
            me="12px"
          />
        </MenuButton>
        <MenuList p="16px 8px">
          <Flex flexDirection="column">
            <MenuItem borderRadius="8px" mb="10px">
              Notification here
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
      <ColorModeSwitcher />
      <SidebarResponsive />
    </Flex>
  );
};

export default NavbarLink;
