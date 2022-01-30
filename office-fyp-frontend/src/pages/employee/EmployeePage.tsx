import {
  Flex,
  Button,
  Heading,
  useToast,
  Text,
  Box,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Badge,
  Icon,
  useColorModeValue,
  Spinner,
  FormHelperText,
  FormLabel,
  Input,
  FormControl,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  Switch,
} from "@chakra-ui/react";
import { EmployeeApi } from "api/EmployeeApi";
import { RoomApi } from "api/RoomApi";
import { logout } from "app/auth/authSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { FiEdit2 } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { EmployeeType } from "types/Employee";

interface CreateEmployeeForm {
  email: string;
  is_admin: boolean;
}
const EmployeePage = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateEmployeeForm>({
    defaultValues: { email: "", is_admin: false },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [employeeList, setEmployeeList] = useState<any[]>([]);
  let cardColor = useColorModeValue("white", "gray.700");
  let borderColor = useColorModeValue("transparent", "gray.600");
  const history = useHistory();
  const dispatch = useAppDispatch();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const toast = useToast();
  const savedBranchs = useAppSelector((state) => state.company.selectedBranch);
  useEffect(() => {
    getAllEmployee();
  }, []);

  const getAllEmployee = async () => {
    setIsLoading(true);
    if (savedBranchs) {
      const result = await EmployeeApi.getAllEmployee(savedBranchs);
      console.log(result);
      if (result.status === 200 && result.data) {
        if (result.data.length > 0) {
          setEmployeeList(result.data);
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

  const onOpenEditModal = (employee: EmployeeType) => {
    setOpenEditModal(true);
    setSelectedEmployee(employee.id);
    // setValue("name", employee.user);
    setValue("is_admin", employee.is_admin);
  };

  const onCloseEditModal = () => {
    setOpenEditModal(false);
    reset();
  };

  const onSubmit = async (field: CreateEmployeeForm) => {
    const payload = {
      ...field,
      branchId: savedBranchs,
    };
    console.log(payload);
    if (payload.is_admin) {
      const result = await EmployeeApi.addAdmin(payload);
      console.log(result);
      if (result.status === 201 && !result.data) {
        toast({
          title: "Created Successfull!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onCloseAddModal();
        getAllEmployee();
      } else if (result.data.status && result.data.status === 409) {
        toast({
          title: "Something wrong...",
          description: result.data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Something wrong...",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } else {
      const result = await EmployeeApi.addEmployee(payload);
      if (result.status === 201 && !result.data) {
        toast({
          title: "Created Successfull!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onCloseAddModal();
        getAllEmployee();
      } else if (result.data.status && result.data.status === 409) {
        toast({
          title: "Something wrong...",
          description: result.data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Something wrong...",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };
  // const onEdit = async (payload: CreateEmployeeForm) => {
  //   const result = await RoomApi.editRoom(selectedEmployee, payload);
  //   console.log(result);
  //   if (result.status === 200) {
  //     toast({
  //       title: "Edit Successfull!",
  //       status: "success",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //     getAllEmployee();
  //   } else {
  //     toast({
  //       title: "Something wrong...",
  //       status: "error",
  //       duration: 9000,
  //       isClosable: true,
  //     });
  //   }
  //   onCloseEditModal();
  // };

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
          <Flex direction="row" justify="space-between" align="center">
            <Heading as="h4" size="md">
              All Employee
            </Heading>
            <Button
              colorScheme="blue"
              size="md"
              w="200px"
              onClick={() => setOpenAddModal(true)}
            >
              New Employee
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
                  <Th>No</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>is Admin?</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {employeeList.length > 0 &&
                  employeeList.map((employee: any, index: number) => {
                    return (
                      <Tr key={employee.id}>
                        <Td>{index + 1}</Td>
                        <Td>{employee.user.name}</Td>
                        <Td>{employee.user.email}</Td>
                        <Td>
                          {employee.is_admin ? (
                            <Badge
                              borderRadius="50px"
                              px="3"
                              py="1"
                              colorScheme="green"
                            >
                              Admin
                            </Badge>
                          ) : (
                            <Badge
                              borderRadius="50px"
                              px="3"
                              py="1"
                              colorScheme="blue"
                            >
                              Employee
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
                            onClick={() => onOpenEditModal(employee)}
                          >
                            <Icon as={FiEdit2} color="white" fontSize="20px" />
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </Box>

          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={openAddModal}
            onClose={onCloseAddModal}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add Employee</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormControl>
                    <FormLabel>Employee Email</FormLabel>
                    <Input
                      placeholder="Employee Email"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <FormHelperText mt="0" color="red.500">
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl
                    mt={5}
                    display="flex"
                    w="100%"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <FormLabel>Is_admin?</FormLabel>
                    <Switch size="md" {...register("is_admin")} />
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
          {/* <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={openEditModal}
            onClose={onCloseEditModal}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Room</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <form onSubmit={handleSubmit(onEdit)}>
                  <FormControl>
                    <FormLabel>Room name</FormLabel>
                    <Input
                      placeholder="Room name"
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <FormHelperText mt="0" color="red.500">
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Room Detail</FormLabel>
                    <Input
                      placeholder="Room Detail"
                      {...register("detail", { required: true })}
                    />
                    {errors.detail && (
                      <FormHelperText mt="0" color="red.500">
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl
                    mt={5}
                    display="flex"
                    w="100%"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <FormLabel>Active?</FormLabel>
                    <Switch size="md" {...register("status")} />
                  </FormControl>
                  <Flex justify="flex-end" mt={10}>
                    <Button onClick={onCloseEditModal}>Cancel</Button>
                    <Button ml={5} type="submit" colorScheme="blue" mr={3}>
                      Save
                    </Button>
                  </Flex>
                </form>
              </ModalBody>
            </ModalContent>
          </Modal> */}
        </Flex>
      )}
    </>
  );
};

export default EmployeePage;
