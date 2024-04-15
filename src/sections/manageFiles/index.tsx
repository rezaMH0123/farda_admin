import Modal from "@/components/Modal";
import ManageFileModalBody from "@/sections/manageFiles/components/ManageFileModalBody";
import ManageFileHeaderSection from "./components/Header";
import ManageFileBodySection from "./components/FileBody";
import { useModal } from "@/context/modalContext";

export default function ManageFile() {
  const { isModalOpen } = useModal();

  return (
    <div
      dir="rtl"
      className="border border-[#E1E1E1] w-[80%] h-[85%] rounded-xl "
    >
      <ManageFileHeaderSection />
      <ManageFileBodySection />
      {isModalOpen && (
        <Modal width={35} height={60}>
          <div className="w-full h-full flex justify-center items-center">
            <ManageFileModalBody />
          </div>
        </Modal>
      )}
    </div>
  );
}
