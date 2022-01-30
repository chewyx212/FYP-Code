import {
  Box,
  Heading,
  SimpleGrid,
  FormLabel,
  Button,
  FormHelperText,
  Divider,
  FormControl,
  Input,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "app/hooks";
import { logout } from "app/auth/authSlice";
import { BranchApi } from "api/BranchApi";
import { BranchState, CreateBranchType } from "types/BranchType";
import { saveCompanyBranch } from "app/company/companySlice";

type IProps = {
  nextStep: Function;
};

const CreateBranchForm: React.FC<IProps> = ({ nextStep }) => {
  let cardColor = useColorModeValue("white", "gray.700");

  const toast = useToast();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateBranchType>();
  useEffect(() => {
    getBranch();
  }, []);

  const getBranch = async () => {
    const result = await BranchApi.getAllBranch();
    if (result.status === 200 && result.data && result.data.length > 0) {
      const branchs: BranchState[] = result.data;
      console.log(branchs);
      console.log("already got");
      nextStep();
      dispatch(saveCompanyBranch({ branchs }));
    } else if (result.status === 401) {
      dispatch(logout());
    }
  };

  const onSubmit: SubmitHandler<CreateBranchType> = async (form) => {
    const result = await BranchApi.postCompanyBranch(form);
    console.log(result);
    if (result.status === 201) {
      const branch: BranchState = {
        id: result.data.id,
        name: result.data.name,
        address: result.data.address,
      };
      console.log(branch);
      nextStep();
      dispatch(saveCompanyBranch({ branchs: [branch] }));
    } else if (result.status === 409) {
      toast({
        title: "Submission Failed.",
        description: result.data.message,
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Create Company Failed.",
        description: "Something wrong! Try again later.",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
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
        Create your first branch!
      </Heading>
      <Divider my="1.5rem" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <SimpleGrid mt="10" columns={{ base: 1 }} spacing={10}>
            <Box>
              <FormLabel>Branch Name</FormLabel>
              <Input
                borderRadius="15px"
                fontSize="sm"
                mb="5px"
                type="text"
                placeholder="Branch Name"
                size="lg"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <FormHelperText mt="0" color="red.500">
                  This field is required
                </FormHelperText>
              )}
            </Box>

            <Box>
              <FormLabel>Address</FormLabel>
              <Input
                borderRadius="15px"
                fontSize="sm"
                mb="5px"
                type="text"
                placeholder="Branch Address"
                size="lg"
                {...register("address", { required: true })}
              />
              {errors.address && (
                <FormHelperText mt="0" color="red.500">
                  This field is required
                </FormHelperText>
              )}
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
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default CreateBranchForm;
