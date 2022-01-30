import { FormLabel, FormControl } from '@chakra-ui/form-control';
import { InputGroup, InputRightAddon, Input } from '@chakra-ui/input';
import { Box, Heading, Divider, SimpleGrid } from '@chakra-ui/layout';
import { Switch, useColorModeValue, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Select } from '@chakra-ui/react';
import React, { useState } from 'react'

const Delivery = () => {

    let cardColor = useColorModeValue("white", "gray.700");
    let borderColor = useColorModeValue("transparent", "gray.600");
    let dividerColor = useColorModeValue("gray.200", "gray.600");

    const [isPreorderChecked, setIsPreorderChecked] = useState<boolean>(false);
    
    return (
        <Box border="1px" borderColor={ borderColor } width="100%" borderRadius="15px" p="1.5rem" bg={ cardColor } boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)">
            <Heading as="h4" size="md">Delivery</Heading>
            <Divider my="1.5rem" borderColor={ dividerColor } />
            <FormLabel mb="5">Package Size</FormLabel>
            
            <SimpleGrid columns={{ base: 1, sm: 3}} spacing={5} mb="5">
                <Box>
                    <FormLabel>Length</FormLabel>
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
                                <option>cm</option>
                            </Select>
                        </InputRightAddon>
                    </InputGroup>
                </Box>

                <Box>
                    <FormLabel>Width</FormLabel>
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
                                <option>cm</option>
                            </Select>
                        </InputRightAddon>
                    </InputGroup>
                </Box>

                <Box>
                    <FormLabel>Height</FormLabel>
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
                                <option>cm</option>
                            </Select>
                        </InputRightAddon>
                    </InputGroup>
                </Box>

                <Box>
                    <FormLabel>Weight</FormLabel>
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
                                <option>g</option>
                            </Select>
                        </InputRightAddon>
                    </InputGroup>
                </Box>

                <Box>
                    <FormLabel>Barcode</FormLabel>           
                    <Input
                        borderRadius="15px"
                        fontSize="sm"
                        type="text"
                        size="lg"
                        
                        placeholder="Barcode only supports letters, numbers and -_" 
                    />
                </Box>
            </SimpleGrid>

            <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="preorder" mb="0">
                    Preorder
                </FormLabel>
                <Switch id="preorder" isChecked={ isPreorderChecked } onChange={ () => setIsPreorderChecked(!isPreorderChecked) } />
            </FormControl>

        </Box>
    )
}

export default Delivery
