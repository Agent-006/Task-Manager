import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  cn,
  Kbd,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { EditDocumentIcon } from "../ui/EditDocumentIcon.jsx";
import { DeleteDocumentIcon } from "../ui/DeleteDocumentIcon.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setTrue, setFalse } from "../../store/authSlice.js";
import { useForm } from "react-hook-form";
import Input from "../Input/Input.jsx";
import TextArea from "../TextArea/TextArea.jsx";

export default function CardDropdown({ taskId }) {
  const { register, handleSubmit } = useForm();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("opaque");

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.userData);

  const deleteTask = async () => {
    //TODO: delete functionality
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.accessToken}`,
          },
        }
      );

      if (response.ok) {
        dispatch(setTrue());
        setTimeout(() => {
          dispatch(setFalse());
        }, 500);
      } else {
        console.error(
          "Something went wrong while deleting the task :: server error"
        );
      }
    } catch (error) {
      throw new Error(
        500,
        "Internal server error :: error while deleting the task"
      );
    }
  };

  const editTask = () => {
    //TODO: edit task functionality
  };

  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <Dropdown closeOnSelect={false} className="bg-zinc-900/95 text-white">
      <DropdownTrigger>
        <Kbd className="cursor-pointer" keys={["option"]}></Kbd>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
        <DropdownItem
          className="z-[99]"
          onPress={() => handleOpen("blur")}
          key="edit"
          startContent={<EditDocumentIcon className={iconClasses} />}
        >
          Edit file
          <Modal
            className="bg-zinc-800 text-zinc-200"
            backdrop={backdrop}
            isOpen={isOpen}
            onClose={onClose}
          >
            <form onSubmit={handleSubmit(editTask)}>
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
        </DropdownItem>
        <DropdownItem
          onClick={deleteTask}
          key="delete"
          className="text-danger"
          color="danger"
          startContent={
            <DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />
          }
        >
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
