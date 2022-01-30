import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Text,
  Heading,
  SimpleGrid,
  Box,
  Flex,
  Img,
  Divider,
  Button,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Spinner,
  FormControl,
  useToast,
  Select,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { StoreApi } from "api/StoreApi";
import { useQueryString } from "hook/useQueryString";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { CompanyState } from "types/CompanyType";
import { ActiveFormType, PlatformListType } from "types/StoreType";

type IProps = {
  type: string;
  nextStep: Function;
  prevStep: Function;
};


const MarketIntegration: React.FC<IProps> = ({type, nextStep, prevStep }) => {
  let cardColor = useColorModeValue("white", "gray.700");
  let borderColor = useColorModeValue("transparent", "gray.600");
  const [formData, setFormData] = useState<any>();
  const [channels, setChannels] = useState<PlatformListType[]>([]);
  // const [companyList, setCompanyList] = useState<CompanyState[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<number>();
  const [countryList, setCountryList] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<number>();
  const [formList, setFormList] = useState<ActiveFormType[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<number>();
  const [isLoadingForm, setIsLoadingForm] = useState<boolean>(false);
  const [isSync, setIsSync] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const currentPath = window.location.href;
  const history = useHistory();
  const query = useQueryString();
  const toast = useToast();

  useEffect(() => {
    if (query.get("success") === "0") {
      toast({
        title: "Store Integration Failed.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else if (query.get("success") === "1") {
      toast({
        title: "Store Integration Success.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      history.push('/integration')
    }
      if (type === "first") {
        getUserStore();
      }
    getAllPlatform();
  }, []);

  const getUserStore = async () => {
    const { data } = await StoreApi.getUserStore();
    console.log(data);
    // if (query.get("success") === "1" && data.response.store.length > 0) {
    //   nextStep();
    // }
    if (data.status === 0 && data.response.store.length === 0) {
    } else if (data.response.store.length > 0) {
      // history.push("/");
      nextStep();
    }
  };
  const getAllPlatform = async () => {
    const { data } = await StoreApi.getPlatformStore();
    console.log(data);
    if (data.status === 0 && data.response.length > 0) {
      setChannels(data.response);
    }
  };

  const getPlatformForm = async (id: number) => {
    setIsLoadingForm(true);
    const { data } = await StoreApi.getIntegrationForm(id);
    console.log(data);
    if (data.status === 0) {
      if (data.response.company_list.length > 0) {
        setSelectedCompany(data.response.company_list[0].id);
        // setCompanyList(data.response.company_list);
      }
      if (data.response.country_list.length > 0) {
        setCountryList(data.response.country_list);
      }
      if (data.response.form.length > 0) {
        setFormList(data.response.form);
        let temp = {
          name: "",
        };
        data.response.form.forEach((form: ActiveFormType) => {
          temp = {
            ...temp,
            [form.key]: "",
          };
        });
        setFormData(temp);
        console.log(temp);
      }
      setSelectedPlatform(data.response.store_platform_id);
      setIsLoadingForm(false);
    }
  };

  const onFieldChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: string,
    value: string
  ) => {
    event.persist && event.persist();
    console.log(field);
    console.log(value);
    setFormData((form: any) => ({
      ...form,
      [field]: value,
    }));
  };
  const onSelectChange = (
    event: ChangeEvent<HTMLSelectElement>,
    field: string,
    value: string
  ) => {
    event.persist && event.persist();
    setFormData((form: any) => ({
      ...form,
      [field]: value,
    }));
  };

  const onSubmit = async () => {
    console.log(formData);
    setIsSubmitting(true);
    let keys: string[] = Object.keys(formData);
    let isEmptyField: boolean = false;
    console.log(Object.values(formData));
    console.log(keys);
    console.log(Object.values(formData));
    keys.forEach((key) => {
      if (!formData[key]) {
        console.log("something is empty lah");
        isEmptyField = true;
      }
    });
    if (isEmptyField) {
      toast({
        title: "Please fill in all fields",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
      setIsSubmitting(false);
      return;
    } else {
      const payload = {
        ...formData,
        country_id: selectedCountry,
        company_id: selectedCompany,
        store_platform_id: selectedPlatform,
        return_url: currentPath,
      };
      console.log(payload);
      if (selectedPlatform) {
        const { data: res } = await StoreApi.saveStore(payload);
        console.log(res);
        if (res.status === 0) {
          toast({
            title: "Redirecting...",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          window.location.href=res.response.url;
        } else if (res.status === -1) {
          setIsSubmitting(false);
          toast({
            title: res.message,
            status: "warning",
            duration: 9000,
            isClosable: true,
          });
        }
      }

      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Heading as="h4" size="md" mb="5">
        Market Integration
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
        {channels.map((channel: any) => {
          return (
            <Box
              key={channel.id}
              onClick={() => {
                getPlatformForm(channel.id);
              }}
              border="1px"
              borderColor={borderColor}
              cursor="pointer"
              boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
              bg={cardColor}
              maxW="sm"
              borderRadius="20px"
              overflow="hidden"
            >
              <Flex justifyContent="center">
                <Img
                  src={channel.image}
                  alt={channel.name}
                  boxSize="200px"
                  objectFit="cover"
                />
              </Flex>
              <Divider />
              <Box
                p="6"
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                {channel.name}

                {isSync && <CheckCircleIcon ml={3} color="green.500" />}
              </Box>
            </Box>
          );
        })}
      </SimpleGrid>
      <Flex pt="30px" alignItems="center" justifyContent="center" w="100%">
        {isLoadingForm && (
          <Spinner
            pt="40px"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        )}
        {selectedPlatform && !isLoadingForm && (
          <Box
            width="100%"
            borderRadius="15px"
            p="1.5rem"
            bg={cardColor}
            boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
          >
            <Heading as="h4" size="md">
              Create Store
            </Heading>
            <Divider my="1.5rem" />

            <form>
              <FormControl>
                <SimpleGrid mt="10" columns={{ base: 1, md: 2 }} spacing={10}>
                  {/* <Box>
                    <FormLabel>Company</FormLabel>
                    <Select
                      value={selectedCompany}
                      onChange={(e) =>
                        setSelectedCompany(JSON.parse(e.target.value))
                      }
                      borderRadius="15px"
                      fontSize="sm"
                      mb="5"
                      size="lg"
                      placeholder="Select Company"
                    >
                      {companyList.map((company: CompanyState) => {
                        return (
                          <option key={company.name} value={company.id}>
                            {company.name}
                          </option>
                        );
                      })}
                    </Select>
                  </Box> */}
                  <Box>
                    <FormLabel>Country</FormLabel>
                    <Select
                      value={selectedCountry}
                      onChange={(e) =>
                        setSelectedCountry(JSON.parse(e.target.value))
                      }
                      borderRadius="15px"
                      fontSize="sm"
                      mb="5"
                      size="lg"
                      placeholder="Select Country"
                    >
                      {countryList.map((country: CompanyState) => {
                        return (
                          <option key={country.name} value={country.id}>
                            {country.name}
                          </option>
                        );
                      })}
                    </Select>
                  </Box>
                  <Box>
                    <FormLabel>Name</FormLabel>
                    <Input
                      onChange={(e) => onFieldChange(e, "name", e.target.value)}
                      borderRadius="15px"
                      fontSize="sm"
                      mb="5px"
                      type="text"
                      placeholder="Name"
                      size="lg"
                    />
                  </Box>

                  {formList.map((form: ActiveFormType) => {
                    if (parseInt(form.input_type) === 1) {
                      //TextField
                      return (
                        <Box key={form.id}>
                          <FormLabel>{form.display_name}</FormLabel>
                          <Input
                            onChange={(e) =>
                              onFieldChange(e, form.key, e.target.value)
                            }
                            borderRadius="15px"
                            fontSize="sm"
                            mb="5px"
                            type="text"
                            placeholder={form.key}
                            size="lg"
                          />
                        </Box>
                      );
                    } else if (parseInt(form.input_type) === 2) {
                      //Checkbox
                      return (
                        <Box key={form.id}>
                          <FormLabel>{form.key}</FormLabel>
                          <Input
                            onChange={(e) =>
                              onFieldChange(e, form.key, e.target.value)
                            }
                            borderRadius="15px"
                            fontSize="sm"
                            mb="5px"
                            type="text"
                            placeholder={form.key}
                            size="lg"
                          />
                        </Box>
                      );
                    } else if (parseInt(form.input_type) === 3) {
                      //Multiple Select Dropdown
                      return (
                        <Box key={form.id}>
                          <FormLabel>{form.key}</FormLabel>
                          <Input
                            onChange={(e) =>
                              onFieldChange(e, form.key, e.target.value)
                            }
                            borderRadius="15px"
                            fontSize="sm"
                            mb="5px"
                            type="text"
                            placeholder={form.key}
                            size="lg"
                          />
                        </Box>
                      );
                    } else if (parseInt(form.input_type) === 4) {
                      //Dropdown
                      let options: any[] = Object.entries(
                        JSON.parse(form.value)
                      );
                      return (
                        <Box key={form.id}>
                          <FormLabel>{form.key}</FormLabel>
                          <Select
                            onChange={(e) =>
                              onSelectChange(e, form.key, e.target.value)
                            }
                            borderRadius="15px"
                            fontSize="sm"
                            mb="5px"
                            placeholder={"Select " + form.key}
                            size="lg"
                          >
                            {options.map((option: any[]) => {
                              return (
                                <option key={option[0]} value={option[0]}>
                                  {option[1]}
                                </option>
                              );
                            })}
                          </Select>
                        </Box>
                      );
                    } else if (parseInt(form.input_type) === 5) {
                      //Radio
                      return (
                        <Box key={form.id}>
                          <FormLabel>{form.key}</FormLabel>
                          <Input
                            borderRadius="15px"
                            fontSize="sm"
                            mb="5px"
                            placeholder={form.key}
                            size="lg"
                          />
                        </Box>
                      );
                    }
                  })}
                </SimpleGrid>
              </FormControl>

              <Button
                fontSize="16px"
                bg="primary"
                w="100%"
                h="45"
                mt="40px"
                color="white"
                disabled={isSubmitting}
                onClick={onSubmit}
                _hover={{
                  bg: "blue.200",
                }}
                _active={{
                  bg: "blue.400",
                }}
              >
                Submit
                {isSubmitting && (
                  <Spinner
                    ml="10px"
                    thickness="2px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="sm"
                  />
                )}
              </Button>
            </form>
          </Box>
        )}
      </Flex>

      {/* Shopee Modal */}
      {/* <Modal
        isCentered
        onClose={onCloseShopee}
        isOpen={isOpenShopee}
        motionPreset="slideInBottom"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Store</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Flex justifyContent="center">
              <Img src="/shopee-logo.png" boxSize="200px" />
            </Flex>

            <Text fontSize="sm" my="5">
              Click to start synchronization and you will jump to Shopee's page
              for Login Authorization.
            </Text>
            <Text fontSize="sm">
              After the authorization is successful, you can manage your
              products and orders from the store in CRM.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              w="100%"
              fontSize="16px"
              bg="primary"
              h="45"
              color="white"
              _hover={{
                bg: "blue.200",
              }}
              _active={{
                bg: "blue.400",
              }}
            >
              Start Sync
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Lazada Modal */}
      {/* <Modal
        isCentered
        onClose={onCloseLazada}
        isOpen={isOpenLazada}
        motionPreset="slideInBottom"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Store</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Flex justifyContent="center">
              <Img src="/lazada-logo.png" boxSize="200px" />
            </Flex>

            <Text fontSize="sm" my="5">
              Click to start synchronization and you will jump to Lazada's page
              for Login Authorization.
            </Text>
            <Text fontSize="sm">
              After the authorization is successful, you can manage your
              products and orders from the store in CRM.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              w="100%"
              fontSize="16px"
              bg="primary"
              h="45"
              color="white"
              _hover={{
                bg: "blue.200",
              }}
              _active={{
                bg: "blue.400",
              }}
            >
              Start Sync
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>  */}

      {/* WooCommerce Modal */}
      {/* <Modal
        isCentered
        onClose={onCloseWooCommerce}
        isOpen={isOpenWooCommerce}
        motionPreset="slideInBottom"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Store</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Flex justifyContent="center">
              <Img src="/woocommerce-logo.png" boxSize="200px" />
            </Flex>
            <FormLabel>Domain Name</FormLabel>
            <InputGroup size="lg" mb="5">
              <InputLeftAddon
                children="https://"
                borderRadius="15px"
                fontSize="sm"
              />
              <Input
                borderRadius="15px"
                fontSize="sm"
                type="text"
                placeholder="www.example.com"
              />
            </InputGroup>

            <FormLabel>Store Name</FormLabel>
            <Input
              borderRadius="15px"
              fontSize="sm"
              mb="5"
              type="text"
              placeholder="Enter Store Name"
              size="lg"
            />

            <FormLabel>Country / Region</FormLabel>
            <Select
              borderRadius="15px"
              fontSize="sm"
              mb="5"
              size="lg"
              placeholder="Select Country / Region"
            >
              <option>Malaysia</option>
            </Select>

            <Text fontSize="sm" my="5">
              Click to start synchronization and you will jump to WooCommerce's
              page for Login Authorization.
            </Text>
            <Text fontSize="sm">
              After the authorization is successful, you can manage your
              products and orders from the store in CRM.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              w="100%"
              fontSize="16px"
              bg="primary"
              h="45"
              color="white"
              _hover={{
                bg: "blue.200",
              }}
              _active={{
                bg: "blue.400",
              }}
            >
              Start Sync
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </>
  );
};

export default MarketIntegration;
