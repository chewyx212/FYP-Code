import { Box } from "@chakra-ui/react";
import Sidebar from "components/Sidebar/Sidebar";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import Navbar from "components/Navbar/Navbar";
import routes from "routes";
import classes from "./PrivateRoute.module.css";
const PrivateRoute = () => {
  let location = useLocation();
  let activeRoute = routes.find(
    (route) => route.layout + route.path === location.pathname
  );
  console.log(activeRoute);
  return (
    <Box w="100%">
      <Sidebar />
      <Box
        className={activeRoute && !activeRoute.showSide ? classes.hidenav : ""}
        w={{
          base: "100%",
          xl: "calc(100% - 275px)",
        }}
        float="right"
        maxWidth="100%"
        overflow="auto"
        position="relative"
        maxHeight="100%"
        transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
        transitionDuration=".2s, .2s, .35s"
        transitionProperty="top, bottom, width"
        transitionTimingFunction="linear, linear, ease"
      >
        <Navbar />
        <Box p="30px 15px" minH="calc(100vh - 123px)">
          <Box ms="auto" me="auto" ps="15px" pe="15px">
            <Switch>
              {routes.map((route, key) => {
                return (
                  <Route
                    exact
                    path={route.layout + route.path}
                    component={route.component}
                    key={key}
                  />
                );
              })}
              <Redirect from={`/`} to="/" />
            </Switch>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PrivateRoute;
