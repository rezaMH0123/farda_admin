import { useState } from "react";
import Modal from "@/components/Modal";
import ManageFileModalBody from "@/sections/manageFiles/components/ManageFileModalBody";
import ManageFileHeaderSection from "./components/Header";
import ManageFileBodySection from "./components/FileBody";

export default function ManageFile() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div
      dir="rtl"
      className="border border-[#E1E1E1] w-[80%] h-[85%] rounded-xl "
    >
      <ManageFileHeaderSection setOpenModal={setOpenModal} />
      <ManageFileBodySection photos={photos} files={files} />
      {openModal && (
        <Modal width={35} height={55} setOpenModal={setOpenModal}>
          <div className="w-full h-full">
            <ManageFileModalBody
              setOpenModal={setOpenModal}
              photos={photos}
              setPhotos={setPhotos}
              files={files}
              setFiles={setFiles}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
