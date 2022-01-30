import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, Button } from '@chakra-ui/react'
import React from 'react'

type Props = {
    onClose: () => void,
    isOpen: boolean,
    title: String,
    description: String,
    cancelRef: any
}

const DeleteDialog = ({ onClose, isOpen, title, description, cancelRef }: Props) => {
    return (
        <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={ onClose }
            isOpen={ isOpen }
            isCentered
        >
            <AlertDialogOverlay />

            <AlertDialogContent>
            <AlertDialogHeader>{ title }</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
                { description}
            </AlertDialogBody>
            <AlertDialogFooter>
                <Button ref={cancelRef} onClick={ onClose }>
                    No
                </Button>
                <Button colorScheme="red" ml={3}>
                    Yes
                </Button>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteDialog
