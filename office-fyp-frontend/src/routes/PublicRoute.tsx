import { Box } from "@chakra-ui/react";
import LoginPage from "pages/auth/LoginPage";
import RegisterPage from "pages/auth/RegisterPage";
import { Redirect, Route, Switch } from "react-router-dom";

const PublicRoute = () => {
  return (
    <Box w="100%">
      <Switch>
        <Route exact path={`/auth/login`} component={LoginPage} />
        <Route exact path={`/auth/register`} component={RegisterPage} />
        <Redirect from={`/`} to="/auth/login" />
      </Switch>
    </Box>
  );
};

export default PublicRoute;
