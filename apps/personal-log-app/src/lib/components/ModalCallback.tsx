'use client';

import {
    Button,
    ButtonProps,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from '@nextui-org/react';

import React from 'react';

type ModalCallbackProps = {
    triggerButtonProps?: ButtonProps;
    triggerButtonChildren: React.ReactNode;
    actionButtonProps?: ButtonProps;
    actionButtonChildren: React.ReactNode;
    callback: () => Promise<void>;
    modalContent: React.ReactNode;
};

export default function ModalCallback({
    triggerButtonProps,
    triggerButtonChildren,
    actionButtonProps,
    actionButtonChildren,
    callback,
    modalContent,
}: ModalCallbackProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen} type="button" {...triggerButtonProps}>
                {triggerButtonChildren}
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Modal Title
                            </ModalHeader>
                            <ModalBody>{modalContent}</ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>

                                <form action={callback}>
                                    <Button
                                        type="submit"
                                        {...actionButtonProps}
                                    >
                                        {actionButtonChildren}
                                    </Button>
                                </form>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
