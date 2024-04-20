import Modal from "@/components/Modal";
import ManageFileHeaderSection from "./components/Header";
import { useModal } from "@/context/modalContext";
import ManageFileModal from "./components/Modal";
import ManageFileBody from "./components/Body";

export default function ManageFile() {
  const { isModalOpen } = useModal();

  return (
    <div
      dir="rtl"
      className="border border-[#E1E1E1] w-[80%] h-[85%] rounded-xl "
    >
      <ManageFileHeaderSection />
      <ManageFileBody />
      {isModalOpen && (
        <Modal width={35} height={55}>
          <div className="w-full h-full flex justify-center items-center">
            <ManageFileModal />
          </div>
        </Modal>
      )}
    </div>
  );
}
