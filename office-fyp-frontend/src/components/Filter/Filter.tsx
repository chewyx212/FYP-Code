import { Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from '@chakra-ui/accordion';
import { Button } from '@chakra-ui/button';
import { CheckboxGroup, Checkbox } from '@chakra-ui/checkbox';
import { Input } from '@chakra-ui/input';
import { Box, Flex, HStack } from '@chakra-ui/layout';
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import React from 'react'
import { FiMinus } from 'react-icons/fi';

type Props = {
    isOpen: boolean,
    onClose: () => void,
}

const Filter = ({ isOpen, onClose }: Props) => {

    const {
        isOpen: isOpenFilter,
        onOpen: onOpenFilter,
        onClose: onCloseFilter,
    } = useDisclosure();
    
    return (
        <>
            {/* FILTER Modal */}
            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset="slideInBottom"
                size="xl"
                scrollBehavior="inside"
            >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Filter Order</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Accordion allowToggle>
                        <AccordionItem py="1">
                            <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    Store Name
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            </h2>
                            <AccordionPanel py={4}>
                                <Input
                                    type="search"
                                    borderRadius="15px"
                                    fontSize="sm"
                                    size="lg"
                                    placeholder="Store Name"
                                />
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem py="1">
                            <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    Courier
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            </h2>
                            <AccordionPanel py={4}>
                                <Input
                                    type="search"
                                    borderRadius="15px"
                                    fontSize="sm"
                                    size="lg"
                                    placeholder="Courier"
                                />
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem py="1">
                            <h2>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                        Amount
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel py={4}>
                                <Flex alignItems="center">
                                    <Input
                                        type="number"
                                        borderRadius="15px"
                                        fontSize="sm"
                                        size="lg"
                                        placeholder="Min Total"
                                    />

                                    <FiMinus size="50px" color="grey" />

                                    <Input
                                        type="number"
                                        borderRadius="15px"
                                        fontSize="sm"
                                        size="lg"
                                        placeholder="Max Total"
                                    />
                                </Flex>
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem py="1">
                            <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    Payment
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            </h2>
                            <AccordionPanel py={4}>
                                <CheckboxGroup colorScheme="telegram" defaultValue={["prepaid", "cod"]}>
                                    <HStack spacing={10}>
                                        <Checkbox value="prepaid">Prepaid</Checkbox>
                                        <Checkbox value="cod">COD</Checkbox>
                                    </HStack>
                                </CheckboxGroup>
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem py="1">
                            <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    Order Type
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            </h2>
                            <AccordionPanel py={4}>
                                <CheckboxGroup colorScheme="telegram" defaultValue={["preorder", "normal"]}>
                                    <HStack spacing={10}>
                                        <Checkbox value="preorder">Preorder</Checkbox>
                                        <Checkbox value="normal">Normal</Checkbox>
                                    </HStack>
                                </CheckboxGroup>
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem py="1">
                            <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    Label Status
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            </h2>
                            <AccordionPanel py={4}>
                                <CheckboxGroup colorScheme="telegram" defaultValue={["printed", "notPrinted"]}>
                                    <HStack spacing={10}>
                                        <Checkbox value="printed">Label Printed</Checkbox>
                                        <Checkbox value="notPrinted">Label Not Printed</Checkbox>
                                    </HStack>
                                </CheckboxGroup>
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem py="1">
                            <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    Invoice Status
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            </h2>
                            <AccordionPanel py={4}>
                                <CheckboxGroup colorScheme="telegram" defaultValue={["printed", "notPrinted"]}>
                                    <HStack spacing={10}>
                                        <Checkbox value="printed">Invoice Printed</Checkbox>
                                        <Checkbox value="notPrinted">Invoice Not Printed</Checkbox>
                                    </HStack>
                                </CheckboxGroup>
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem py="1">
                            <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    Packing List Status
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            </h2>
                            <AccordionPanel py={4}>
                                <CheckboxGroup colorScheme="telegram" defaultValue={["printed", "notPrinted"]}>
                                    <HStack spacing={10}>
                                        <Checkbox value="printed">Package List Printed</Checkbox>
                                        <Checkbox value="notPrinted">Package List Not Printed</Checkbox>
                                    </HStack>
                                </CheckboxGroup>
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem py="1">
                            <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    Picking List Status
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            </h2>
                            <AccordionPanel py={4}>
                                <CheckboxGroup colorScheme="telegram" defaultValue={["printed", "notPrinted"]}>
                                    <HStack spacing={10}>
                                        <Checkbox value="printed">Picking List Printed</Checkbox>
                                        <Checkbox value="notPrinted">Picking List Not Printed</Checkbox>
                                    </HStack>
                                </CheckboxGroup>
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem py="1">
                            <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    Picking Status
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            </h2>
                            <AccordionPanel py={4}>
                                <CheckboxGroup colorScheme="telegram" defaultValue={["picked", "unpicked"]}>
                                    <HStack spacing={10}>
                                        <Checkbox value="picked">Picked</Checkbox>
                                        <Checkbox value="unpicked">Unpicked</Checkbox>
                                    </HStack>
                                </CheckboxGroup>
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem py="1">
                            <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    Create Date
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            </h2>
                            <AccordionPanel py={4}>
                                <Flex alignItems="center">
                                    <Input
                                        type="date"
                                        borderRadius="15px"
                                        fontSize="sm"
                                        size="lg"
                                        value="2018-07-22"
                                    />

                                    <FiMinus size="50px" color="grey" />

                                    <Input
                                        type="date"
                                        borderRadius="15px"
                                        fontSize="sm"
                                        size="lg"
                                        value="2018-07-22"
                                    />
                                </Flex>
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem py="1">
                            <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    Ship Before
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            </h2>
                            <AccordionPanel py={4}>
                                <Flex alignItems="center">
                                    <Input
                                        type="date"
                                        borderRadius="15px"
                                        fontSize="sm"
                                        size="lg"
                                        value="2018-07-22"
                                    />

                                    <FiMinus size="50px" color="grey" />

                                    <Input
                                        type="date"
                                        borderRadius="15px"
                                        fontSize="sm"
                                        size="lg"
                                        value="2018-07-22"
                                    />
                                </Flex>
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem py="1">
                            <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    Package Type
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            </h2>
                            <AccordionPanel py={4}>
                                <Input
                                    type="search"
                                    borderRadius="15px"
                                    fontSize="sm"
                                    size="lg"
                                    placeholder="Package Type"
                                />
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem py="1">
                            <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    Buyer Note
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            </h2>
                            <AccordionPanel py={4}>
                                <CheckboxGroup colorScheme="telegram" defaultValue={["hasNotes", "noNotes"]}>
                                    <HStack spacing={10}>
                                        <Checkbox value="hasNotes">Has Notes</Checkbox>
                                        <Checkbox value="noNotes">No Noted</Checkbox>
                                    </HStack>
                                </CheckboxGroup>
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem py="1">
                            <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    Seller Note
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            </h2>
                            <AccordionPanel py={4}>
                                <CheckboxGroup colorScheme="telegram" defaultValue={["hasNotes", "noNotes"]}>
                                    <HStack spacing={10}>
                                        <Checkbox value="hasNotes">Has Notes</Checkbox>
                                        <Checkbox value="noNotes">No Noted</Checkbox>
                                    </HStack>
                                </CheckboxGroup>
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem py="1">
                            <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    Picking Note
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            </h2>
                            <AccordionPanel py={4}>
                                <CheckboxGroup colorScheme="telegram" defaultValue={["hasNotes", "noNotes"]}>
                                    <HStack spacing={10}>
                                        <Checkbox value="hasNotes">Has Notes</Checkbox>
                                        <Checkbox value="noNotes">No Noted</Checkbox>
                                    </HStack>
                                </CheckboxGroup>
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem py="1">
                            <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    Paid Time
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            </h2>
                            <AccordionPanel py={4}>
                                <Flex alignItems="center">
                                    <Input
                                        type="date"
                                        borderRadius="15px"
                                        fontSize="sm"
                                        size="lg"
                                        value="2018-07-22"
                                    />

                                    <FiMinus size="50px" color="grey" />

                                    <Input
                                        type="date"
                                        borderRadius="15px"
                                        fontSize="sm"
                                        size="lg"
                                        value="2018-07-22"
                                    />
                                </Flex>
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem py="1">
                            <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    Package Status
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            </h2>
                            <AccordionPanel py={4}>
                                <CheckboxGroup colorScheme="telegram" defaultValue={["packed", "unpacked"]}>
                                    <HStack spacing={10}>
                                        <Checkbox value="packed">Packed</Checkbox>
                                        <Checkbox value="unpacked">Unpacked</Checkbox>
                                    </HStack>
                                </CheckboxGroup>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        variant="ghost" 
                        onClick={onClose}
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
                        Search
                    </Button>               
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}

export default Filter
