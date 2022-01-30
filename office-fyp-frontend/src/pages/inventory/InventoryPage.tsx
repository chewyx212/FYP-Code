import {
  Select,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Img,
  Input,
  InputGroup,
  InputLeftElement,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { ChangeEvent, useRef, useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiTrash2,
  FiEdit3,
} from "react-icons/fi";
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

// https://www.npmjs.com/package/@ajna/pagination

import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

const InventoryPage = () => {
  let cardColor = useColorModeValue("white", "gray.700");
  let borderColor = useColorModeValue("transparent", "gray.600");

  const tabs = [
    {
      id: 1,
      label: "All",
      number: 10,
    },
    {
      id: 2,
      label: "Sold Out",
      number: 4,
    },
    {
      id: 3,
      label: "Stock Warning",
      number: 6,
    },
    {
      id: 4,
      label: "Have Order, No Stock",
      number: 6,
    },
  ];

  const {
    isOpen: isOpenDeleteAlert,
    onOpen: onOpenDeleteAlert,
    onClose: onCloseDeleteAlert,
  } = useDisclosure();

  const {
    isOpen: isOpenFilter,
    onOpen: onOpenFilter,
    onClose: onCloseFilter,
  } = useDisclosure();

  const cancelRef = useRef(null);

  const [selectedTab, setSelectedTab] = useState<Number>(1);

  const [isEmpty, setIsEmpty] = useState<Boolean>(true);

  // constants
  const outerLimit = 1;
  const innerLimit = 2;

  const {
    pages,
    pagesCount,
    offset,
    currentPage,
    setCurrentPage,
    setIsDisabled,
    isDisabled,
    pageSize,
    setPageSize,
  } = usePagination({
    total: 5,
    limits: {
      outer: outerLimit,
      inner: innerLimit,
    },
    initialState: {
      pageSize: 5,
      isDisabled: false,
      currentPage: 1,
    },
  });

  // handlers
  const handlePageChange = (nextPage: number): void => {
    // -> request new data using the page number
    setCurrentPage(nextPage);
    console.log("request new data with ->", nextPage);
  };

  const handlePageSizeChange = (
    event: ChangeEvent<HTMLSelectElement>
  ): void => {
    const pageSize = Number(event.target.value);

    setPageSize(pageSize);
  };

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "100px" }}>
      <Heading as="h4" size="md" mt="10" mb="5">
        Pending Order
      </Heading>

      <Flex flexDirection={{ md: "row", base: "column" }}>
        <Select
          onChange={handlePageSizeChange}
          w={{ base: "100%", lg: "40%", xl: "15%" }}
        >
          <option value="10">10 per page</option>
          <option value="25">25 per page</option>
          <option value="50">50 per page</option>
        </Select>

        <InputGroup
          mt={{ base: "3", sm: "0" }}
          ml={{ base: "0", md: "5" }}
          width={{ base: "100%", lg: "40%", xl: "20%" }}
        >
          <InputLeftElement
            pointerEvents="none"
            children={<FiSearch color="gray.300" />}
          />
          <Input type="tel" placeholder="Search" />
        </InputGroup>

        <Button
          w={{ base: "100%", lg: "30%", xl: "15%" }}
          leftIcon={<FiFilter />}
          mt={{ base: "3", sm: "0" }}
          ml={{ base: "0", md: "5" }}
          fontSize="16px"
          bg="primary"
          color="white"
          _hover={{
            bg: "blue.200",
          }}
          _active={{
            bg: "blue.400",
          }}
          onClick={onOpenFilter}
        >
          Filters
        </Button>
      </Flex>

      <Box
        mt="5"
        borderRadius="20px"
        p="1.5rem"
        bg={cardColor}
        boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
        border="1px"
        borderColor={borderColor}
      >
        <Tabs>
          <TabList>
            {tabs.map((tab, index) => {
              return (
                <Tab onClick={() => setSelectedTab(tab.id)} key={index}>
                  {tab.label}
                  <Badge
                    fontSize="sm"
                    ml="5px"
                    borderRadius="20px"
                    px="2"
                    bg={selectedTab === tab.id ? "primary" : "gray.100"}
                    color={selectedTab === tab.id ? "white" : "gray.600"}
                  >
                    {tab.number}
                  </Badge>
                </Tab>
              );
            })}
          </TabList>
          <TabPanels>
            <TabPanel overflowX="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Item</Th>
                    <Th>Average Purchase Price</Th>
                    <Th>Warehouse Name</Th>
                    <Th>Warehouse</Th>
                    <Th>Spare</Th>
                    <Th>Locked</Th>
                    <Th>Promotion</Th>
                    <Th>Available</Th>
                    <Th>Store Update Result</Th>
                    <Th>Time</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <Flex alignItems="center">
                        <Img src="" boxSize="60px" mr="5" />
                        Demo Item
                      </Flex>
                    </Td>
                    <Td>RM 2.00</Td>
                    <Td>Demo Warehouse</Td>
                    <Td>23</Td>
                    <Td>2</Td>
                    <Td>3</Td>
                    <Td>2</Td>
                    <Td>3</Td>
                    <Td>No Change</Td>
                    <Td>5 Oct 2021, 10:00am</Td>
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
                </Tbody>
              </Table>
            </TabPanel>

            <TabPanel overflow="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Item</Th>
                    <Th>Average Purchase Price</Th>
                    <Th>Warehouse Name</Th>
                    <Th>Warehouse</Th>
                    <Th>Spare</Th>
                    <Th>Locked</Th>
                    <Th>Promotion</Th>
                    <Th>Available</Th>
                    <Th>Store Update Result</Th>
                    <Th>Time</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {isEmpty ? (
                    <Tr>
                      <Td colSpan={11}>
                        <VStack justifyContent="center">
                          <Img src="box.svg" boxSize="50px" />
                          <Text>No Data</Text>
                        </VStack>
                      </Td>
                    </Tr>
                  ) : (
                    <Tr>
                      <Td>
                        <Flex alignItems="center">
                          <Img src="" boxSize="60px" mr="5" />
                          Demo Item
                        </Flex>
                      </Td>
                      <Td>RM 2.00</Td>
                      <Td>Demo Warehouse</Td>
                      <Td>23</Td>
                      <Td>2</Td>
                      <Td>3</Td>
                      <Td>2</Td>
                      <Td>3</Td>
                      <Td>No Change</Td>
                      <Td>5 Oct 2021, 10:00am</Td>
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
                  )}
                </Tbody>
              </Table>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      {/* Pagination */}
      <Pagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        isDisabled={isDisabled}
        onPageChange={handlePageChange}
      >
        <PaginationContainer align="center" p={4} w="full">
          <PaginationPrevious
            mr={5}
            w="40px"
            h="40px"
            onClick={() => console.log("Previous")}
          >
            <IconButton
              colorScheme="blue"
              aria-label="Next"
              _hover={{
                bg: "primary",
                color: "white",
              }}
              color="gray.600"
              bg="gray.200"
              fontSize="20px"
              icon={<ChevronLeftIcon />}
            ></IconButton>
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
            {pages.map((page: number) => (
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
              />
            ))}
          </PaginationPageGroup>

          <PaginationNext
            ml={5}
            w="40px"
            h="40px"
            onClick={() => console.log("Next")}
          >
            <IconButton
              colorScheme="blue"
              aria-label="Next"
              _hover={{
                bg: "primary",
                color: "white",
              }}
              color="gray.600"
              bg="gray.200"
              fontSize="20px"
              icon={<ChevronRightIcon />}
            ></IconButton>
          </PaginationNext>
        </PaginationContainer>
      </Pagination>
    </Flex>
  );
};

export default InventoryPage;
