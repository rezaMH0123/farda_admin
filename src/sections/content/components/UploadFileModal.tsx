import UploadFile from "@/components/UploadFile";
import { useModal } from "@/context/modalContext";
import { Fragment } from "react";

export default function UploadFileModal() {
  const { isUploadFileModal, closeUploadFileModal } = useModal();
  return (
    <Fragment>
      {isUploadFileModal && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50  flex justify-center items-center z-40">
          <div
            onClick={(e) => {
              closeUploadFileModal();
              e.stopPropagation;
            }}
            className="w-full h-full absolute top-0 left-0"
          ></div>
          <div className="animate__animated animate__fadeInUp w-[35%] h-[55%] bg-W1 rounded-md z-50">
            <UploadFile />
          </div>
        </div>
      )}
    </Fragment>
  );
}
