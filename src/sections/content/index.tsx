import Modal from "@/components/Modal";
import ContentsModalBody from "@/sections/content/components/ContentsModalBody";
import ContentHeaderSection from "@/sections/content/components/ContentHeaderSection";
import ContentChart from "@/sections/content/components/ContentChart";
import { useModal } from "@/context/modalContext";

export default function Content() {
  // const [openModal, setOpenModal] = useState(false);
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
            <ContentsModalBody />
          </div>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
}
