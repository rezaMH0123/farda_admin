import Modal from "@/components/Modal";
import ContentHeaderSection from "@/sections/content/components/ContentHeaderSection";
import ContentChart from "@/sections/content/components/ContentChart";
import { useModal } from "@/context/modalContext";
import ContentsModalForm from "@/components/Form/ContentsModalForm";

export default function Content() {
  const { isModalOpen } = useModal();
  return (
    <div
      dir="rtl"
      className=" border border-[#E1E1E1] w-[80%] h-[85%] rounded-xl "
    >
      <ContentHeaderSection />
      <ContentChart />

      {isModalOpen ? (
        <Modal width={65} height={94}>
          <div className="w-full h-full">
            <ContentsModalForm />
          </div>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
}
