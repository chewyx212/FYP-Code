import {
  Box,
  Heading,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Stack,
  useToast,
  Flex,
  FormLabel,
  Button,
  Select,
  Image,
  Img,
  Avatar,
  AvatarBadge,
  Divider,
  FormControl,
  Icon,
  Input,
  useColorModeValue,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  CheckCircleIcon,
  EmailIcon,
} from "@chakra-ui/icons";
import { useHistory } from "react-router";
import FileUploader from "components/FileUploader/FileUploader";
import { FiCamera } from "react-icons/fi";
import { CompanyApi } from "api/CompanyApi";
import { useForm, SubmitHandler } from "react-hook-form";
import { CreateCompanyType } from "types/CompanyType";
import { useAppDispatch } from "app/hooks";
import { logout } from "app/auth/authSlice";

const content = <Flex py={4}>a</Flex>;
type CategoryType = {
  id: number;
  name: string;
  description: string;
};
type CountryType = {
  id: number;
  name: string;
  calling_code: string;
};

type IProps = {
  submitForm: Function;
  gotCompany: Function;
};
const CreateCompanyForm: React.FC<IProps> = ({ submitForm, gotCompany }) => {
  let cardColor = useColorModeValue("white", "gray.700");

  const history = useHistory();

  const avatarRef = useRef<any>(null);

  const [file, setFile] = useState(null);
  const [companyCategory, setCompanyCategory] = useState<CategoryType[]>([]);
  const [companyId, setCompanyId] = useState<number>();
  const [countryList, setCountryList] = useState<CountryType[]>([]);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<CreateCompanyType>();
  useEffect(() => {
    getCategoryAndCountryList();
    getCompany();
  }, []);

  const getCategoryAndCountryList = async () => {
    const result = await CompanyApi.getCategoryAndCategory();
    if (result.data.status === 0) {
      if (
        result.data.response.categories &&
        result.data.response.categories.length > 0
      ) {
        setCompanyCategory(result.data.response.categories);
      }
      if (
        result.data.response.countries &&
        result.data.response.countries.length > 0
      ) {
        setCountryList(result.data.response.countries);
      }
    } else if (result.status === 401) {
      toast({
        title: "Please Login",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
      dispatch(logout());
    }
  };

  const getCompany = async () => {
    // const result = await CompanyApi.getCompanyDetail();
    // if (result.data.status === 0 && result.data.response) {
    //   // setValue("name", "value", { shouldDirty: true });
    //   setCompanyId(result.data.response.id);
    //   setValue("size", parseInt(result.data.response.category_id), {
    //     shouldDirty: true,
    //   });
    //   setValue("name", result.data.response.name, { shouldDirty: true });
    //   setValue("email", result.data.response.email, { shouldDirty: true });
    //   getCategoryAndCountryList();
    //   console.log(result.data.response);
    // } else if (result.status === 401) {
    //   dispatch(logout());
    // }
  };

  const onSubmit: SubmitHandler<CreateCompanyType> = async (form) => {
    console.log(form);
    if (companyId) {
      const result = await CompanyApi.EditCompanyDetail(companyId, form);
      console.log(result);
      if (result.data.status === 0) {
        toast({
          title: "Edit Successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };
  return (
    <Box
      width="100%"
      borderRadius="15px"
      p="1.5rem"
      bg={cardColor}
      boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
    >
      <Heading as="h4" size="md">
        Company Information
      </Heading>
      <Divider my="1.5rem" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Flex justifyContent="center">
            <Avatar w="100px" h="100px">
              <AvatarBadge
                cursor="pointer"
                borderWidth="0.5px"
                borderColor="gray.200"
                boxSize="2em"
                bg="white"
                onClick={() => {
                  avatarRef.current.click();
                }}
              >
                <Input type="file" display="none" ref={avatarRef} />
                <Icon as={FiCamera} color="grey" />
              </AvatarBadge>
            </Avatar>
          </Flex>

          <SimpleGrid mt="10" columns={{ base: 1, md: 2 }} spacing={10}>
            <Box>
              <FormLabel>Company Name</FormLabel>
              <Input
                borderRadius="15px"
                fontSize="sm"
                mb="5px"
                type="text"
                placeholder="Company Name"
                size="lg"
                {...register("name", { required: true })}
              />
            </Box>

            <Box>
              <FormLabel>Email</FormLabel>
              <Input
                borderRadius="15px"
                fontSize="sm"
                mb="5px"
                type="email"
                placeholder="Company Email"
                size="lg"
                {...register("email", { required: true })}
              />
            </Box>
          </SimpleGrid>
        </FormControl>
        <Button
          fontSize="16px"
          type="submit"
          bg="primary"
          w="100%"
          h="45"
          mt="40px"
          color="white"
          _hover={{
            bg: "blue.200",
          }}
          _active={{
            bg: "blue.400",
          }}
        >
          Edit
        </Button>
      </form>
    </Box>
  );
};

export default CreateCompanyForm;
