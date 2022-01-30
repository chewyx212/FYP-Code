import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Heading, Divider, SimpleGrid, Stack } from '@chakra-ui/layout';
import { RadioGroup, Radio } from '@chakra-ui/radio';
import { useColorModeValue, Select, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Textarea } from '@chakra-ui/react';
import React, { useState } from 'react'

const BasicInformationForm = () => {

    let cardColor = useColorModeValue("white", "gray.700");
    let borderColor = useColorModeValue("transparent", "gray.600");
    let dividerColor = useColorModeValue("gray.200", "gray.600");
    let sectionColor = useColorModeValue("gray.50", "gray.800");

    const [description, setDescription] = useState<any>("");

    const handleInputChange = (e: any) => {
        let inputValue = e.target.value
        setDescription(inputValue)
    }

    return (
        <Box border="1px" borderColor={ borderColor } width="100%" borderRadius="15px" p="1.5rem" bg={ cardColor } boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)">
            <Heading as="h4" size="md">Basic Information</Heading>
            <Divider my="1.5rem" borderColor={ dividerColor } />
            <form>
                <FormControl>
                    <SimpleGrid mt="10" columns={{ base: 1, md: 2 }} spacing={10}>
                        <Box>
                            <FormLabel>Item Name</FormLabel>
                            <Input
                                borderRadius="15px"
                                fontSize="sm"
                                mb="5px"
                                type="text"
                                placeholder="Item Name"
                                size="lg"
                            />
                        </Box>

                        <Box>
                            <FormLabel>Select Category</FormLabel>
                            <Select
                                borderRadius="15px"
                                fontSize="sm"
                                mb="5px"
                                placeholder="Select Category"
                                size="lg"
                            >
                                <option>Category 1</option>
                            </Select>
                        </Box>

                        <Box>
                            <FormLabel>Channel Selling Status</FormLabel>
                            <Select
                                borderRadius="15px"
                                fontSize="sm"
                                mb="5px"
                                placeholder="Select Status"
                                size="lg"
                            >
                                <option>Category 1</option>
                            </Select>
                        </Box>

                        <Box>
                            <FormLabel>Condition</FormLabel>
                            <RadioGroup defauleValue="new">
                                <Stack spacing={4} direction="row">
                                    <Radio value="new">
                                        New
                                    </Radio>

                                    <Radio value="used">
                                        Used
                                    </Radio>
                                </Stack>
                            </RadioGroup>
                        </Box>

                        <Box>
                            <FormLabel>Shelf Life</FormLabel>
                            <Select
                                borderRadius="15px"
                                fontSize="sm"
                                mb="5px"
                                placeholder="Select Shelf Life"
                                size="lg"
                            >
                                <option>No Shelf Life</option>
                            </Select>
                        </Box>

                        <Box>
                            <FormLabel>Minimum Purchase Quantity</FormLabel>
                            {/* <Input
                                borderRadius="15px"
                                fontSize="sm"
                                mb="5px"
                                type="number"
                                placeholder="Minimum Purchase Quantity"
                                size="lg"
                            /> */}
                            <NumberInput 
                                defaultValue={1} min={1} max={20}
                                size="lg"
                                mb="5px"
                            >
                                <NumberInputField
                                    borderRadius="15px"
                                    fontSize="sm"
                                    type="number"
                                    placeholder="Minimum Purchase Quantity"
                                    
                                />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </Box>
                    </SimpleGrid>

                    <Box mt="40px">
                        <FormLabel>Description</FormLabel>
                        <Textarea 
                            value={ description } 
                            onChange={ handleInputChange } 
                            placeholder="Write some description about this item"
                            size="lg"
                            fontSize="sm"
                            borderRadius="15px"
                        />
                    </Box>
                </FormControl>
            </form>                 
        </Box>
    )
}

export default BasicInformationForm
