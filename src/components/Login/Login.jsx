import React, { useState } from "react";
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

import { useDispatch } from "react-redux";
import { login as authLogin } from "../../store/authSlice.js";

export default function Login() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const userLogin = async (formData) => {
    //TODO: login functionality
    setError("");
    try {
      const response = await fetch("http://localhost:8000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      const userData = responseData.data.user;

      if (userData) {
        dispatch(authLogin({ userData }));
      }
    } catch (error) {
      console.error("Error during login: ", error);
      setError(error.message);
    }
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
        <form onSubmit={handleSubmit(userLogin)}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Log in
                </ModalHeader>
                <ModalBody>
                  <div className="my-1">
                    <Input
                      type="text"
                      placeholder="Enter your username"
                      {...register("username", {
                        required: true,
                      })}
                      className="px-2 py-1 rounded-md bg-transparent border-1.5 text-sm font-light outline-none"
                    />
                  </div>
                  <div className="my-1">
                    <div className="my-1">
                      <MailIcon />
                    </div>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...register("email", {
                        required: true,
                      })}
                      className="px-2 py-1 rounded-md bg-transparent border-1.5 text-sm font-light outline-none"
                    />
                  </div>
                  <div className="my-1">
                    <div className="my-1">
                      <LockIcon />
                    </div>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...register("password", {
                        required: true,
                      })}
                      className="px-2 py-1 rounded-md bg-transparent border-1.5 text-sm font-light outline-none"
                    />
                  </div>
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
        </form>
      </Modal>
    </>
  );
}
