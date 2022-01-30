import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/input'
import { Box, Heading, Divider, SimpleGrid, Stack, VStack, HStack, Badge } from '@chakra-ui/layout'
import { RadioGroup, Radio } from '@chakra-ui/radio'
import { Button, IconButton, Select, Textarea, useColorModeValue } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { FiTrash2, FiPlus } from 'react-icons/fi'
import { Switch } from 'react-router'

const ShippingAddress = () => {

    let cardColor = useColorModeValue("white", "gray.700");
    let borderColor = useColorModeValue("transparent", "gray.600");
    let dividerColor = useColorModeValue("gray.200", "gray.600");

    const [description, setDescription] = useState<any>("");

    const handleInputChange = (e: any) => {
        let inputValue = e.target.value
        setDescription(inputValue)
    }

    const { register, control, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            address: [
                { 
                  name: "", 
                  mobile: "",
                  district: "",
                  poscode: "",
                  address: "",
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
        name: "address"
    });
    
    return (
        <Box border="1px" borderColor={ borderColor } width="100%" borderRadius="15px" p="1.5rem" bg={ cardColor } boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)">
            <Heading as="h4" size="md">Shipping Address</Heading>
            <Divider my="1.5rem" borderColor={ dividerColor } />
            <form>
                <FormControl>
                    {
                        fields.map((item: any, index) => {
                            return (
                                <div key={ item.id }>
                                    <HStack>
                                        <Heading as="h5" size="sm">Address {index + 1}</Heading>
                                        
                                        {
                                            index === 0 && 
                                                <Badge variant="solid" colorScheme="teal">Main</Badge>
                                            
                                        }
                                       
                                        <Box alignSelf={{ sm: "end" }}>
                                            <IconButton
                                                variant="ghost"
                                                size="md"
                                                colorScheme="red"
                                                aria-label="Remove Index"
                                                icon={<FiTrash2 />}
                                                onClick={ () => remove(index) }
                                            />
                                        </Box>
                                    </HStack>

                                    <SimpleGrid mt="10" columns={{ base: 1, md: 2 }} spacing={10}>
                                        <Box w="100%">
                                            <FormLabel>Full Name</FormLabel>
                                            <Controller
                                                render={ ({ field }) => 
                                                    <Input borderRadius="15px"
                                                        fontSize="sm"
                                                        type="text"
                                                        size="lg"
                                                        placeholder="Full Name"  {...field} 
                                                />}
                                                name={ `address.${index}.name` }
                                                control={ control }
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
                                            <FormLabel>Distrits</FormLabel>
                                            <Input
                                                borderRadius="15px"
                                                fontSize="sm"
                                                mb="5px"
                                                type="text"
                                                placeholder="Distrits"
                                                size="lg"
                                            />
                                        </Box>

                                        <Box>
                                            <FormLabel>Pos Code</FormLabel>
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
                                            <FormLabel>Address</FormLabel>
                                            <Textarea
                                                value={ description } 
                                                onChange={ handleInputChange } 
                                                placeholder="Address"
                                                size="lg"
                                                fontSize="sm"
                                                borderRadius="15px"
                                            />
                                        </Box>
                                    </SimpleGrid>

                                    <Divider my="10" borderColor={ dividerColor } />
                                </div>
                            )
                        })
                    }

                <Button
                    fontSize="16px"
                    // bg="primary"
                    // w="100%"
                    h="45"
                    mb="40px"
                    color="primary"
                    _hover={{
                        // bg: "blue.200",
                        color: "blue.200"
                    }}
                    _active={{
                        color: "blue.400",
                    }}
                    onClick={() => {
                        append({ name: "", 
                        mobile: "",
                        district: "",
                        poscode: "",
                        address: "", });
                    }}
                    variant="ghost"
                    leftIcon={<FiPlus />}
                >Add New Address</Button>
                    
                </FormControl>
            </form>
        </Box>
    )
}

export default ShippingAddress
