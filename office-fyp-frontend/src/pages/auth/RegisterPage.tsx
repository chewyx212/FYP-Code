import {
  Flex,
  FormControl,
  Input,
  Link,
  Button,
  Heading,
  useColorModeValue,
  FormHelperText,
  useToast,
  Text,
  InputGroup,
  IconButton,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from "react-router";
import { authApi } from "api/AuthApi";
import { FiEyeOff, FiEye } from "react-icons/fi";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

const RegisterPage: React.FC = () => {
  const history = useHistory();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<Boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmPassword, setIsConfirmPassword] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<Inputs>();
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit: SubmitHandler<Inputs> = async (form) => {
    if (form.password !== form.confirm_password) {
      setIsConfirmPassword(false);
    } else {
      setIsConfirmPassword(true);
      setIsSubmitting(true);

      const result = await authApi.userRegister(form);
      console.log(result);
      if (result.status === 201) {
        toast({
          title: "Login Now.",
          description: "Created Successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        history.push("/auth/login");
      } else if (result.status === 409) {
        toast({
          title: "Try again.",
          description: result.data.message,
          status: "info",
          duration: 9000,
          isClosable: true,
        });
      }
      setIsSubmitting(false);
    }
  };

  return (
    <Flex
      h={{ sm: "initial", md: "75vh", lg: "85vh" }}
      w="100%"
      maxW="1044px"
      mx="auto"
      justifyContent="center"
      pt={{ sm: "100px", md: "0px" }}
    >
      <Flex
        alignItems="center"
        justifyContent="start"
        style={{ userSelect: "none" }}
        w={{ base: "100%", md: "50%", lg: "42%" }}
      >
        <Flex
          direction="column"
          w="100%"
          border="2px"
          borderColor="transparent"
          background="transparent"
          borderRadius="15px"
          bg={useColorModeValue("white", "gray.700")}
          boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
          p="48px"
          mt={{ md: "150px", lg: "80px" }}
        >
          <Heading
            color={useColorModeValue("primary", "blue.200")}
            fontSize="32px"
            mb="10px"
          >
            Register
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <Input
                id="email"
                borderRadius="15px"
                fontSize="sm"
                my="5px"
                type="text"
                placeholder="Your email"
                size="lg"
                {...register("email", {
                  required: true,
                })}
              />
              {errors.email && (
                <FormHelperText mt="0" color="red.500">
                  {errors.email.message
                    ? errors.email.message
                    : "Please enter a valid email"}
                </FormHelperText>
              )}
              {/* <FormLabel mt="10px" ms="4px" fontSize="sm" fontWeight="normal">
                Full Name
              </FormLabel> */}
              <Input
                id="password"
                borderRadius="15px"
                fontSize="sm"
                type="text"
                placeholder="Your full name"
                size="lg"
                my="5px"
                {...register("name", {
                  required: true,
                })}
              />
              {errors.name && (
                <FormHelperText mt="0" color="red.500">
                  {errors.name.message
                    ? errors.name.message
                    : "Your full name is required*"}
                </FormHelperText>
              )}
              {/* <FormLabel mt="10px" ms="4px" fontSize="sm" fontWeight="normal">
                Password
              </FormLabel> */}
              <InputGroup size="lg" my="5px">
                <Input
                  id="password"
                  borderRadius="15px"
                  fontSize="sm"
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  {...register("password", {
                    required: true,
                    minLength: 8,
                  })}
                />
                <InputRightElement>
                  <IconButton
                    variant="link"
                    color="blue.500"
                    aria-label="Call Sage"
                    icon={showPassword ? <FiEyeOff /> : <FiEye />}
                    onClick={() => setShowPassword(!showPassword)}
                    _active={{ color: "blue.500" }}
                    _focus={{ color: "blue.500", bg: "none" }}
                  />
                </InputRightElement>
              </InputGroup>
              {errors.password && (
                <FormHelperText mt="0" color="red.500">
                  {errors.password.message
                    ? errors.password.message
                    : "Minimum eight characters"}
                </FormHelperText>
              )}
              {/* <FormLabel mt="10px" ms="4px" fontSize="sm" fontWeight="normal">
                Confirm Password
              </FormLabel> */}
              <InputGroup my="5px" size="lg">
                <Input
                  id="password2"
                  borderRadius="15px"
                  fontSize="sm"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Your password"
                  {...register("confirm_password", {
                    required: true,
                    minLength: 8,
                  })}
                />

                <InputRightElement>
                  <IconButton
                    variant="link"
                    color="blue.500"
                    aria-label="Call Sage"
                    icon={showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    _active={{ color: "blue.500" }}
                    _focus={{ color: "blue.500", bg: "none" }}
                  />
                </InputRightElement>
              </InputGroup>
              {errors.confirm_password && (
                <FormHelperText mt="0" color="red.500">
                  This field is required*
                </FormHelperText>
              )}
              {!isConfirmPassword && (
                <FormHelperText mt="0" color="red.500">
                  The password does not match with previous one
                </FormHelperText>
              )}
              {isSubmitting ? (
                <Button
                  fontSize="16px"
                  disabled
                  bg="none"
                  w="100%"
                  h="45"
                  mb="20px"
                  borderColor="primary"
                  color="primary"
                  mt="20px"
                  _hover={{
                    bg: "blue.200",
                  }}
                  _active={{
                    bg: "blue.400",
                  }}
                >
                  Registering...
                </Button>
              ) : (
                <Button
                  fontSize="16px"
                  type="submit"
                  bg="primary"
                  w="100%"
                  h="45"
                  mb="20px"
                  color="white"
                  mt="20px"
                  _hover={{
                    bg: "blue.200",
                  }}
                  _active={{
                    bg: "blue.400",
                  }}
                >
                  REGISTER
                </Button>
              )}
            </FormControl>
          </form>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            maxW="100%"
            mt="0px"
          >
            <Text
              color={useColorModeValue("gray.400", "white")}
              fontWeight="medium"
            >
              Already have an account?
              <Link
                color={useColorModeValue("primary", "blue.200")}
                as="span"
                ms="5px"
                onClick={() => {
                  history.push("/auth/login");
                }}
                fontWeight="bold"
              >
                Login
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RegisterPage;
