import Icon from '@chakra-ui/icon'
import { Heading, Divider, FormControl, Flex, Avatar, AvatarBadge, SimpleGrid, Box, FormLabel, Input, RadioGroup, Stack, Radio, Select, Button, useColorModeValue } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { FiCamera } from 'react-icons/fi'

const PersonalInformation = () => {

    let cardColor = useColorModeValue("white", "gray.700");

    const avatarRef = useRef<any>(null);
    
    return (
        <Box
            width="100%"
            borderRadius="15px"
            p="1.5rem"
            bg={ cardColor }
            boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
        >
            <Heading as="h4" size="md">
              Personal Information
            </Heading>
            <Divider my="1.5rem" />
            <form>
              <FormControl>
                <Flex justifyContent="center">
                  <Avatar w="100px" h="100px">
                    <AvatarBadge
                      cursor="pointer"
                      borderWidth="0.5px"
                      borderColor="gray.200"
                      boxSize="2em"
                      bg="white"
                      onClick={() => { avatarRef.current.click() }}
                    > 
                      <Input 
                        type="file" 
                        display="none" 
                        ref={avatarRef}  
                      />
                      <Icon as={FiCamera} color="grey" />
                    </AvatarBadge>
                  </Avatar>
                </Flex>

                <SimpleGrid mt="10" columns={{ base: 1, md: 2 }} spacing={10}>
                  <Box>
                    <FormLabel>Full Name</FormLabel>
                    <Input
                      borderRadius="15px"
                      fontSize="sm"
                      mb="5px"
                      type="text"
                      placeholder="Your Full Name"
                      size="lg"
                    />
                  </Box>

                  <Box>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup defauleValue="male">
                      <Stack spacing={4} direction="row">
                        <Radio value="male">Male</Radio>

                        <Radio value="female">Female</Radio>
                      </Stack>
                    </RadioGroup>
                  </Box>

                  <Box>
                    <FormLabel>Email</FormLabel>
                    <Input
                      borderRadius="15px"
                      fontSize="sm"
                      mb="5px"
                      type="email"
                      placeholder="Your Email"
                      size="lg"
                    />
                  </Box>

                  <Box>
                    <FormLabel>Contact</FormLabel>
                    <Input
                      borderRadius="15px"
                      fontSize="sm"
                      mb="5px"
                      type="number"
                      placeholder="Your Contact"
                      size="lg"
                    />
                  </Box>

                  <Box>
                    <FormLabel>Address</FormLabel>
                    <Input
                      borderRadius="15px"
                      fontSize="sm"
                      mb="5px"
                      type="text"
                      placeholder="Your Address"
                      size="lg"
                    />
                  </Box>

                  <Box>
                    <FormLabel>Zip Code</FormLabel>
                    <Input
                      borderRadius="15px"
                      fontSize="sm"
                      mb="5px"
                      type="text"
                      placeholder="Your Zip Code"
                      size="lg"
                    />
                  </Box>

                  <Box>
                    <FormLabel>City</FormLabel>
                    <Input
                      borderRadius="15px"
                      fontSize="sm"
                      mb="5px"
                      type="text"
                      placeholder="Your City"
                      size="lg"
                    />
                  </Box>

                  <Box>
                    <FormLabel>State</FormLabel>
                    <Input
                      borderRadius="15px"
                      fontSize="sm"
                      mb="5px"
                      type="text"
                      placeholder="Your State"
                      size="lg"
                    />
                  </Box>
                </SimpleGrid>

                <Box mt="40px">
                  <FormLabel>Country</FormLabel>
                  <Select
                    borderRadius="15px"
                    fontSize="sm"
                    mb="5px"
                    placeholder="Select Country"
                    size="lg"
                  >
                    <option>Malaysia</option>
                  </Select>
                </Box>

                <Button
                  fontSize="16px"
                  type="submit"
                  bg="primary"
                  w="100%"
                  h="45"
                  color="white"
                  mt="40px"
                  _hover={{
                    bg: "blue.200",
                  }}
                  _active={{
                    bg: "blue.400",
                  }}
                >
                  UPDATE
                </Button>
              </FormControl>
            </form>
        </Box>
    )
}

export default PersonalInformation
