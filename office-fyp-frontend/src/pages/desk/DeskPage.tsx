import {
  Flex,
  Button,
  Heading,
  useToast,
  Text,
  Avatar,
  Box,
  HStack,
  Spacer,
  Progress,
  Img,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Badge,
  SimpleGrid,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Icon,
  useColorModeValue,
  Image,
  Spinner,
  FormHelperText,
  FormLabel,
  Input,
  FormControl,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Switch,
} from "@chakra-ui/react";
import { DeskApi } from "api/DeskApi";
import { logout } from "app/auth/authSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import { DeskType } from "types/DeskType";
import { AreaApi } from "api/AreaApi";
import { AreaType } from "types/AreaType";

const DeskPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openPreviewImage, setOpenPreviewImage] = useState<boolean>(false);
  const [deskList, setDeskList] = useState<any[]>([]);
  const [area, setArea] = useState<AreaType>();

  let cardColor = useColorModeValue("white", "gray.700");
  let borderColor = useColorModeValue("transparent", "gray.600");
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const areaId = new URLSearchParams(history.location.search).get("areaId");
  useEffect(() => {
    getArea();
  }, []);

  const getAllDesk = async () => {
    setIsLoading(true);
    if (areaId) {
      const result = await DeskApi.getAllDesk(areaId);
      if (result.status === 200 && result.data) {
        if (result.data.length > 0) {
        }
      } else if (result.status === 200) {
        history.push("/onboarding");
      } else if (result.status === 401) {
        dispatch(logout());
      } else if (result.status === 404) {
        console.log(result.data.message);
      }
    } else {
      history.push("/area");
    }

    setIsLoading(false);
  };
  const getArea = async () => {
    setIsLoading(true);
    if (areaId) {
      const result = await AreaApi.getOneArea(areaId);
      console.log(result);
      if (result.status === 200 && result.data) {
        setArea(result.data);
        setDeskList(result.data.desks)
      } else if (result.status === 200) {
        history.push("/onboarding");
      } else if (result.status === 401) {
        dispatch(logout());
      } else if (result.status === 404) {
        console.log(result.data.message);
      }
    } else {
      history.push("/area");
    }

    setIsLoading(false);
  };

  const showImagePreview = async () => {
    setOpenPreviewImage(true);
  };
  const closeImagePreview = async () => {
    setOpenPreviewImage(false);
  };

  return (
    <>
      {isLoading ? (
        <Flex
          pt={{ base: "120px", md: "100px" }}
          h="100%"
          w="100%"
          justify="center"
        >
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Flex flexDirection="column" pt={{ base: "120px", md: "100px" }}>
          {area && (
            <Flex
              flexDirection="row"
              justify="space-between"
              align="center"
              bg="white"
              borderRadius="xl"
              py={10}
              px={5}
              my={5}
            >
              <Heading size="md">Area Name: {area.name}</Heading>
              <Button onClick={showImagePreview}>View Floor Plan</Button>
            </Flex>
          )}

          <Flex direction="row" justify="space-between" align="center">
            <Heading as="h4" size="md">
              All Desk
            </Heading>
            <Button
              colorScheme="blue"
              size="md"
              w="200px"
              onClick={() =>
                history.push({
                  pathname: "/area/add-desk",
                  state: {
                    areaId,
                  },
                })
              }
            >
              New Desk
            </Button>
          </Flex>
          <Box
            overflow="auto"
            border="1px"
            borderColor={borderColor}
            mt="5"
            borderRadius="20px"
            p="1.5rem"
            bg={cardColor}
            boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
          >
            {deskList.length <= 0 && (
              <Flex align="center" justify="center" w="100%">
                <Text>No Desk Found.</Text>
              </Flex>
            )}
            {deskList.length > 0 && (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>No</Th>
                    <Th>Name</Th>
                    <Th>Status</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {deskList.map((desk: DeskType, index: number) => {
                    return (
                      <Tr key={desk.id}>
                        <Td>{index + 1}</Td>
                        <Td>{desk.name}</Td>
                        <Td>
                          {desk.status ? (
                            <Badge
                              borderRadius="50px"
                              px="3"
                              py="1"
                              colorScheme="green"
                            >
                              Active
                            </Badge>
                          ) : (
                            <Badge
                              borderRadius="50px"
                              px="3"
                              py="1"
                              colorScheme="red"
                            >
                              Inactive
                            </Badge>
                          )}
                        </Td>
                        <Td>
                          <Button
                            fontSize="16px"
                            type="submit"
                            bg="primary"
                            h="45"
                            color="white"
                            _hover={{
                              bg: "blue.200",
                            }}
                            _active={{
                              bg: "blue.400",
                            }}
                          >
                            <Icon as={FiEdit2} color="white" fontSize="20px" />
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            )}
          </Box>
        </Flex>
      )}

      <Modal isOpen={openPreviewImage} onClose={closeImagePreview} isCentered>
        <ModalOverlay />
        <ModalContent>
          <Img src={area?.imagePath} alt="Area Image" />
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeskPage;
