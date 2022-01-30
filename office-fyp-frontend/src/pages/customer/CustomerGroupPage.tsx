import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Text, Flex, Heading, Select, InputGroup, InputLeftElement, Input, Box, Table, Thead, Tr, Th, Tbody, Td, VStack, Img, IconButton, useColorModeValue, useDisclosure, HStack, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, FormControl, FormLabel } from '@chakra-ui/react'
import React, { ChangeEvent, useRef, useState } from 'react'
import { FiEdit3, FiPlus, FiSearch, FiTrash2 } from 'react-icons/fi'
import {
    Pagination,
    usePagination,
    PaginationPage,
    PaginationNext,
    PaginationPrevious,
    PaginationPageGroup,
    PaginationContainer,
    PaginationSeparator
} from "@ajna/pagination";
import DeleteDialog from 'components/Dialog/DeleteDialog';
import { useHistory } from 'react-router-dom';
import { register } from 'serviceWorker';

const CustomerGroupPage = () => {

    let cardColor = useColorModeValue("white", "gray.700");
    let borderColor = useColorModeValue("transparent", "gray.600");

    const [isEmpty, setIsEmpty] = useState<Boolean>(false);

    const { 
        isOpen: isOpenAddGroupModal,
        onOpen: onOpenAddGroupModal, 
        onClose: onCloseAddGroupModal, 
    } = useDisclosure()

    const { 
        isOpen: isOpenDeleteAlert,
        onOpen: onOpenDeleteAlert, 
        onClose: onCloseDeleteAlert, 
    } = useDisclosure()

    const cancelRef = useRef(null)
    
    const history = useHistory();

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
        setPageSize
    } = usePagination({
        total: 5,
        limits: {
            outer: outerLimit,
            inner: innerLimit
        },
        initialState: {
            pageSize: 5,
            isDisabled: false,
            currentPage: 1
        }
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
                Customer Group
            </Heading>

            <Flex flexDirection={{ md: "row", base: "column" }}>
                <Select onChange={handlePageSizeChange} w={{ base: "100%", lg: "40%", xl: "15%" }}>
                    <option value="10">10 per page</option>
                    <option value="25">25 per page</option>
                    <option value="50">50 per page</option>
                </Select>
                
                <InputGroup mt={{ base: "3", sm: "0" }} ml={{ base: "0", md: "5" }} width={{ base: "100%", lg: "40%", xl: "20%" }}>
                    <InputLeftElement
                    pointerEvents="none"
                    children={<FiSearch color="gray.300" />}
                    />
                    <Input type="tel" placeholder="Search" />
                </InputGroup>

                <Button
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
                    onClick={ onOpenAddGroupModal }
                >
                    Add Customer Group
                </Button>
            </Flex>

            <Box
                mt="5"
                borderRadius="20px"
                p="1.5rem"
                bg={ cardColor }
                boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
                border="1px"
                borderColor={ borderColor }
                overflow="auto"
            >
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Group Name</Th>
                            <Th>Customer Quantity</Th>
                            <Th>Creator</Th>
                            <Th>Create Time</Th>
                            <Th>Update Time</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            isEmpty ?

                                <Tr>
                                    <Td colSpan={11}>
                                        <VStack justifyContent="center">
                                            <Img src="box.svg" boxSize="50px" />
                                            <Text>No Data</Text>
                                        </VStack>
                                    </Td>
                                </Tr>

                            :
                                <Tr>
                                    <Td>Demo Group</Td>
                                    <Td>3</Td>
                                    <Td>Johnny</Td>
                                    <Td>5 Oct 2021, 10:00am</Td>
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
                                                onClick={ onOpenDeleteAlert }
                                            />
                                        </HStack>
                                    </Td>
                                </Tr>
                        }
                        
                    </Tbody>
                </Table>
            </Box>

            {/* Pagination */}
            <Pagination
                pagesCount={pagesCount}
                currentPage={currentPage}
                isDisabled={isDisabled}
                onPageChange={handlePageChange}
            >
                <PaginationContainer
                    align="center"
                    p={4}
                    w="full"
                >
                    <PaginationPrevious
                        mr={5}
                        w="40px"
                        h="40px"
            
                        onClick={() =>
                            console.log(
                                "Previous"
                            )
                        }
                    >
                         <IconButton colorScheme="blue"
                            aria-label="Next"
                            _hover={{
                                bg: "primary",
                                color: "white"
                            }}
                            color="gray.600"
                            bg="gray.200"
                            fontSize="20px" 
                            icon={<ChevronLeftIcon />}>
                        </IconButton>
                    </PaginationPrevious>

                    <PaginationPageGroup
                        isInline
                        align="center"
                        separator={
                            <PaginationSeparator
                                onClick={() =>
                                    console.log(
                                    "Seperator"
                                    )
                                }
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
                                onClick={() =>
                                    console.log(
                                    "Page Number"
                                    )
                                }
                                fontSize="sm"
                                _current={{
                                    bg: "primary",
                                    color: "white",
                                    fontSize: "sm",
                                    w: "40px"
                                }}
                            />
                        ))}
                    </PaginationPageGroup>

                    <PaginationNext
                        ml={5}
                        w="40px"
                        h="40px"
                        
                        onClick={() =>
                            console.log(
                            "Next"
                            )
                        }
                        >
                            <IconButton colorScheme="blue"
                                aria-label="Next"
                                _hover={{
                                    bg: "primary",
                                    color: "white"
                                }}
                                color="gray.600"
                                bg="gray.200"
                                fontSize="20px" 
                                icon={<ChevronRightIcon />}>
                            </IconButton>
                    </PaginationNext>  
                </PaginationContainer>
            </Pagination>

            <DeleteDialog
                title="Delete Customer Group?"
                description="Are you sure you want to delete this customer group?"
                isOpen={ isOpenDeleteAlert }
                onClose={ onCloseDeleteAlert }
                cancelRef={ cancelRef }
            />

            <Modal
                isOpen={isOpenAddGroupModal}
                size="xl"
                onClose={onCloseAddGroupModal}
                isCentered
                motionPreset="slideInBottom"
            >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Add Customer Group</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form>
                        <FormControl>
                            <FormLabel mt="10px" ms="4px" fontSize="sm" fontWeight="normal">
                                Customer Group Name
                            </FormLabel>
                            <Input
                                id="username"
                                borderRadius="15px"
                                fontSize="sm"
                                my="5px"
                                type="text"
                                placeholder="Customer Group Name"
                                size="lg"
                            />
                        </FormControl>
                    </form>
                </ModalBody>

                <ModalFooter>
                    <Button 
                        variant="ghost" 
                        onClick={onCloseAddGroupModal}
                        h="45"
                        mb="20px"
                        mt="20px"
                        fontSize="16px"
                    >
                        Cancel
                    </Button>
                    <Button
                        fontSize="16px"
                        type="submit"
                        bg="primary"
                        h="45"
                        mb="20px"
                        color="white"
                        mt="20px"
                        _hover={{
                        bg: "blue.200",
                        }}
                        _active={{
                        bg: "blue.400",
                        }}
                        mr={3}>
                        Submit
                    </Button>    
                </ModalFooter>
                </ModalContent>
            </Modal>

        </Flex>
    )
}

export default CustomerGroupPage
