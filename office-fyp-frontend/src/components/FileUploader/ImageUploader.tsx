import { AddIcon, CheckCircleIcon } from "@chakra-ui/icons";
import {
  List,
  ListItem,
  ListIcon,
  Flex,
  Box,
} from "@chakra-ui/layout";
import React, {
  Dispatch,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Img, useColorModeValue } from "@chakra-ui/react";

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

type File = {
  name: any;
  preview: any;
};

const ImageUploader: React.FC<{ setFile: Dispatch<any> }> = ({ setFile }) => {
  let cardColor = useColorModeValue("gray.50", "gray.800");
  let iconColor = useColorModeValue("gray.300", "gray.600");

  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);

    setFiles(
      acceptedFiles.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    multiple: true,
    accept: "image/*",
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

  const thumbs = files.map((file) => (
    <Box
      key={file.name}
      display="inline-flex"
      borderRadius="2"
      w="150px"
      h="150px"
      p="4"
      boxSizing="border-box"
    >
      <Box display="flex" minWidth="0" overflow="hidden">
        <Img src={file.preview} display="block" width="auto" height="100%" />
      </Box>
    </Box>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <Flex flexDirection="column">
      <Box
        {...getRootProps()}
        width="250px"
        height="250px"
        p="5"
        cursor="pointer"
        borderRadius="20px"
        bg={cardColor}
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
          {files && files.length > 0 ? (
            <Box display="flex" flexDirection="row" flexWrap="wrap">
              {thumbs}
            </Box>
          ) : (
            <AddIcon fontSize="40px" color={iconColor} />
          )}
        </Box>
      </Box>
    </Flex>
  );
};

export default ImageUploader;
