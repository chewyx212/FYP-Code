import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button } from '@chakra-ui/react'
import { logout } from 'app/auth/authSlice'
import { useDispatch } from "react-redux";
import React from 'react'

type Props = {
    onClose: () => void,
    isOpen: boolean,
    cancelRef: any
}

const LogoutDialog = ({ onClose, isOpen, cancelRef }: Props) => {

    const dispatch = useDispatch();

    return (
        <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={ onClose }
        isOpen={ isOpen }
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Logout
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure to logout?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button 
                colorScheme="red" 
                onClick={() => {
                  dispatch(logout() )
                }} 
                ml={3}
              >
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    )
}

export default LogoutDialog
