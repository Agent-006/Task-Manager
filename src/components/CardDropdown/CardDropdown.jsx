import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { setTrue, setFalse } from "../../store/authSlice.js";
import { useForm } from "react-hook-form";
import Input from "../Input/Input.jsx";
import TextArea from "../TextArea/TextArea.jsx";
import { Pencil, Trash2 } from "lucide-react";

export default function CardDropdown({ ...task }) {
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
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/tasks/${task._id}`,
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

  const editTask = async (formData) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/tasks/${task._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.accessToken}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        dispatch(setTrue());
        setTimeout(() => {
          dispatch(setFalse());
        }, 500);
      } else {
        console.error(
          "Something went wrong while editing the task :: server error"
        );
      }
    } catch (error) {
      throw new Error(
        500,
        "Internal server error :: error while editing the task"
      );
    }
  };

  return (
    <div className="flex gap-3">
      <Dropdown className="bg-zinc-800" backdrop="blur">
        <DropdownTrigger>
          <Trash2 className="w-5 cursor-pointer" />
        </DropdownTrigger>
        <DropdownMenu
          className="bg-zinc-800"
          variant="faded"
          aria-label="Static Actions"
        >
          <DropdownItem
            onClick={deleteTask}
            key="delete"
            className="text-danger bg-zinc-800"
            color="danger"
            variant="flat"
          >
            Delete file
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <div
        onClick={() => handleOpen("blur")}
        className="flex cursor-pointer flex-wrap gap-3"
      >
        <Pencil className="w-5" />
      </div>
      <Modal
        className="bg-zinc-800 text-zinc-200"
        backdrop={"blur"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <form onSubmit={handleSubmit(editTask)}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Edit Task
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
    </div>
  );
}
