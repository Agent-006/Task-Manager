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
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout as authLogout } from "../../store/authSlice.js";

function Nav() {
  const dispatch = useDispatch();

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
                    className="bg-zinc-800/90 text-zinc-200"
                    backdrop={backdrop}
                    isOpen={isOpen}
                    onClose={onClose}
                  >
                    <ModalContent>
                      <>
                        <ModalHeader className="flex flex-col gap-1">
                          Your Profile
                        </ModalHeader>
                        <ModalBody className="flex gap-3 items-center justify-evenly">
                          <img
                            className="rounded-full"
                            height={50}
                            width={50}
                            src={userData?.loggedInUser.avatar}
                            alt="profile"
                          />
                          <div className="flex flex-col gap-2 py-10">
                            <div className="text-zinc-200 font-semibold tracking-wide text-xl">
                              Name: {userData?.loggedInUser.fullName}
                            </div>
                            <div className="text-zinc-200 font-semibold tracking-wide text-xl">
                              Username: {userData?.loggedInUser.username}
                            </div>
                            <div className="text-zinc-200 font-semibold tracking-wide text-xl">
                              User email: {userData?.loggedInUser.email}
                            </div>
                          </div>
                        </ModalBody>
                      </>
                    </ModalContent>
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
