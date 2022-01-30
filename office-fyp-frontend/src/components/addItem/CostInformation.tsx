import { FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightAddon, InputLeftAddon } from '@chakra-ui/input';
import { Box, Heading, Divider, SimpleGrid } from '@chakra-ui/layout';
import { useColorModeValue, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Select } from '@chakra-ui/react';
import React from 'react'

const CostInformation = () => {

    let cardColor = useColorModeValue("white", "gray.700");
    let borderColor = useColorModeValue("transparent", "gray.600");
    let dividerColor = useColorModeValue("gray.200", "gray.600");


    return (
        <Box border="1px" borderColor={ borderColor } width="100%" borderRadius="15px" p="1.5rem" bg={ cardColor } boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)">
            <Heading as="h4" size="md">Cost Information</Heading>
            <Divider my="1.5rem" borderColor={ dividerColor } />
            
            <Box mb="5">
                <FormLabel>Source URL</FormLabel>
                <Input 
                    borderRadius="15px"
                    fontSize="sm"
                    type="text"
                    size="lg"
                    placeholder="Enter Source URL" 
                />
            </Box>
            <SimpleGrid columns={{ base: 1, sm: 2}} spacing={5}>
                <Box w="100%">
                    <FormLabel>Purchase Time</FormLabel>
                    <InputGroup size="lg" >                 
                        <NumberInput defaultValue={15} min={1}>
                            <NumberInputField
                                fontSize="sm"
                                borderRadius="15px 0px 0px 15px"
                            />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>

                        <InputRightAddon borderRadius="15px">
                            <Select border="none" _focus={{ bg: "none" }}>
                                <option>hour</option>
                            </Select>
                        </InputRightAddon>
                    </InputGroup>
                </Box>

                <Box w="100%">
                    <FormLabel>Sales Tax Amount</FormLabel>
                    <InputGroup size="lg" >                 
                        <InputLeftAddon borderRadius="15px">
                            <Select border="none" _focus={{ bg: "none" }}>
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
                </Box>
            </SimpleGrid>
        </Box>
    )
}

export default CostInformation
