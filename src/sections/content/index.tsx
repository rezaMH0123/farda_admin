import { useState } from "react";

import Modal from "@/components/Modal";
import ContentsModalBody from "@/sections/content/components/ContentsModalBody";
import ContentHeaderSection from "@/sections/content/components/ContentHeaderSection";
import ContentChart from "@/sections/content/components/ContentChart";

export default function Content() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div
      dir="rtl"
      className=" border border-[#E1E1E1] w-[80%] h-[85%] rounded-xl "
    >
      <ContentHeaderSection setOpenModal={setOpenModal} />
      <ContentChart />

      {openModal ? (
        <Modal width={65} height={94} setOpenModal={setOpenModal}>
          <div className="w-full h-full">
            <ContentsModalBody setOpenModal={setOpenModal} />
          </div>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
}
