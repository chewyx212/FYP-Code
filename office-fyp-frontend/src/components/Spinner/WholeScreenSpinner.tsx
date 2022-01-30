import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";
const WholeScreenSpinner: React.FC = (params) => {
  return (
    <>
      <Flex
        justifyContent="center"
        alignItems="center"
        zIndex="999"
        position="absolute"
        top=" 40%"
        left=" 50%"
        transform=" translateX(-50%) translateY(-50%)"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    </>
  );
};

export default WholeScreenSpinner;
