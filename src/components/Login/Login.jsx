import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Link,
} from "@nextui-org/react";
import { MailIcon } from "../ui/MailIcon.jsx";
import { LockIcon } from "../ui/LockIcon.jsx";
import { useForm } from "react-hook-form";
import Input from "../Input/Input.jsx";

export default function Login() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { register, handleSubmit } = useForm();

  const userLogin = () => {
    //TODO: login functionality
  };

  return (
    <>
      <Button onPress={onOpen} color="danger" variant="flat">
        Please login
      </Button>
      <Modal
        className="bg-zinc-800 text-zinc-200"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(userLogin)}>
                  <div className="my-3">
                    <MailIcon />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...register("email", {
                        required: true,
                      })}
                      className="px-2 py-1 rounded-md bg-transparent border-1.5 text-sm font-light outline-none"
                    />
                  </div>
                  <div className="my-3">
                    <LockIcon />
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...register("password", {
                        required: true,
                      })}
                      className="px-2 py-1 rounded-md bg-transparent border-1.5 text-sm font-light outline-none"
                    />
                  </div>
                </form>
                <div className="flex py-2 px-1 justify-between">
                  <Link color="primary" href="#" size="sm">
                    Forgot password ?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  variant="flat"
                  onPress={onClose}
                >
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
