import { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { login, logout } from "app/auth/authSlice";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import { useAppDispatch, useAppSelector } from "app/hooks";
import theme from "theme/theme";

export const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isAuth = useAppSelector((state) => state.auth.isLoggedIn);
  // const isAuth = true;
  console.log("isAuth " + isAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    if (!isAuth) {
      const token = localStorage.getItem("user_token");
      const userString = localStorage.getItem("user_info");
      let user;

      if (userString) {
        user = JSON.parse(userString);
      }
      if (token && user) {
        console.log(user, token);
        dispatch(login({ token, user }));
      } else {
        dispatch(logout());
      }
    }

    setIsLoading(false);
  }, []);

  return (
    <ChakraProvider theme={theme}>
      {!isLoading && (isAuth ? <PrivateRoute /> : <PublicRoute />)}
    </ChakraProvider>
  );
};
