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

export default function AddTask() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("opaque");

  const backdrops = ["Add Task"];

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  const { register, handleSubmit } = useForm();

  const addTask = () => {
    //TODO: add addTask functionality
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {backdrops.map((b) => (
          <Button
            key={b}
            variant="flat"
            onPress={() => handleOpen(b)}
            className="capitalize bg-zinc-700 text-zinc-200"
          >
            {b}
          </Button>
        ))}
      </div>
      <Modal
        className="bg-zinc-800 text-zinc-200"
        backdrop={backdrop}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(addTask)}>
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
                </form>
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
      </Modal>
    </>
  );
}
