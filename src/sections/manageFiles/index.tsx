import Modal from "@/components/Modal";
import ManageFileHeaderSection from "./components/Header";
import { useModal } from "@/context/modalContext";
import UploadFile from "../../components/UploadFile";
import ManageFileBody from "./components/Body";

export default function ManageFile() {
  const { isUploadFileModal } = useModal();

  return (
    <div
      dir="rtl"
      className="border border-[#E1E1E1] w-[80%] h-[85%] rounded-xl "
    >
      <ManageFileHeaderSection />
      <ManageFileBody />
      {isUploadFileModal && (
        <Modal width={35} height={55}>
          <div className="w-full h-full flex justify-center items-center">
            <UploadFile />
          </div>
        </Modal>
      )}
    </div>
  );
}
