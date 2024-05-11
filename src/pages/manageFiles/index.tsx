import Modal from "@/components/Modal";
import ManageFileHeaderSection from "../../sections/manageFiles/Header";
import { useModal } from "@/context/modalContext";
import UploadFile from "../../components/UploadFile";
import ManageFileBody from "../../sections/manageFiles/Body";

export default function ManageFile() {
  const { isUploadFileModal } = useModal();

  return (
    <div
      dir="rtl"
      className="border border-Black-B5 w-[80%] h-[85%] rounded-[14px] bg-W1"
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
