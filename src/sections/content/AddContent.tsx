import Button from "@/components/Button";
import ContentsModalForm from "@/components/Form/ContentsModalForm";
import Modal from "@/components/Modal";
import SwiperComponent from "@/components/Swiper/SwiperComponent";
import { useModal } from "@/context/modalContext";
import PlusIcon from "@/components/Icons/PlusIcon";
import "animate.css";
import UploadFile from "@/components/UploadFile";
import { HttpResponseList } from "@/types/httpResponse";
import { FilesI } from "@/types/models/Files.type";
import { fileController } from "@/controllers/file.controller";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function AddContent() {
  const {
    isModalOpen,
    openUploadFileModal,
    isUploadFileModal,
    closeUploadFileModal,
    closeModal,
  } = useModal();
  const [selectedMainImage, setSelectedMainImage] = useState<string>();
  const [selectedsecondImage, setSelectedsecondImage] = useState<string[]>([]);

  const { data, isLoading } = useQuery<HttpResponseList<FilesI>>({
    queryKey: ["manage_file"],
    queryFn: () => fileController.getFiles(1, 1000000),
    retry: false,
    refetchOnWindowFocus: true,
  });

  const handleCloseModal = () => {
    closeModal();
    setSelectedMainImage("");
    setSelectedsecondImage([]);
  };
  // console.log(selectedMainImage);
  // console.log(selectedsecondImage);
  return (
    <div className="h-full">
      <ContentsModalForm />
      {isModalOpen && (
        <>
          <Modal width={70} height={90}>
            <div className="w-full h-full flex flex-col gap-y-3">
              <div className="flex flex-col items-center justify-center  h-[42%]">
                <div className="flex justify-between items-center rounded-lg h-[30%] w-[95%]">
                  <span className="text-Black-B2 text-[18px]">
                    عکس کاور اصلی
                  </span>
                  <Button
                    title={"مدیریت فایل"}
                    model="outline_blue"
                    className="px-4"
                    icon={
                      <PlusIcon className="fill-Blue-PrimaryBlue w-3 h-3" />
                    }
                    onClick={openUploadFileModal}
                  />
                </div>
                <div className="rounded-lg h-[70%] w-[95%] ">
                  <SwiperComponent
                    setSelecteditem={setSelectedMainImage}
                    selecteditem={selectedMainImage}
                    row={1}
                    data={data?.data.result}
                    type={"radio"}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center h-[42%]">
                <div className=" flex items-center h-[30%] w-[95%]">
                  <span className="text-Black-B2 text-[18px]">
                    عکس‌ و فایل‌ها
                  </span>
                </div>
                <div className="rounded-lg h-[70%] w-[95%] ">
                  <SwiperComponent
                    setSelecteditems={setSelectedsecondImage}
                    selecteditems={selectedsecondImage}
                    row={2}
                    data={data?.data.result}
                    type={"checkbox"}
                  />
                </div>
              </div>
              <div className="flex items-center px-6 justify-end  gap-x-4  h-[10%]">
                <Button
                  title={"بستن"}
                  model="outline_red"
                  className="px-12"
                  onClick={handleCloseModal}
                />
                <Button
                  onClick={closeModal}
                  title={"افزودن"}
                  model="fill_blue"
                  className="px-12"
                />
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
          <div className="animate__animated animate__fadeInUp w-[35%] h-[55%] bg-W1 rounded-md z-50">
            <UploadFile />
          </div>
        </div>
      )}
    </div>
  );
}
