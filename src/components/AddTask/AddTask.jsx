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

import { useForm } from "react-hook-form";
import Input from "../Input/Input";
import TextArea from "../TextArea/TextArea";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setTrue, setFalse } from "../../store/authSlice";

export default function AddTask() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userData = useSelector((state) => state.auth.userData);

  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("opaque");

  const backdrops = ["blur"];

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  const { register, handleSubmit } = useForm();

  const addTask = async (formData) => {
    //TODO: add addTask functionality
    try {
      const { accessToken } = userData;
      const response = await fetch("http://localhost:8000/api/v1/tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Task added successfully");
        dispatch(setTrue());
        setTimeout(() => {
          dispatch(setFalse());
        }, 500);
      } else {
        console.error(
          "Something went wrong while adding the task :: server error"
        );
      }
    } catch (error) {
      throw new Error(500, "Internal Server Error :: Error while adding task");
    }
  };

  return (
    isLoggedIn && (
      <>
        <div className="flex flex-wrap gap-3">
          {backdrops.map((b) => (
            <Button
              key={b}
              variant="flat"
              onPress={() => handleOpen(b)}
              className="capitalize bg-zinc-700 text-zinc-200"
            >
              Add Task
            </Button>
          ))}
        </div>
        <Modal
          className="bg-zinc-800 text-zinc-200"
          backdrop={backdrop}
          isOpen={isOpen}
          onClose={onClose}
        >
          <form onSubmit={handleSubmit(addTask)}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Modal Title
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      type="text"
                      label="Title"
                      placeholder="Enter task title"
                      {...register("title", {
                        required: true,
                        maxLength: 15,
                      })}
                      className="px-2 py-1 rounded-md bg-transparent border-1.5 text-sm font-light outline-none"
                    />
                    <Input
                      type="text"
                      label="Description"
                      placeholder="Enter a small task description"
                      {...register("description", {
                        required: true,
                        maxLength: 30,
                      })}
                      className="px-2 py-1 rounded-md bg-transparent border-1.5 text-sm font-light outline-none"
                    />
                    <TextArea
                      label="Content"
                      className="px-2 py-1 rounded-md bg-transparent border-1.5 text-sm font-light outline-none"
                      placeholder="Enter your task details here"
                      {...register("content", {
                        required: true,
                      })}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      color="primary"
                      variant="light"
                      onPress={onClose}
                    >
                      Add
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </form>
        </Modal>
      </>
    )
  );
}
