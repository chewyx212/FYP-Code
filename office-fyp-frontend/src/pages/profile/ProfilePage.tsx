import {
  Box,
  Flex,
  Avatar,
  Text,
  Divider,
  Icon,
  Tag,
  useColorModeValue,
} from "@chakra-ui/react";
import CompanyInformationPage from "./CompanyInformationPage";
import PersonalInformation from "components/profile/PersonalInformation";
import React, { useState } from "react";
import {
  FiUser,
  FiChevronRight,
  FiBriefcase,
  FiLock,
} from "react-icons/fi";
import { CompanyApi } from "api/CompanyApi";
import { CompanyState, CreateCompanyType } from "types/CompanyType";
import { useAppDispatch } from "app/hooks";
import { saveCompany } from "app/company/companySlice";
import ChangePassword from "components/profile/ChangePassword";

const ProfilePage = () => {
  let cardColor = useColorModeValue("white", "gray.700");

  const tabs = [
    {
      id: 1,
      label: "Personal Information",
      icon: FiUser,
    },

    {
      id: 2,
      label: "Company Information",
      icon: FiBriefcase,
    },

    {
      id: 3,
      label: "Change Password",
      icon: FiLock,
    },
  ];

  const [selectedTab, setSelectedTab] = useState<number>(tabs[0].id);

  const dispatch = useAppDispatch();

  const OnSubmitCreateCompany = async (payload: CreateCompanyType) => {
    // const { data } = await CompanyApi.postCreateCompany(payload);
    // console.log(data);
    // if (data.status === 0) {
    //   const company: CompanyState = {
    //     category_id: data.response.category_id,
    //     id: data.response.id,
    //     country_id: data.response.country_id,
    //     email: data.response.email,
    //     facebook: data.response.facebook,
    //     instagram: data.response.instagram,
    //     whats_app: data.response.whats_app,
    //     name: data.response.name,
    //     phone_number: data.response.phone_number,
    //   };
    //   console.log(company);
    //   // nextStep()
    //   dispatch(saveCompany({company}))
    // }
  };

  const AlreadyGotCompanyHandler = (response: CompanyState) => {
    // const company: CompanyState = {
    //   category_id: response.category_id,
    //   id: response.id,
    //   country_id: response.country_id,
    //   email: response.email,
    //   facebook: response.facebook,
    //   instagram: response.instagram,
    //   whats_app: response.whats_app,
    //   name: response.name,
    //   phone_number: response.phone_number,
    // };
    // console.log(company);
    // // nextStep();
    // dispatch(saveCompany({ company }));
};

  return (
    <Flex
      flexDirection={{ base: "column", sm: "column", md: "row", lg: "row" }}
      pt={{ base: "120px", md: "100px" }}
    >
      <Box
        maxHeight="300px"
        width={{ base: "100%", sm: "40%" }}
        mr={{ sm: "10px", md: "20px" }}
        mb={{ base: "20px" }}
        borderRadius="15px"
        p="1.5rem"
        bg={ cardColor }
        boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
      >
        <Flex alignItems="center">
          <Avatar w="60px" h="60px" mr="5" />

          <Flex flexDirection="column">
            <Text fontWeight="bold">Johnny</Text>
            <Tag
              size="md"
              variant="solid"
              bg="primary"
              color="white"
              borderRadius="50px"
            >
              Basic Plan
            </Tag>
          </Flex>
        </Flex>

        {tabs.map((tab: any) => {
          return (
            <Box>
              <Divider my="5" />
              <Flex
                _hover={{
                  color: "blue.200",
                }}
                color={selectedTab === tab.id ? "primary" : ""}
                alignItems="center"
                cursor="pointer"
                onClick={() => setSelectedTab(tab.id)}
              >
                <Icon as={tab.icon} w="20px" h="20px" mr="3" />
                <Text>{tab.label}</Text>

                <Icon as={FiChevronRight} w="20px" h="20px" ml="auto" />
              </Flex>
            </Box>
          );
        })}
      </Box>


      {selectedTab === 1 ? (

        <PersonalInformation />

      ) : selectedTab === 2 ? (

        <CompanyInformationPage submitForm={OnSubmitCreateCompany} gotCompany={AlreadyGotCompanyHandler} />
        
      ) : (
        <ChangePassword />
      )}
    </Flex>
  );
};

export default ProfilePage;
