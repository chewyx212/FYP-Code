import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Button,
  Heading,
  useColorModeValue,
  FormHelperText,
  useToast,
  Text,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from "react-router";
import { login } from "app/auth/authSlice";
import { LoginForm } from "types/AuthType";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { authApi } from "api/AuthApi";
import { useAppDispatch } from "app/hooks";

type Inputs = {
  login_credential: string;
  password: string;
};

const LoginPage = () => {
  const history = useHistory();
  const toast = useToast();
  const [show, setShow] = useState<Boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const dispatch = useAppDispatch();

  const handleClick = () => setShow(!show);

  const onSubmit: SubmitHandler<Inputs> = async (form) => {
    setIsSubmitting(true);
    const payload: LoginForm = {
      email: form.login_credential,
      password: form.password,
    };
    const result = await authApi.userLogin(payload);
    if (result.status === 201) {
      console.log(result.data);
      dispatch(login({ token: result.data.token, user: result.data.user }));
      setIsSubmitting(false);

      history.push("/");
    }
    if (result.status === 401) {
      toast({
        title: "Login Failed.",
        description: "Please check your login credential again.",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    }
    // if (data.status === 702) {
    //   if (data.response.length > 0) {
    //     dispatch(login({ token: data.response[1], user: data.response[0] }));
    //     setIsSubmitting(false);

    //     history.push("/");
    //   }
    // } else if (data.status === 703) {
    //   setIsSubmitting(false);
    //   toast({
    //     title: data.message,
    //     status: "warning",
    //     duration: 9000,
    //     isClosable: true,
    //   });
    // }
    // } else if (data.status === 701) {
    //   setIsSubmitting(false);
    //   toast({
    //     title: data.message,
    //     status: "warning",
    //     duration: 9000,
    //     isClosable: true,
    //   });
    // } else {
    //   setIsSubmitting(false);
    //   toast({
    //     title: "Something wrong, Try again later",
    //     status: "warning",
    //     duration: 9000,
    //     isClosable: true,
    //   });
    // }
    setIsSubmitting(false);
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
            Login
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={useColorModeValue("gray.400", "white")}
            fontWeight="bold"
            fontSize="16px"
          >
            Enter your email and password to sign in.
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <Input
                id="login_credential"
                borderRadius="15px"
                fontSize="sm"
                my="5px"
                type="text"
                placeholder="Your email"
                size="lg"
                {...register("login_credential", { required: true })}
              />
              {errors.login_credential && (
                <FormHelperText mt="0" color="red.500">
                  This field is required
                </FormHelperText>
              )}

              <InputGroup my="5px" size="lg">
                <Input
                  id="password"
                  type={show ? "text" : "password"}
                  borderRadius="15px"
                  placeholder="Your password"
                  fontSize="sm"
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
                    icon={show ? <FiEyeOff /> : <FiEye />}
                    onClick={handleClick}
                    _active={{ color: "blue.500" }}
                    _focus={{ color: "blue.500", bg: "none" }}
                  />
                </InputRightElement>
              </InputGroup>
              {errors.password && (
                <FormHelperText mt="0" color="red.500">
                  Minimum eight characters*
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
                  Loging in...
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
                  SIGN IN
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
              Don't have an account?
              <Link
                color={useColorModeValue("primary", "blue.200")}
                as="span"
                ms="5px"
                onClick={() => {
                  history.push("/auth/register");
                }}
                fontWeight="bold"
              >
                Sign Up
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
