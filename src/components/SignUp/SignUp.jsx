import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { MailIcon } from "../ui/MailIcon.jsx";
import { LockIcon } from "../ui/LockIcon.jsx";

export default function SignUp() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const userRegister = () => {
    //TODO: register functionality
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Open Modal
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(userRegister)}>
                  <div className="flex flex-col gap-4">
                    <Input
                      type="text"
                      label="Full name"
                      placeholder="Enter your full name"
                      {...register("fullName", {
                        required: true,
                      })}
                      className="px-2 py-1 rounded-md bg-transparent border-1.5 text-sm font-light outline-none"
                    />
                    <Input
                      type="text"
                      label="Username"
                      placeholder="Enter your username"
                      {...register("username", {
                        required: true,
                      })}
                      className="px-2 py-1 rounded-md bg-transparent border-1.5 text-sm font-light outline-none"
                    />
                    <Input
                      type="email"
                      label="Email"
                      placeholder="Enter your email"
                      {...register("email", {
                        required: true,
                      })}
                      className="px-2 py-1 rounded-md bg-transparent border-1.5 text-sm font-light outline-none"
                    />
                    <Input
                      type="password"
                      label="Password"
                      placeholder="Enter your password"
                      {...register("password", {
                        required: true,
                      })}
                      className="px-2 py-1 rounded-md bg-transparent border-1.5 text-sm font-light outline-none"
                    />
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
