import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Divider, Flex, FormControl, FormLabel, Heading, Stack, Textarea, useColorModeValue } from '@chakra-ui/react'
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import BasicInformation from 'components/addCustomer/BasicInformation';
import ShippingAddress from 'components/addCustomer/ShippingAddress';
import React, { useState } from 'react'

const AddCustomerPage = () => {

    let cardColor = useColorModeValue("white", "gray.700");
    let borderColor = useColorModeValue("transparent", "gray.600");
    let dividerColor = useColorModeValue("gray.200", "gray.600");

    const { nextStep, prevStep, reset, activeStep } = useSteps({
        initialStep: 0,
    })

    const [notes, setNotes] = useState<any>("");

    const handleInputChange = (e: any) => {
        let inputValue = e.target.value
        setNotes(inputValue)
    }

    return (
        <Flex flexDirection="column" pt={{ base: "120px", md: "100px" }}>
            <Heading as="h4" size="md" mb="10">Add Customer</Heading>
            <Steps colorScheme="twitter" activeStep={activeStep} mb="50px">
                <Step label="Step 1" description="Basic Information">
                    <BasicInformation />
                </Step>
                
                <Step label="Step 2" description="Shipping Address">
                    <ShippingAddress />
                </Step>

                <Step label="Step 3" description="Notes">
                    <Box border="1px" borderColor={ borderColor } width="100%" borderRadius="15px" p="1.5rem" bg={ cardColor } boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)">
                        <Heading as="h4" size="md">Notes</Heading>
                        <Divider my="1.5rem" borderColor={ dividerColor } />
                        <form>
                            <FormControl>
                                <Box>
                                    <FormLabel>Notes</FormLabel>
                                    <Textarea
                                        value={ notes } 
                                        onChange={ handleInputChange } 
                                        placeholder="Write some notes"
                                        size="lg"
                                        fontSize="sm"
                                        borderRadius="15px"
                                    />
                                </Box>
                            </FormControl>
                        </form>
                    </Box>
                </Step>
            </Steps>

            <Stack justifyContent="right" direction="row" spacing={4} mt="5">
                {
                    activeStep != 0 &&
                    <Button
                        leftIcon={<ArrowBackIcon />} 
                        color="primary" 
                        borderColor="primary" 
                        variant="outline"
                        onClick={ prevStep }
                    >
                        Back
                    </Button>
                }
                
                {
                    activeStep === 2 ?
                        <Button 
                            // rightIcon={<ArrowForwardIcon />} 
                            color="white" 
                            bg="primary" 
                            _hover={{
                                bg: "blue.200",
                            }}
                            _active={{
                                bg: "blue.400",
                            }}variant="solid"
                        >
                            Save
                        </Button>
                        :
                        <Button 
                            rightIcon={<ArrowForwardIcon />} 
                            color="white" 
                            bg="primary" 
                            _hover={{
                                bg: "blue.200",
                            }}
                            _active={{
                                bg: "blue.400",
                            }}variant="solid"
                            onClick={ nextStep }
                        >
                            Next
                        </Button>
                }
            </Stack>
        </Flex>
    )
}

export default AddCustomerPage
