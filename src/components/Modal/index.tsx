import { ReactNode, MouseEvent } from "react";
import "animate.css";
import { createPortal } from "react-dom";

type ModalProps = {
  children: ReactNode;
  width: number;
  height: number;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function Modal({
  children,
  width,
  height,
  setOpenModal,
}: ModalProps) {
  const handleModalClick = (event: MouseEvent<HTMLDivElement>) => {
    // Prevent the click event from propagating to the backdrop click handler
    event.stopPropagation();
    setOpenModal(false);
  };

  return createPortal(
    <div
      dir="rtl"
      // onClick={() => setOpenModal(false)}
      className="absolute top-0 left-0 flex justify-center items-center  w-full h-full bg-opacity-60"
    >
      <div
        onClick={handleModalClick}
        className="absolute top-0 left-0  bg-black bg-opacity-60 w-full h-full z-40"
      ></div>
      <div
        style={{ width: `${width}%`, height: `${height}%` }}
        className={`animate__animated animate__fadeInUp flex justify-center items-center bg-white rounded-lg relative z-50`}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal")!
  );
}
