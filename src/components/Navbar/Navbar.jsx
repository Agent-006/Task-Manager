import React from "react";
import {
  Navbar,
  NavbarContent,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  DropdownSection,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout as authLogout } from "../../store/authSlice.js";
import TextArea from "../TextArea/TextArea.jsx";
import Input from "../Input/Input.jsx";
import { useForm } from "react-hook-form";

function Nav() {
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("opaque");

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  const userData = useSelector((state) => state.auth.userData);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const logoutUser = async () => {
    try {
      const { accessToken } = userData;
      const response = await fetch(
        "http://localhost:8000/api/v1/users/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        console.log("Logged out user successfully");
        dispatch(authLogout({ userData: null }));
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      throw new Error(
        500,
        "Something went wrong while logging out the user :: internal server error"
      );
    }
  };

  const editProfile = () => {
    //TODO: edit profile functionality
  };

  return (
    <Navbar className="bg-transparent">
      <NavbarContent as="div" justify="end">
        {isLoggedIn && (
          <Dropdown
            className="bg-zinc-800 text-zinc-200"
            placement="bottom-end"
            closeOnSelect={false}
          >
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src={userData?.loggedInUser.avatar}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownSection showDivider>
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">
                    {userData?.loggedInUser.email}
                  </p>
                </DropdownItem>
                <DropdownItem
                  onPress={() => handleOpen("blur")}
                  key="account"
                  className="h-14 gap-2"
                >
                  Profile
                  <Modal
                    className="bg-zinc-800 text-zinc-200"
                    backdrop={backdrop}
                    isOpen={isOpen}
                    onClose={onClose}
                  >
                    <form onSubmit={handleSubmit(editProfile)}>
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
                              <Button
                                color="danger"
                                variant="light"
                                onPress={onClose}
                              >
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
              </DropdownSection>
              <DropdownSection>
                <DropdownItem onClick={logoutUser} key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>
    </Navbar>
  );
}

export default Nav;
