import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { MailIcon } from "../ui/MailIcon.jsx";
import { LockIcon } from "../ui/LockIcon.jsx";
import { useForm } from "react-hook-form";
import Input from "../Input/Input.jsx";

export default function SignUp() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { register, handleSubmit } = useForm();

  const userRegister = async (formData) => {
    //TODO: register functionality
    try {
      const form = new FormData();

      form.append("fullName", formData.fullName);
      form.append("username", formData.username);
      form.append("email", formData.email);
      form.append("password", formData.password);
      form.append("avatar", formData.avatar[0]);

      const response = await fetch(
        "http://localhost:8000/api/v1/users/register",
        {
          method: "POST",
          body: form,
        }
      );

      if (response.ok) {
        console.log("Registered user successfully");
      } else {
        console.error("Register failed");
      }
    } catch (error) {
      console.error("Error during login: ", error);
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="primary" variant="flat">
        Register
      </Button>
      <Modal
        className="bg-zinc-800 text-zinc-200"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <form onSubmit={handleSubmit(userRegister)}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Register
                </ModalHeader>
                <ModalBody>
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
                    <Input
                      type="file"
                      label="Avatar"
                      accept="image/png, image/jpg, image/jpeg, image/gif"
                      {...register("avatar", {
                        required: true,
                      })}
                      className="px-2 py-1 rounded-md bg-transparent border-1.5 text-sm font-light outline-none"
                    />
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
                    Register
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
