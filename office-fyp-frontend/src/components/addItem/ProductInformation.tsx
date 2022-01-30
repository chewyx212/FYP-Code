import { InfoOutlineIcon } from '@chakra-ui/icons';
import { Stack, Text, useColorModeValue, Box, Heading, Divider, FormControl, FormLabel, HStack, Input, Table, Thead, Tr, Th, Flex, Tooltip, Tbody, Td, InputGroup, InputLeftAddon, Select, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, IconButton, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, VStack, Switch, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { FiEdit3, FiPlus, FiTrash2 } from 'react-icons/fi';

const ProductInformation = () => {

    let cardColor = useColorModeValue("white", "gray.700");
    let borderColor = useColorModeValue("transparent", "gray.600");
    let dividerColor = useColorModeValue("gray.200", "gray.600");
    let sectionColor = useColorModeValue("gray.50", "gray.800");

    const [isVariationChecked, setIsVariationChecked] = useState<boolean>(false);

    const { 
        isOpen: isOpenEditStock, 
        onOpen: onOpenEditStock, 
        onClose: onCloseEditStock, 
    } = useDisclosure();

    const { register, control, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            variation: [
                { 
                  type: "", 
                  option: [],
                }
            ]
        }
    });

    const {
        fields,
        append,
        prepend,
        remove,
        swap,
        move,
        insert,
        replace
    } = useFieldArray({
        control,
        name: "variation"
    });
    
    return (
        <>
            <Box border="1px" borderColor={ borderColor } width="100%" borderRadius="15px" p="1.5rem" bg={ cardColor } boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)">
                <Heading as="h4" size="md">Product Information</Heading>
                <Divider my="1.5rem" borderColor={ dividerColor } />

                <FormControl display="flex" alignItems="center" mb="10">
                    <FormLabel htmlFor="variation" mb="0">
                        Has Variation
                    </FormLabel>
                    <Switch id="variation" isChecked={ isVariationChecked } onChange={ () => {setIsVariationChecked(!isVariationChecked); console.log(isVariationChecked)} } />
                </FormControl>

                {
                    isVariationChecked && (
                        fields.map((item: any, index) => {
                            return(
                                <Stack direction={{ base: "column", sm: "row" }} mb="10" key={ item.id }>
                                    <Box w="100%">
                                        <FormLabel>Variation Type</FormLabel>
                                        <Input 
                                            borderRadius="15px"
                                            fontSize="sm"
                                            type="text"
                                            size="lg"
                                            placeholder="E.g. color, etc." 
                                        />
                                    </Box>
                                    <Box w="100%">
                                        <FormLabel>Option</FormLabel>
                                        <Controller
                                            render={ ({ field }) => 
                                                <Input borderRadius="15px"
                                                    fontSize="sm"
                                                    type="text"
                                                    size="lg"
                                                    placeholder="E.g. red, etc."  {...field} 
                                            />}
                                            name={ `variation.${index}.option` }
                                            control={ control }
                                        />
                                    </Box>
                                    <Box alignSelf={{ sm: "end" }}>
                                        <IconButton
                                            size="lg"
                                            colorScheme="red"
                                            aria-label="Remove Index"
                                            icon={<FiTrash2 />}
                                            onClick={ () => remove(index) }
                                        />
                                    </Box>
                                </Stack>
                            )
                        })
                    )
                }

                {
                    isVariationChecked && fields.length < 2 && (
                        <Button
                            fontSize="16px"
                            type="submit"
                            // bg="primary"
                            // w="100%"
                            h="45"
                            color="primary"
                            _hover={{
                                // bg: "blue.200",
                                color: "blue.200"
                            }}
                            _active={{
                                color: "blue.400",
                            }}
                            onClick={() => {
                                append({ type: "", option: [] });
                            }}
                            variant="ghost"
                            leftIcon={<FiPlus />}
                        >Add Variation</Button>
                    )
                }
                
                <Divider my="1.5rem" />
                <Box overflow="auto">
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Variation</Th>
                                <Th>Default Price</Th>
                                <Th isNumeric>
                                    <Flex>
                                        Available Stock 
                                        <Tooltip hasArrow label="The stock that can be sold in Channel, Available Stock = Warehouse Stock - Spare Stock - Locked Stock - Promotion Stock" placement="top">
                                            <InfoOutlineIcon cursor="pointer" ml="2" fontSize="md" />
                                        </Tooltip>
                                    </Flex>
                                </Th>
                                <Th>Master SKU</Th>
                            </Tr>
                        </Thead>
                        <Tbody>  
                            <Tr>
                                <Td>-</Td>
                                <Td>
                                    <InputGroup size="lg" >
                                        <InputLeftAddon
                                            borderRadius="15px"
                                        >
                                            <Select 
                                                borderRadius="15px"
                                                fontSize="sm" 
                                                border="none" 
                                                _focus={{ bg: "none" }}
                                            >
                                                <option>RM</option>
                                            </Select>
                                        </InputLeftAddon>
                                        <NumberInput defaultValue={15} min={1}>
                                            <NumberInputField
                                                fontSize="sm"
                                                borderRadius="0px 15px 15px 0px"
                                            />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </InputGroup>
                                </Td>
                                <Td>
                                    5
                                    <IconButton
                                        ml="3"
                                        colorScheme="blue"
                                        aria-label="Search database"
                                        icon={<FiEdit3 />}
                                        onClick={ onOpenEditStock }
                                    />
                                </Td>
                                <Td>
                                    <Input
                                        borderRadius="15px"
                                        fontSize="sm"
                                        type="text"
                                        size="lg"
                                        
                                        placeholder="Enter Master SKU" 
                                    />
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </Box>
            </Box>

            <Modal
                isCentered
                onClose={onCloseEditStock}
                isOpen={isOpenEditStock}
                motionPreset="slideInBottom"
                scrollBehavior="inside"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Available Stock</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <Box mb="5">
                            <FormLabel>Warehouse Name</FormLabel>
                            <Select 
                                borderRadius="15px"
                                fontSize="sm"
                                size="lg"
                                
                            >
                                <option>Demo Warehouse</option>
                            </Select>
                        </Box>

                        <Box mb="5">
                            <Flex>
                                <FormLabel>Warehouse Stock </FormLabel>
                                <Tooltip hasArrow label="The stock that can be sold in Channel, Available Stock = Warehouse Stock - Spare Stock - Locked Stock - Promotion Stock" placement="top">
                                    <InfoOutlineIcon cursor="pointer" ml="2" fontSize="md" />
                                </Tooltip>
                            </Flex>
                            
                            <NumberInput size="lg"  defaultValue={15} min={1}>
                                <NumberInputField
                                    fontSize="sm"
                                    borderRadius="15px"
                                />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </Box>

                        <Box mb="5">
                            <FormLabel>Unit Purchase Price</FormLabel>
                            <InputGroup size="lg" >                 
                                <InputLeftAddon borderRadius="15px">
                                    <Select border="none" _focus={{ bg: "none" }}>
                                        <option>RM</option>
                                    </Select>
                                </InputLeftAddon>
                                <Input
                                    borderRadius="15px"
                                    fontSize="sm"
                                    type="number"
                                    size="lg"
                                    placeholder="0" 
                                />
                                {/* <NumberInput defaultValue={15} min={1}>
                                    <NumberInputField
                                        fontSize="sm"
                                        borderRadius="0px 15px 15px 0px"
                                    />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput> */}
                            </InputGroup>
                        </Box>

                        <Box p="5" bg={ sectionColor } borderRadius="20px">
                            <SimpleGrid columns={2} spacing={3}>
                                <VStack>
                                    <Flex>
                                        <Text>Spare Stock</Text>
                                        <Tooltip hasArrow label="The total amount of stock reserved in the actual warehouse, which will not be sold in the channel." placement="top">
                                            <InfoOutlineIcon cursor="pointer" ml="2" fontSize="md" />
                                        </Tooltip>  
                                    </Flex>
                                    <Text fontWeight="bold" fontSize="xl">1</Text>
                                </VStack>

                                <VStack>
                                    <Flex>
                                        <Text>Locked Stock</Text>
                                        <Tooltip hasArrow label="Stock is waiting to be fulfilled but not shipped yet, New Paid or New Unpaid order synced to CRM System will add to Locked Stock." placement="top">
                                            <InfoOutlineIcon cursor="pointer" ml="2" fontSize="md" />
                                        </Tooltip>  
                                    </Flex>
                                    <Text fontWeight="bold" fontSize="xl">1</Text>
                                </VStack>

                                <VStack>
                                    <Flex>
                                        <Text>Promotion Stock</Text>
                                        <Tooltip hasArrow label="Total stock reserved for Campaign or Flash Sale promotions." placement="top">
                                            <InfoOutlineIcon cursor="pointer" ml="2" fontSize="md" />
                                        </Tooltip>  
                                    </Flex>
                                    <Text fontWeight="bold" fontSize="xl">1</Text>
                                </VStack>

                                <VStack>
                                    <Flex>
                                        <Text>Available Stock</Text>
                                        <Tooltip hasArrow label="The stock that can be sold in Channel, Available Stock = Warehouse Stock - Spare Stock - Locked Stock - Promotion Stock" placement="top">
                                            <InfoOutlineIcon cursor="pointer" ml="2" fontSize="md" />
                                        </Tooltip>  
                                    </Flex>
                                    <Text fontWeight="bold" fontSize="xl">1</Text>
                                </VStack>
                            </SimpleGrid>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" onClick={onCloseEditStock}>Cancel</Button>
                        <Button  
                            fontSize="16px"
                            bg="primary"
                            h="45"
                            color="white"
                            _hover={{
                            bg: "blue.200",
                            }}
                            _active={{
                                bg: "blue.400",
                            }}>
                            Save
                        </Button>                 
                    </ModalFooter>

                </ModalContent>
            </Modal>
        </>
    )
}

export default ProductInformation
