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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { NONAME } from "dns";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import routes, { routeType } from "routes";
import { SidebarType } from "./SidebarItem";
type Props = {
  routes: SidebarType;
};
const SidebarLink = ({ routes }: Props) => {
  let location = useLocation();
  let activeBg = useColorModeValue("white", "gray.700");
  let inactiveBg = useColorModeValue("white", "gray.700");
  let activeColor = useColorModeValue("gray.700", "white");
  let inactiveColor = useColorModeValue("gray.400", "gray.400");
  let sidebarActiveShadow = "0px 7px 11px rgba(0, 0, 0, 0.04)";
  let variantChange = "0.2s linear";

  const [isExpanded, setIsExpanded] = useState<Boolean>(false);

  const activeRoute = (routeName: string) => {
    return location.pathname === routeName ? "active" : "";
  };
  return (
    <>
      {routes.subNav.length > 0 ? (
        <Menu placement="right">
          {activeRoute(routes.link) === "active" ? (
            <>
              <MenuButton
                as={Button}
                boxSize="initial"
                justifyContent="flex-start"
                alignItems="center"
                boxShadow={sidebarActiveShadow}
                bg={activeBg}
                transition={variantChange}
                mb={{
                  xl: "12px",
                }}
                mx={{
                  xl: "auto",
                }}
                ps={{
                  sm: "10px",
                  xl: "16px",
                }}
                py="12px"
                borderRadius="15px"
                w="100%"
                _active={{
                  bg: "inherit",
                  transform: "none",
                  borderColor: "transparent",
                }}
                _focus={{
                  boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.04)",
                }}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <Flex>
                  <Flex
                    alignItems={"center"}
                    justifyContent={"center"}
                    borderRadius={"12px"}
                    bg="primary"
                    color="white"
                    h="30px"
                    w="30px"
                    me="12px"
                    transition={variantChange}
                  >
                    <Icon as={routes.icon}></Icon>
                  </Flex>
                  <Text color={activeColor} my="auto" fontSize="sm">
                    {routes.name}
                  </Text>
                </Flex>
              </MenuButton>

              {isExpanded && (
                <Flex flexDirection="column">
                  {routes.subNav.map((sub) => (
                    <MenuItem
                      key={sub.link}
                      as={NavLink}
                      to={sub.link}
                      borderRadius="8px"
                      mb="10px"
                    >
                      <Text color={activeColor} fontSize="14px" pl="10">
                        {sub.name}
                      </Text>
                    </MenuItem>
                  ))}
                </Flex>
              )}
            </>
          ) : (
            <>
              <MenuButton
                as={Button}
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
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <Flex>
                  {typeof routes.icon === "string" ? (
                    <Icon as={routes.icon} />
                  ) : (
                    <Flex
                      alignItems={"center"}
                      justifyContent={"center"}
                      borderRadius={"12px"}
                      bg={inactiveBg}
                      color="primary"
                      h="30px"
                      w="30px"
                      me="12px"
                      transition={variantChange}
                    >
                      <Icon as={routes.icon} />
                    </Flex>
                  )}
                  <Text color={inactiveColor} my="auto" fontSize="sm">
                    {routes.name}
                  </Text>
                </Flex>
              </MenuButton>

              {isExpanded && (
                <Flex flexDirection="column">
                  {routes.subNav.map((sub) => (
                    <MenuItem
                      key={sub.link}
                      as={NavLink}
                      to={sub.link}
                      borderRadius="8px"
                      mb="10px"
                    >
                      <Text fontSize="14px" pl="10">
                        {sub.name}
                      </Text>
                    </MenuItem>
                  ))}
                </Flex>
              )}
            </>
          )}
        </Menu>
      ) : (
        <NavLink to={routes.link}>
          {activeRoute(routes.link) === "active" ? (
            <Button
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              boxShadow={sidebarActiveShadow}
              bg={activeBg}
              transition={variantChange}
              mb={{
                xl: "12px",
              }}
              mx={{
                xl: "auto",
              }}
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              py="12px"
              borderRadius="15px"
              w="100%"
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.04)",
              }}
            >
              <Flex>
                <Flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  borderRadius={"12px"}
                  bg="primary"
                  color="white"
                  h="30px"
                  w="30px"
                  me="12px"
                  transition={variantChange}
                >
                  <Icon as={routes.icon}></Icon>
                </Flex>
                <Text color={activeColor} my="auto" fontSize="sm">
                  {routes.name}
                </Text>
              </Flex>
            </Button>
          ) : (
            <Button
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
                {typeof routes.icon === "string" ? (
                  <Icon as={routes.icon} />
                ) : (
                  <Flex
                    alignItems={"center"}
                    justifyContent={"center"}
                    borderRadius={"12px"}
                    bg={inactiveBg}
                    color="primary"
                    h="30px"
                    w="30px"
                    me="12px"
                    transition={variantChange}
                  >
                    <Icon as={routes.icon} />
                  </Flex>
                )}
                <Text color={inactiveColor} my="auto" fontSize="sm">
                  {routes.name}
                </Text>
              </Flex>
            </Button>
          )}
        </NavLink>
      )}
    </>
  );
};

export default SidebarLink;
