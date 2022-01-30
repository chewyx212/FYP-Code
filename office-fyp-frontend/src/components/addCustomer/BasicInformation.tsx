import { Box, Divider, Heading, SimpleGrid, Stack } from '@chakra-ui/layout'
import { FormControl, FormLabel, Input, Select, RadioGroup, Radio, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Textarea, InputGroup, InputLeftAddon, Switch } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/system';
import React from 'react'

const BasicInformation = () => {

    let cardColor = useColorModeValue("white", "gray.700");
    let borderColor = useColorModeValue("transparent", "gray.600");
    let dividerColor = useColorModeValue("gray.200", "gray.600");
    
    return (
        <Box border="1px" borderColor={ borderColor } width="100%" borderRadius="15px" p="1.5rem" bg={ cardColor } boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)">
            <Heading as="h4" size="md">Basic Information</Heading>
            <Divider my="1.5rem" borderColor={ dividerColor } />
            <form>
                <FormControl>
                    <SimpleGrid mt="10" columns={{ base: 1, md: 2 }} spacing={10}>
                        <Box>
                            <FormLabel>Full Name</FormLabel>
                            <Input
                                borderRadius="15px"
                                fontSize="sm"
                                mb="5px"
                                type="text"
                                placeholder="Full Name"
                                size="lg"
                            />
                        </Box>

                        <Box>
                            <FormLabel>Gender</FormLabel>
                            <RadioGroup defauleValue="male">
                                <Stack spacing={4} direction="row">
                                    <Radio value="male">
                                        Male
                                    </Radio>

                                    <Radio value="female">
                                        Female
                                    </Radio>
                                </Stack>
                            </RadioGroup>
                        </Box>

                        <Box>
                            <FormLabel>Date of Birth</FormLabel>
                            <Input
                                borderRadius="15px"
                                fontSize="sm"
                                mb="5px"
                                type="date"
                                size="lg"
                            />
                        </Box>


                        <Box>
                            <FormLabel>Mobile</FormLabel>
                            <InputGroup size="lg" >                 
                                <InputLeftAddon borderRadius="15px">
                                    <Select border="none" _focus={{ bg: "none" }}>
                                        <option>+60</option>
                                    </Select>
                                </InputLeftAddon>
                                <Input
                                    borderRadius="15px"
                                    fontSize="sm"
                                    mb="5px"
                                    type="text"
                                    placeholder="Enter valid phone number"
                                    size="lg"
                                />
                            </InputGroup>
                        </Box>

                        <Box>
                            <FormLabel>Email</FormLabel>
                            <Input
                                borderRadius="15px"
                                fontSize="sm"
                                mb="5px"
                                type="text"
                                placeholder="Email"
                                size="lg"
                            />
                        </Box>

                        <Box>
                            <FormLabel>WhatsApp</FormLabel>
                            <InputGroup size="lg">
                            <InputLeftAddon
                                children="https://wa.me/"
                                fontSize="sm"
                                borderRadius="15px"
                            />
                            <Input
                                borderRadius="15px"
                                fontSize="sm"
                                mb="5px"
                                type="text"
                                placeholder="WhatsApp"
                            />
                            </InputGroup>
                        </Box>

                        <Box>
                            <FormLabel>Facebook</FormLabel>
                            <InputGroup size="lg">
                            <InputLeftAddon
                                children="https://facebook.com/"
                                fontSize="sm"
                                borderRadius="15px"
                            />
                            <Input
                                borderRadius="15px"
                                fontSize="sm"
                                mb="5px"
                                type="text"
                                placeholder="Facebook"
                            />
                            </InputGroup>
                        </Box>

                        <Box>
                            <FormLabel>Instagram</FormLabel>
                            <InputGroup size="lg">
                            <InputLeftAddon
                                children="https://instagram.com/"
                                fontSize="sm"
                                borderRadius="15px"
                            />
                            <Input
                                borderRadius="15px"
                                fontSize="sm"
                                mb="5px"
                                type="text"
                                placeholder="Instagram"
                            />
                            </InputGroup>
                        </Box>

                        <Box>
                            <FormLabel>Customer Group</FormLabel>
                            <Select
                                borderRadius="15px"
                                fontSize="sm"
                                mb="5"
                                size="lg"
                                placeholder="Select Customer Group"
                            >
                                <option>Demo Customer Group</option>
                            </Select>
                        </Box>

                        <FormControl display="flex" alignItems="center">
                            <FormLabel htmlFor="email-alerts" mb="0">
                                Black List
                            </FormLabel>
                            <Switch id="email-alerts" size="md" colorScheme="twitter" />
                        </FormControl>
                    </SimpleGrid>
                </FormControl>
            </form>          
        </Box>
    )
}

export default BasicInformation
