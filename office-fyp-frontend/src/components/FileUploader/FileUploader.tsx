import { CheckCircleIcon } from "@chakra-ui/icons";
import React, { Dispatch, ReactNode, useCallback } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import {
  Img,
  Input,
  useColorModeValue,
  Text,
  List,
  ListItem,
  ListIcon,
  Box,
    VStack,
  Flex,
} from "@chakra-ui/react";

const FileUploader: React.FC<{ setFile: Dispatch<any> }> = ({ setFile }) => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    setFile(acceptedFiles[0]);
  }, []);

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    multiple: false,
    accept: ".jpg, .jpeg, .png, .pdf",
  });

  const fileList = (files: FileWithPath[]): ReactNode =>
    files.map((file) => (
      <List key={file.path}>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          {file.path}
        </ListItem>
      </List>
    ));
  return (
    <Flex flexDirection="column">
      <Box
        {...getRootProps()}
        width="330px"
        height="250px"
        p="5"
        cursor="pointer"
        borderRadius="20px"
        bg="white"
        boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
      >
        <input {...getInputProps()} />
        <Box
          textAlign="center"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          h="80%"
          border="1px"
          borderStyle="dashed"
          borderRadius="20px"
          borderColor={
            isDragReject ? "red.500" : isDragAccept ? "green.500" : "primary"
          }
        >
          <Img boxSize="50px" src="folder.png" />

          {isDragReject ? (
            <Text fontWeight="bold" fontSize="sm">
              Sorry, only *.jpeg, *.png & *.pdf will be accepted{" "}
            </Text>
          ) : (
            <div>
              <Text fontWeight="bold" fontSize="sm">
                Drag & Drop Files Here
              </Text>
              <Text fontSize="sm">
                Only *.jpeg, *.png & *.pdf will be accepted
              </Text>
            </div>
          )}
        </Box>

        <Box mt="4" textAlign="center">
          <Text fontSize="sm">{fileList(acceptedFiles)}</Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default FileUploader;
