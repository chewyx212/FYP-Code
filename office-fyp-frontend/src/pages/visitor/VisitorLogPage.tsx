import {
  Flex,
  Button,
  Heading,
  useToast,
  Text,
  Box,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Badge,
  Icon,
  useColorModeValue,
  Spinner,
  FormHelperText,
  FormLabel,
  Input,
  FormControl,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  Switch,
} from "@chakra-ui/react";
import { VisitorApi } from "api/VisitorApi";
import { logout } from "app/auth/authSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import moment from "moment";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { FiEdit2 } from "react-icons/fi";
import QRCode from "react-qr-code";
import { useHistory } from "react-router-dom";
import { RoomType } from "types/RoomType";

const VisitorPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openQRModal, setOpenQRModal] = useState<boolean>(false);
  const [visitorLog, setVisitorLog] = useState<any[]>([]);
  let cardColor = useColorModeValue("white", "gray.700");
  let borderColor = useColorModeValue("transparent", "gray.600");
  const history = useHistory();
  const dispatch = useAppDispatch();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const selectedBranch = useAppSelector(
    (state) => state.company.selectedBranch
  );
  useEffect(() => {
    getAllVisitor();
  }, []);

  const getAllVisitor = async () => {
    setIsLoading(true);
    if (selectedBranch) {
      const result = await VisitorApi.getAllVisitor(selectedBranch);
      if (result.status === 200 && result.data) {
        if (result.data.length > 0) {
          setVisitorLog(result.data);
        }
      } else if (result.status === 200) {
        history.push("/onboarding");
      } else if (result.status === 401) {
        dispatch(logout());
      } else if (result.status === 404) {
      }
    } else {
      history.push("/dashboard");
    }

    setIsLoading(false);
  };

  const onGenerate = () => {
    setOpenQRModal(true);
  };

  return (
    <>
      {isLoading ? (
        <Flex
          pt={{ base: "120px", md: "100px" }}
          h="100%"
          w="100%"
          justify="center"
        >
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Flex flexDirection="column" pt={{ base: "120px", md: "100px" }}>
          <>
            <Flex direction="row" justify="space-between" align="center">
              <Heading as="h4" size="md">
                Visitor Log
              </Heading>
              <Button
                colorScheme="blue"
                size="md"
                w="200px"
                onClick={onGenerate}
              >
                Generate Check In QR
              </Button>
            </Flex>
            <Box
              overflow="auto"
              border="1px"
              borderColor={borderColor}
              mt="5"
              borderRadius="20px"
              p="1.5rem"
              bg={cardColor}
              boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
            >
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>No</Th>
                    <Th>Name</Th>
                    <Th>Time</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {visitorLog.length > 0 &&
                    visitorLog.map((visitor: any, index: number) => {
                      return (
                        <Tr key={visitor.id}>
                          <Td>{index + 1}</Td>
                          <Td>{visitor.user.name}</Td>
                          <Td>{moment(visitor.createDate).toLocaleString()}</Td>
                        </Tr>
                      );
                    })}
                </Tbody>
              </Table>
            </Box>
          </>

          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={openQRModal}
            onClose={() => setOpenQRModal(false)}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Check In QR</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6} alignItems="center">
                <QRCode value={selectedBranch} />
              </ModalBody>
            </ModalContent>
          </Modal>
        </Flex>
      )}
    </>
  );
};

export default VisitorPage;
