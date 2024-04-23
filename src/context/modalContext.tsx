// ModalContext.tsx
import React, { ReactNode, createContext, useContext, useState } from "react";

interface ModalContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  isDeleteModalOpen: boolean;
  openDeleteModal: () => void;
  closeDeleteModal: () => void;
  isUploadFileModal: boolean;
  openUploadFileModal: () => void;
  closeUploadFileModal: () => void;
  isLogoutModal: boolean;
  openLogoutModal: () => void;
  closeLogoutModal: () => void;
}

type MyComponentProps = {
  children: ReactNode;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider: React.FC<MyComponentProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isUploadFileModal, setIsUploadFileModal] = useState<boolean>(false);
  const [isLogoutModal, setIsLogoutModal] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const openUploadFileModal = () => setIsUploadFileModal(true);
  const closeUploadFileModal = () => setIsUploadFileModal(false);

  const openLogoutModal = () => setIsLogoutModal(true);
  const closeLogoutModal = () => setIsLogoutModal(false);

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        isDeleteModalOpen,
        openDeleteModal,
        closeDeleteModal,
        isUploadFileModal,
        openUploadFileModal,
        closeUploadFileModal,
        isLogoutModal,
        openLogoutModal,
        closeLogoutModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
