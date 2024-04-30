import { ReactNode, MouseEvent } from "react";
import "animate.css";
import { createPortal } from "react-dom";
import { useModal } from "@/context/modalContext";

type ModalProps = {
  children: ReactNode;
  width: number;
  height: number;
  onCloseModal?: () => void;
};
export default function Modal({
  children,
  width,
  height,
  onCloseModal,
}: ModalProps) {
  const {
    closeModal,
    closeDeleteModal,
    closeUploadFileModal,
    closeLogoutModal,
  } = useModal();
  const handleModalClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    closeModal();
    closeDeleteModal();
    closeUploadFileModal();
    closeLogoutModal();
    onCloseModal && onCloseModal();
  };

  return createPortal(
    <div
      dir="rtl"
      className="absolute top-0 left-0 flex justify-center items-center  w-full h-full bg-opacity-60 overflow-hidden"
    >
      <div
        onClick={handleModalClick}
        className="absolute top-0 left-0  bg-black bg-opacity-60 w-full h-full z-20 "
      ></div>
      <div
        style={{ width: `${width}%`, height: `${height}%` }}
        className={`animate__animated animate__fadeInUp flex justify-center items-center bg-white rounded-lg relative z-30 `}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal")!
  );
}
