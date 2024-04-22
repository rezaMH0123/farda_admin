import Button from "@/components/Button";
import ContentsModalForm from "@/components/Form/ContentsModalForm";
import Modal from "@/components/Modal";
import SwiperComponent from "@/components/Swiper/SwiperComponent";
import { useModal } from "@/context/modalContext";
import PlusIcon from "@/components/Icons/PlusIcon";
import UploadFile from "@/components/Modal/UploadFile";
export default function AddContent() {
  const { openUploadFileModal, isUploadFileModal, closeUploadFileModal } =
    useModal();
  const { isModalOpen } = useModal();
  const mainCoverData = [
    {
      id: 1,
      filename: "reza",
    },
    {
      id: 2,
      filename: "reza",
    },
    {
      id: 3,
      filename: "reza",
    },
    {
      id: 14,
      filename: "reza",
    },
    {
      id: 16,
      filename: "reza",
    },
    {
      id: 15,
      filename: "reza",
    },
    {
      id: 18,
      filename: "reza",
    },
    {
      id: 134,
      filename: "reza",
    },
    {
      id: 143,
      filename: "reza",
    },
    {
      id: 111,
      filename: "reza",
    },
    {
      id: 176,
      filename: "reza",
    },
    {
      id: 567,
      filename: "reza",
    },
    {
      id: 135,
      filename: "reza",
    },
    {
      id: 138,
      filename: "reza",
    },
    {
      id: 199,
      filename: "reza",
    },
    {
      id: 145,
      filename: "reza",
    },
    {
      id: 1,
      filename: "dfe",
    },
    {
      id: 1,
      filename: "hyf",
    },
    {
      id: 1,
      filename: "aFLI",
    },
    {
      id: 1,
      filename: "rCRTGeza",
    },
    {
      id: 1,
      filename: "GHII",
    },
    {
      id: 1,
      filename: "YY",
    },
    {
      id: 1,
      filename: "CCC",
    },
    {
      id: 1,
      filename: "TTRR",
    },
    {
      id: 1,
      filename: "JHYa",
    },
  ];

  return (
    <div className=" h-full overflow-y-scroll">
      <ContentsModalForm />
      {isModalOpen && (
        <>
          <Modal width={70} height={90}>
            <div className="w-full h-full flex flex-col gap-y-3">
              <div className="flex flex-col items-center justify-center  h-[42%]">
                <div className="flex justify-between items-center  rounded-lg h-[30%] w-[95%]">
                  <span className="text-[#525252] text-[18px]">
                    عکس کاور اصلی
                  </span>
                  <Button
                    title={"مدیریت فایل"}
                    model="outline_blue"
                    className="px-4"
                    icon={<PlusIcon className="fill-PrimaryBlue-100 w-3 h-3" />}
                    onClick={openUploadFileModal}
                  />
                </div>
                <div className="rounded-lg h-[70%] w-[95%] ">
                  <SwiperComponent row={1} data={mainCoverData} />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center  h-[42%]">
                <div className=" flex items-center  h-[30%] w-[95%]">
                  <span className="text-[#525252] text-[18px]">
                    عکس‌ و فایل‌ها
                  </span>
                </div>
                <div className="rounded-lg h-[70%] w-[95%] ">
                  <SwiperComponent row={2} data={mainCoverData} />
                </div>
              </div>
              <div className="flex items-center px-6 justify-end  gap-x-4  h-[10%]">
                <Button title={"بستن"} model="outline_red" className="px-12" />
                <Button title={"افزودن"} model="fill_blue" className="px-12" />
              </div>
            </div>
          </Modal>
        </>
      )}

      {isUploadFileModal && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50  flex justify-center items-center z-40">
          <div
            onClick={(e) => {
              closeUploadFileModal();
              e.stopPropagation;
            }}
            className="w-full h-full absolute top-0 left-0"
          ></div>
          <div className=" w-[35%] h-[55%] bg-white rounded-md z-50">
            <UploadFile />
          </div>
        </div>
      )}
    </div>
  );
}
