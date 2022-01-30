import { Flex, Text, Img, useToast, Button } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import React, { useState } from "react";
import { useHistory } from "react-router";
import CreateCompanyForm from "components/onboarding/CreateCompanyForm";
import { CompanyApi } from "api/CompanyApi";
import { CompanyState, CreateCompanyType } from "types/CompanyType";
import { useAppDispatch } from "app/hooks";
import { saveCompany } from "app/company/companySlice";
import CreateBranchForm from "components/onboarding/CreateBranchForm";

const OnboardingPage = () => {
  const toast = useToast();
  const history = useHistory();
  const { nextStep, prevStep, activeStep } = useSteps({
    initialStep: 0,
  });

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "100px" }}>
      <Steps colorScheme="twitter" activeStep={activeStep} mb="50px">
        <Step label="Step 1" description="Company Information">
          <CreateCompanyForm nextStep={nextStep} />
        </Step>

        <Step label="Step 2" description="Add Branch">
          <CreateBranchForm nextStep={nextStep} />
        </Step>
        <Step label="Step 3" description="Start Now!">
          <Flex direction="column" justify="center" align="center">
            <Img src="step-3.svg" boxSize="400px" />
            <Text fontWeight="bold">Congrats! You have done the steps! </Text>
            <Button
              w="full"
              borderColor="primary"
              color="primary"
              variant="outline"
              onClick={() => history.push("/")}
              mt={8}
              py={6}
            >
              Get Started
            </Button>
          </Flex>
        </Step>
      </Steps>

      {/* <Stack justifyContent="right" direction="row" spacing={4} mt="5">
        {activeStep != 0 && (
          <Button
            leftIcon={<ArrowBackIcon />}
            color="primary"
            borderColor="primary"
            variant="outline"
            onClick={prevStep}
          >
            Back
          </Button>
        )}

        {activeStep === 2 ? (
          <Button
            // rightIcon={<ArrowForwardIcon />}
            color="white"
            bg="primary"
            _hover={{
              bg: "blue.200",
            }}
            _active={{
              bg: "blue.400",
            }}
            variant="solid"
            onClick={() => history.push("/dashboard")}
          >
            Done
          </Button>
        ) : (
          <Button
            rightIcon={<ArrowForwardIcon />}
            color="white"
            bg="primary"
            _hover={{
              bg: "blue.200",
            }}
            _active={{
              bg: "blue.400",
            }}
            variant="solid"
            onClick={nextStep}
          >
            Next
          </Button>
        )}
      </Stack> */}
    </Flex>
  );
};

export default OnboardingPage;
