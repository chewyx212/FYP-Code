import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, Heading, Divider, SimpleGrid } from '@chakra-ui/layout'
import { Button, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const ChangePassword = () => {

    let cardColor = useColorModeValue("white", "gray.700");
    
    return (
        <Box
            width="100%"
            borderRadius="15px"
            p="1.5rem"
            bg={ cardColor }
            boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
        >
            <Heading as="h4" size="md">
              Change Password
            </Heading>
            <Divider my="1.5rem" />

            <form>
              <FormControl>
                <SimpleGrid mt="10" columns={{ base: 1, md: 2 }} spacing={10}>
                  <Box>
                    <FormLabel>New Password</FormLabel>
                    <Input
                      borderRadius="15px"
                      fontSize="sm"
                      mb="5px"
                      type="password"
                      placeholder="New password"
                      size="lg"
                    />
                  </Box>

                  <Box>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                      borderRadius="15px"
                      fontSize="sm"
                      mb="5px"
                      type="password"
                      placeholder="Repeat New Password"
                      size="lg"
                    />
                  </Box>
                </SimpleGrid>

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
                  Change Password
                </Button>
              </FormControl>
            </form>
        </Box>
    )
}

export default ChangePassword
