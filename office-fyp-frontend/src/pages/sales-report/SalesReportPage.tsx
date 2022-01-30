import Icon from '@chakra-ui/icon';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { Text, useColorModeValue, Flex, SimpleGrid, Box, Stat, StatLabel, StatNumber, StatHelpText, Spacer, Table, Tbody, Td, Th, Thead, Tooltip, Tr, Heading, HStack, IconButton, Img, VStack, Stack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { FiDollarSign, FiUser, FiUsers, FiShoppingCart, FiBarChart, FiBarChart2, FiEdit3, FiTrash2 } from 'react-icons/fi';
import LineChart from "components/charts/LineChart";
import BarChart from 'components/charts/BarChart';

const SalesReportPage = () => {

    let cardColor = useColorModeValue("white", "gray.700");
    let borderColor = useColorModeValue("transparent", "gray.600");

    const [isEmpty, setIsEmpty] = useState<Boolean>(false);

    return (
        <Flex flexDirection="column" pt={{ base: "120px", md: "100px" }}>
            <SimpleGrid mb="10" columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
                <Box bg={ cardColor } minH="83px" borderRadius="15px" p="1.2rem" boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)">
                    <Flex flexDirection="row" align="center" justify="center" w="100%">
                    <Stat me="auto">
                        <StatLabel
                        fontSize="sm"
                        color="gray.400"
                        fontWeight="bold"
                        pb=".1rem"
                        >
                        Total Sales
                        </StatLabel>
                        <Flex>
                        <StatNumber fontSize="lg" color="blue-300" fontWeight="bold">
                            RM 173,000
                        </StatNumber>
                        <StatHelpText
                            alignSelf="flex-end"
                            justifySelf="flex-end"
                            m="0px"
                            color="green.400"
                            fontWeight="bold"
                            ps="3px"
                            fontSize="md"
                        >
                            +8%
                        </StatHelpText>
                        </Flex>
                    </Stat>
                    <Box borderRadius="15px" h={"45px"} w={"45px"} bg="primary">
                        <Flex justifyContent="center" alignItems="center">
                        <Icon as={ FiBarChart2 } color="white" h="24px" w="24px" mt="10px" />
                        </Flex>
                    </Box>
                    </Flex>
                
                </Box>
                <Box bg={ cardColor } minH="83px" borderRadius="20px" p="1.5rem" boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)">
                    <Flex flexDirection="row" align="center" justify="center" w="100%">
                        <Stat me="auto">
                            <StatLabel
                            fontSize="sm"
                            color="gray.400"
                            fontWeight="bold"
                            pb=".1rem"
                            >
                            Total Profit
                            </StatLabel>
                            <Flex>
                            <StatNumber fontSize="lg" color="blue-300">
                                RM 53,000
                            </StatNumber>
                            <StatHelpText
                                alignSelf="flex-end"
                                justifySelf="flex-end"
                                m="0px"
                                color="green.400"
                                fontWeight="bold"
                                ps="3px"
                                fontSize="md"
                            >
                                +55%
                            </StatHelpText>
                            </Flex>
                        </Stat>
                        <Box borderRadius="15px" h={"45px"} w={"45px"} bg="primary">
                            <Flex justifyContent="center" alignItems="center">
                                <Icon as={ FiDollarSign } color="white" h="24px" w="24px" mt="10px" />
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
                <Box bg={ cardColor } minH="83px" borderRadius="20px" p="1.2rem" boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)">
                    <Flex flexDirection="row" align="center" justify="center" w="100%">
                        <Stat me="auto">
                            <StatLabel
                            fontSize="sm"
                            color="gray.400"
                            fontWeight="bold"
                            pb=".1rem"
                            >
                            Total Orders
                            </StatLabel>
                            <Flex>
                                <StatNumber fontSize="lg" color="blue-300">
                                    2,300
                                </StatNumber>
                                <StatHelpText
                                    alignSelf="flex-end"
                                    justifySelf="flex-end"
                                    m="0px"
                                    color="green.400"
                                    fontWeight="bold"
                                    ps="3px"
                                    fontSize="md"
                                >
                                    +5%
                                </StatHelpText>
                            </Flex>
                        </Stat>
                    <Box borderRadius="15px" h="45px" w="45px" bg="primary">
                        <Flex justifyContent="center" alignItems="center">
                            <Icon as={ FiShoppingCart } color="white" h="24px" w="24px" mt="10px" />
                        </Flex>
                    </Box>
                    </Flex>
                
                </Box>
                <Box bg={ cardColor } minH="83px" borderRadius="15px" p="1.2rem" boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)">
                
                    <Flex flexDirection="row" align="center" justify="center" w="100%">
                    <Stat>
                        <StatLabel
                        fontSize="sm"
                        color="gray.400"
                        fontWeight="bold"
                        pb=".1rem"
                        >
                        Total Client
                        </StatLabel>
                        <Flex>
                        <StatNumber fontSize="lg" color="blue-300">
                            +3,020
                        </StatNumber>
                        <StatHelpText
                            alignSelf="flex-end"
                            justifySelf="flex-end"
                            m="0px"
                            color="red.500"
                            fontWeight="bold"
                            ps="3px"
                            fontSize="md"
                        >
                            -14%
                        </StatHelpText>
                        </Flex>
                    </Stat>
                    <Spacer />
                    <Box borderRadius="15px" h={"45px"} w={"45px"} bg="primary">
                        <Flex justifyContent="center" alignItems="center">
                        <Icon as={ FiUsers } color="white" h="24px" w="24px" mt="10px" />
                        </Flex>
                    </Box>
                    </Flex>
                
                </Box>
                
            </SimpleGrid>


            <Stack spacing="5" direction={{ base: "column", sm: 'row' }}>
                <Box w="100%" h="100%" ps="8px" borderRadius="20px" boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)" bg={ cardColor }>
                    <Heading as="h4" size="md" mx="4" my="5">
                        Total Sales
                    </Heading>
                    <LineChart />
                </Box> 

                <Box w="100%" h="100%" ps="8px" borderRadius="20px" boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)" bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)">
                    <Heading as="h4" size="md" mx="4" my="5" color="white">
                        Total Orders
                    </Heading>
                    <BarChart />
                </Box> 
            </Stack>
                  

            <Box 
                overflowX="auto"
                mt="5"
                borderRadius="20px"
                p="1.5rem"
                bg={cardColor}
                boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
                // border="1px"
                // borderColor={borderColor}
            >
                <Heading as="h4" size="md" mb="5">
                    Top Sales Item
                </Heading>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Item</Th>
                            <Th>Store Name</Th>
                            <Th>Price</Th>
                            <Th>Sold</Th>
                            <Th>Profit</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {isEmpty ? (
                        <Tr>
                            <Td colSpan={11}>
                            <VStack justifyContent="center">
                                <Img src="box.svg" boxSize="50px" />
                                <Text>No Data</Text>
                            </VStack>
                            </Td>
                        </Tr>
                        ) : (
                        <Tr>
                            <Td>
                                <Flex alignItems="center">
                                    <Img src="" boxSize="60px" mr="5" />
                                    <Text>Demo Item</Text>
                                </Flex>
                            </Td>
                            <Td>Demo Store</Td>
                            <Td>RM 12</Td>
                            <Td>50</Td>
                            <Td>RM 600</Td>
                        </Tr>
                        )}
                    </Tbody>
                </Table>    
            </Box>
        </Flex>
    )
}

export default SalesReportPage
