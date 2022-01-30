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
} from "@chakra-ui/react";
import { AreaApi } from "api/AreaApi";
import { CompanyApi } from "api/CompanyApi";
import { StoreApi } from "api/StoreApi";
import { logout } from "app/auth/authSlice";
import { saveCompany } from "app/company/companySlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { FiUser, FiDollarSign, FiUsers, FiShoppingCart } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { CompanyState } from "types/CompanyType";

const AreaPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [gettingStart, setGettingStart] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [openPreviewImage, setOpenPreviewImage] = useState<boolean>(false);
  const [areaList, setAreaList] = useState<any[]>([]);
  let cardColor = useColorModeValue("white", "gray.700");
  let borderColor = useColorModeValue("transparent", "gray.600");
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const toast = useToast();

  const savedBranchs = useAppSelector((state) => state.company.selectedBranch);
  useEffect(() => {
    getAllArea();
  }, []);

  const getAllArea = async () => {
    setIsLoading(true);
    console.log(savedBranchs);
    console.log("hahweahwh");
    if (savedBranchs) {
      const result = await AreaApi.getAllArea(savedBranchs);
      console.log(result);
      if (result.status === 200 && result.data) {
        if (result.data.length > 0) {
          setAreaList(result.data);
        }
      } else if (result.status === 200) {
        history.push("/onboarding");
      } else if (result.status === 401) {
        dispatch(logout());
      } else if (result.status === 404) {
        console.log(result.data.message);
      }
    } else {
      history.push("/dashboard");
    }

    setIsLoading(false);
  };
  const onCloseAddModal = () => {
    setOpenAddModal(false);
    reset();
  };

  const showImagePreview = async (imagePath: string) => {
    setPreviewImage(imagePath);
    setOpenPreviewImage(true);
  };
  const closeImagePreview = async () => {
    setPreviewImage("");
    setOpenPreviewImage(false);
  };

  const onSubmit = async (field: any) => {
    const payload = {
      name: field.name,
      branchId: savedBranchs,
      image: field.floorplan[0],
    };
    console.log(payload);
    const result = await AreaApi.createArea(payload);
    console.log(result);
    if (result.status === 201) {
      onCloseAddModal();
      getAllArea();
      toast({
        title: "Created Success.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Something wrong. Try again.",
        description: result.data.msg,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
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
      ) : areaList.length > 0 ? (
        <Flex flexDirection="column" pt={{ base: "120px", md: "100px" }}>
          <Flex direction="row" justify="space-between" align="center">
            <Heading as="h4" size="md">
              All Area List
            </Heading>
            <Button
              colorScheme="blue"
              size="md"
              w="200px"
              onClick={() => setOpenAddModal(true)}
            >
              New Area
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
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Image</Th>
                  <Th>Status</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {areaList.map((area) => (
                  <Tr key={area.id}>
                    <Td>{area.name}</Td>
                    <Td>
                      <Button onClick={() => showImagePreview(area.imagePath)}>
                        View Image
                      </Button>
                    </Td>
                    <Td>
                      {area.status ? (
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
                        onClick={() =>
                          history.push({
                            pathname: "/area/desk",
                            search: `?areaId=${area.id}`,
                          })
                        }
                      >
                        View
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Flex>
      ) : !gettingStart ? (
        <Flex
          pt={{ base: "120px", md: "100px" }}
          h="70vh"
          flexDirection="column"
          justify="center"
          alignItems="center"
        >
          <Flex width="300px" flexDirection="column" s>
            <Heading>Arrange your desk with ease!</Heading>
            <Button
              onClick={() => setGettingStart(true)}
              mt={3}
              bg="blue.400"
              color="white"
              _hover={{ bg: "blue.500" }}
              variant="solid"
            >
              Getting Start
            </Button>
          </Flex>
        </Flex>
      ) : (
        <Flex pt={{ base: "120px", md: "100px" }} flexDirection="column">
          <Text fontSize={22} fontWeight="bold">
            Create your first Area.
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <SimpleGrid mt="10" columns={{ base: 1 }} spacing={10}>
                <Box>
                  <FormLabel>Area Name</FormLabel>
                  <Input
                    borderRadius="15px"
                    fontSize="sm"
                    mb="5px"
                    type="text"
                    placeholder="Area Name"
                    size="lg"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <FormHelperText mt="0" color="red.500">
                      This field is required
                    </FormHelperText>
                  )}
                </Box>

                <Box>
                  <FormLabel>Floor Plan</FormLabel>
                  <Input
                    fontSize="sm"
                    mb="5px"
                    type="file"
                    placeholder="Area Floor Plan"
                    size="lg"
                    {...register("floorplan", { required: true })}
                  />
                  {errors.floorplan && (
                    <FormHelperText mt="0" color="red.500">
                      This field is required
                    </FormHelperText>
                  )}
                </Box>
              </SimpleGrid>
            </FormControl>
            <Button
              fontSize="16px"
              type="submit"
              bg="primary"
              w="100%"
              h="45"
              mt="40px"
              color="white"
              _hover={{
                bg: "blue.200",
              }}
              _active={{
                bg: "blue.400",
              }}
            >
              Submit
            </Button>
          </form>
        </Flex>
      )}

      <Modal isOpen={openPreviewImage} onClose={closeImagePreview} isCentered>
        <ModalOverlay />
        <ModalContent>
          <Img src={previewImage} alt="Area Image" />
        </ModalContent>
      </Modal>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={openAddModal}
        onClose={onCloseAddModal}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Area</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel>Room name</FormLabel>
                <Input
                  placeholder="Area name"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <FormHelperText mt="0" color="red.500">
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Area Floor Plan</FormLabel>
                <FormLabel>Floor Plan</FormLabel>
                <Input
                  fontSize="sm"
                  mb="5px"
                  type="file"
                  placeholder="Area Floor Plan"
                  size="lg"
                  {...register("floorplan", { required: true })}
                />
                {errors.floorplan && (
                  <FormHelperText mt="0" color="red.500">
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
              <Flex justify="flex-end" mt={10}>
                <Button onClick={onCloseAddModal}>Cancel</Button>
                <Button ml={5} type="submit" colorScheme="blue" mr={3}>
                  Save
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AreaPage;
