
import {
  useColorModeValue,
  useDisclosure,
  Flex,
  Heading,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  VStack,
  Img,
  Text,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Select,
  Avatar,
  Icon,
  Badge,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Tooltip,
} from "@chakra-ui/react";
import DeleteDialog from "components/Dialog/DeleteDialog";
import Filter from "components/Filter/Filter";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiEdit3,
  FiTrash2,
  FiPlus,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useHistory } from "react-router";
import {
  Pagination,
  usePagination,
  PaginationPage,
  PaginationNext,
  PaginationPrevious,
  PaginationPageGroup,
  PaginationContainer,
  PaginationSeparator,
} from "@ajna/pagination";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  InfoOutlineIcon,
} from "@chakra-ui/icons";
import { CustomerApi } from "api/CustomerApi";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import WholeScreenSpinner from "components/Spinner/WholeScreenSpinner";

const CustomerPage = () => {
  let cardColor = useColorModeValue("white", "gray.700");
  let borderColor = useColorModeValue("transparent", "gray.600");

  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [allCustomer, setAllCustomer] = useState<any[]>([]);
  const [showCustomer, setShowCustomer] = useState<any[]>([]);
  const [pageList, setPageList] = useState<number[]>([1]);

  const {
    isOpen: isOpenFilter,
    onOpen: onOpenFilter,
    onClose: onCloseFilter,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteAlert,
    onOpen: onOpenDeleteAlert,
    onClose: onCloseDeleteAlert,
  } = useDisclosure();

  const {
    isOpen: isOpenDetail,
    onOpen: onOpenDetail,
    onClose: onCloseDetail,
  } = useDisclosure();

  const cancelRef = useRef(null);

  const history = useHistory();

  useEffect(() => {
    getAllCustomer();
  }, []);

  const getAllCustomer = async () => {
    setIsLoading(true);
    const { data } = await CustomerApi.getWCCustomerList();
    console.log(data);
    if (data.status === 0) {
      let array:any[]=[];
      data.response.forEach((arrayItem:any[]) => {
        if (arrayItem.length > 0) {
          array.push(arrayItem)
        }
      })
      console.log(array);
      setAllCustomer(array);
      setShowCustomer(array[0]);
      let temp: number[] = [];
      let count: number = 0;
      for (let step = 1; step <= array.length; step++) {
        if (array[step - 1].length > 0) {
          count++;
        }
      }
      for (let step = 1; step <= count; step++) {
         temp.push(step)
       }
      setTotalPage(count);
      setPageList(temp);
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
    setIsLoading(false);
  };

  const {
    pages,
    pagesCount,
    offset,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
  } = usePagination({
    initialState: {
      pageSize: totalPage,
      currentPage: 1,
    },
  });
  useEffect(() => {
    setShowCustomer(allCustomer[currentPage - 1]);
  }, [currentPage]);
  // handlers
  const handlePageChange = (nextPage: number): void => {
    // -> request new data using the page number
    setCurrentPage(nextPage);
    console.log("request new data with ->", nextPage);
  };

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "100px" }}>
      {isLoading ? (
        <WholeScreenSpinner />
      ) : (
        <>
          <Heading as="h4" size="md" mt="10" mb="5">
            Customer
          </Heading>

          <Flex flexDirection={{ md: "row", base: "column" }}>
            {/* <Select
          onChange={handlePageSizeChange}
          w={{ base: "100%", lg: "40%", xl: "15%" }}
        >
          <option value="10">10 per page</option>
          <option value="25">25 per page</option>
          <option value="50">50 per page</option>
        </Select> */}

            <InputGroup
              mt={{ base: "3", sm: "0" }}
              width={{ base: "100%", lg: "40%", xl: "20%" }}
            >
              <InputLeftElement
                pointerEvents="none"
                children={<FiSearch color="gray.300" />}
              />
              <Input type="tel" placeholder="Search" />
            </InputGroup>

            <Box ml="auto" width={{ base: "100%", lg: "15%", xl: "20%" }}>
              <Menu>
                <MenuButton
                  width="100%"
                  mt={{ base: "3", sm: "0" }}
                  ml="auto"
                  leftIcon={<FiPlus />}
                  fontSize="16px"
                  bg="primary"
                  color="white"
                  _hover={{
                    bg: "blue.200",
                  }}
                  _active={{
                    bg: "blue.400",
                  }}
                  as={Button}
                >
                  Add Customer
                </MenuButton>
                <MenuList p="16px 8px">
                  <MenuItem onClick={() => history.push("/add-customer")}>
                    Add Customer
                  </MenuItem>
                  <MenuItem>Import Customer</MenuItem>
                  <MenuItem onClick={() => history.push("/customer-group")}>
                    Customer Group
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Flex>

          <Box
            mt="5"
            borderRadius="20px"
            p="1.5rem"
            bg={cardColor}
            boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
            border="1px"
            borderColor={borderColor}
            overflow="auto"
          >
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Mobile</Th>
                  <Th>Email</Th>
                  <Th>Address</Th>
                  <Th>Create Time</Th>
                  <Th>Role</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {isEmpty && (
                  <Tr>
                    <Td colSpan={8}>
                      <VStack justifyContent="center">
                        <Img src="box.svg" boxSize="50px" />
                        <Text>No Data</Text>
                      </VStack>
                    </Td>
                  </Tr>
                )}
                {!isEmpty &&
                  showCustomer.map((customer) => (
                    <Tr key={customer.id}>
                      <Td>{customer.id}</Td>
                      <Td>
                        <Flex alignItems="center">
                          <Avatar src={customer.avatar_url} mr="5" />
                          {customer.first_name + customer.last_name}
                        </Flex>
                      </Td>
                      <Td>{customer.billing.phone}</Td>
                      <Td>{customer.email}</Td>
                      <Td>{`${customer.billing.city} - ${customer.billing.country}`}</Td>

                      <Td>{customer.date_created}</Td>
                      <Td>{customer.role}</Td>
                      <Td>
                        <HStack>
                          <IconButton
                            colorScheme="blue"
                            aria-label="Search database"
                            icon={<FiEdit3 />}
                          />
                          <IconButton
                            colorScheme="red"
                            aria-label="Search database"
                            icon={<FiTrash2 />}
                            onClick={onOpenDeleteAlert}
                          />
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </Box>

          {/* Pagination */}
          <Pagination
            pagesCount={pagesCount}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          >
            <PaginationContainer align="center" p={4} w="full">
              <PaginationPrevious
                mr={5}
                w="40px"
                h="40px"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage + 1)}
                aria-label="Back"
              >
                <Icon
                  as={FiChevronLeft}
                  color="gray.600"
                  fontSize="20px"
                  ms={{ base: "12px", xl: "0px" }}
                  me="6px"
                />
              </PaginationPrevious>

              <PaginationPageGroup
                isInline
                align="center"
                separator={
                  <PaginationSeparator
                    onClick={() => console.log("Seperator")}
                    bg="gray.300"
                    fontSize="sm"
                    w={7}
                    jumpSize={11}
                  />
                }
              >
                {pageList.map((page: number) => (
                  <PaginationPage
                    width="40px"
                    h="40px"
                    bg="gray.200"
                    color="gray.600"
                    key={`pagination_page_${page}`}
                    page={page}
                    onClick={() => console.log("Page Number")}
                    fontSize="sm"
                    _current={{
                      bg: "primary",
                      color: "white",
                      fontSize: "sm",
                      w: "40px",
                    }}
                    _hover={{
                      bg: "blue.200",
                    }}
                  />
                ))}
              </PaginationPageGroup>

              <PaginationNext
                ml={5}
                w="40px"
                h="40px"
                disabled={currentPage === totalPage}
                onClick={() => handlePageChange(currentPage - 1)}
                aria-label="Next"
              >
                <Icon
                  as={FiChevronRight}
                  color="gray.600"
                  fontSize="20px"
                  ms={{ base: "12px", xl: "0px" }}
                  me="6px"
                />
              </PaginationNext>
            </PaginationContainer>
          </Pagination>

          {/* <Filter isOpen={ isOpenFilter } onClose={ onCloseFilter } /> */}

          <DeleteDialog
            title="Delete Customer?"
            description="Are you sure you want to delete this customer?"
            isOpen={isOpenDeleteAlert}
            onClose={onCloseDeleteAlert}
            cancelRef={cancelRef}
          />

          {/* CUSTOMER DETAILS */}
          <Modal
            isCentered
            onClose={onCloseDetail}
            isOpen={isOpenDetail}
            motionPreset="slideInBottom"
            size="xl"
            scrollBehavior="inside"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Johnny</ModalHeader>

              <ModalCloseButton />

              <ModalBody>
                <SimpleGrid spacingY={2}>
                  <Box
                    mb="2"
                    border="1px"
                    borderColor={borderColor}
                    bg={cardColor}
                    borderRadius="20px"
                    p="1.5rem"
                    boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.05)"
                  >
                    <Flex>
                      <Avatar
                        src="https://bit.ly/broken-link"
                        alignSelf="center"
                        mr="5"
                        w="60px"
                        h="60px"
                      />
                      <Flex flexDirection="column">
                        <Text fontWeight="bold">
                          Johnny
                          <Badge ml="1">Customer Group</Badge>
                        </Text>
                        <Text fontSize="sm">johnny@gmail.com</Text>
                        <Text fontSize="sm">0123456789</Text>
                      </Flex>

                      <Icon
                        as={FaWhatsapp}
                        cursor="pointer"
                        boxSize="1.5em"
                        color="#25D366"
                        mr="2"
                        ml="auto"
                      />
                      <Icon
                        as={FaFacebook}
                        cursor="pointer"
                        boxSize="1.5em"
                        color="#3B5998"
                        mr="2"
                      />
                      <Icon
                        as={FaInstagram}
                        cursor="pointer"
                        boxSize="1.5em"
                        color="#8a3ab9"
                        mr="2"
                      />
                    </Flex>
                  </Box>

                  {/* <Heading as="h4" size="sm">Basic Information</Heading>
                    <Flex>
                        <Icon as={ FaWhatsapp } boxSize="1.25em" color="#25D366" mr="2" />
                        <Text fontSize="sm">https://wa.me/0123456789</Text>
                    </Flex>

                    <Flex>
                        <Icon as={ FaFacebook } boxSize="1.25em" color="#3B5998" mr="2" />
                        <Text fontSize="sm">https://facebook.com/johnny</Text>
                    </Flex>
 
                    <Flex>
                        <Icon as={ FaInstagram } boxSize="1.25em" color="#8a3ab9" mr="2" />
                        <Text fontSize="sm">https://instagram.com/johnny</Text>
                    </Flex>

                    <Divider my="5" /> */}

                  <Heading as="h4" size="sm">
                    Address
                  </Heading>

                  <HStack mt="5">
                    <Heading as="h6" size="xs">
                      Address 1
                    </Heading>
                    <Badge variant="solid" colorScheme="teal">
                      Main
                    </Badge>
                  </HStack>

                  <Text fontSize="sm">Johnny +60123456789</Text>
                  <Text fontSize="sm">
                    12, Jalan ABC, Taman DEF Skudai, Johor
                  </Text>

                  <HStack mt="5">
                    <Heading as="h6" size="xs">
                      Address 2
                    </Heading>
                  </HStack>

                  <Text fontSize="sm">Johnny +60123456789</Text>
                  <Text fontSize="sm">
                    12, Jalan ABC, Taman DEF Skudai, Johor
                  </Text>
                  <Divider my="5" />

                  <Heading as="h5" size="sm">
                    Notes
                  </Heading>
                  <Text fontSize="sm">Lorem Ipsum</Text>
                </SimpleGrid>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" onClick={onCloseDetail}>
                  Close
                </Button>
                {/* <Button variant="ghost">Secondary Action</Button> */}
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </Flex>
  );
};

export default CustomerPage;
