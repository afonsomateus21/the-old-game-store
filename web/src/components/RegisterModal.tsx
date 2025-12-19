import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { useState, type ReactNode } from "react";

interface RegisterModalProps {
  openModal: boolean;
  onCloseModal: () => void;
  children?: ReactNode;
}

export const RegisterModal = ({ openModal, onCloseModal, children }: RegisterModalProps) => {
  // const [openModal, setOpenModal] = useState(true);

  // function onCloseModal() {
  //   setOpenModal(false);
  //   setEmail("");
  // }

  return (
    <>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <ModalHeader />
        <ModalBody>
          { children }
        </ModalBody>
      </Modal>
    </>
  );
}
