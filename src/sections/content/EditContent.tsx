import Button from "@/components/Button";
import ContentForm from "@/components/Form/ContentForm";
import PlusIcon from "@/components/Icons/PlusIcon";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import SwiperComponent from "@/components/Swiper/SwiperComponent";
import UploadFile from "@/components/UploadFile";
import SHARED_STRINGS from "@/constants/strings/shared.string";
import { useModal } from "@/context/modalContext";
import { contentController } from "@/controllers/content.controller";
import { fileController } from "@/controllers/file.controller";
import { HttpApiResponse, HttpResponseList } from "@/types/httpResponse";
import { SingleContentI } from "@/types/models/Content.type";
import { FilesI } from "@/types/models/Files.type";
import StringsE from "@/types/strings";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditContent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    isModalOpen,
    openUploadFileModal,
    isUploadFileModal,
    closeUploadFileModal,
    closeModal,
  } = useModal();

  const {
    data: singleContent,
    isError,
    isLoading: singleContentLoading,
  } = useQuery<HttpApiResponse<SingleContentI>>({
    queryKey: ["singleContent", id],
    queryFn: () => contentController.getContentWithId(id),
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { data } = useQuery<HttpResponseList<FilesI>>({
    queryKey: ["manage_file"],
    queryFn: () => fileController.getFiles(1, 1000000),
    retry: false,
    refetchOnWindowFocus: true,
  });

  const [selectedMainImage, setSelectedMainImage] = useState<string>();
  const [selectedsecondImages, setSelectedsecondImages] = useState<string[]>(
    []
  );

  const handleCloseModal = () => {
    closeModal();
    setSelectedMainImage("");
    setSelectedsecondImages([]);
  };

  useEffect(() => {
    if (singleContent?.data?.files) {
      const filesid = singleContent.data.files.map((file) => file.id);
      setSelectedsecondImages(filesid);
    }
    if (singleContent?.data?.file) {
      setSelectedMainImage(singleContent?.data?.file.split("/")[4]);
    }
  }, [singleContent]);

  if (isError) {
    navigate("/content");
  }
  return (
    <div className="h-full">
      {singleContentLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loading className="bg-Black-B2" />
        </div>
      ) : (
        <ContentForm
          selectedMainImage={selectedMainImage}
          selectedsecondImages={selectedsecondImages}
          mode="edit"
          singleContent={singleContent}
        />
      )}

      {isModalOpen && (
        <>
          <Modal width={70} height={90}>
            <div className="w-full h-full flex flex-col gap-y-3">
              <div className="flex flex-col items-center justify-center  h-[42%]">
                <div className="flex justify-between items-center rounded-lg h-[30%] w-[95%]">
                  <span className="text-Black-B2 text-[18px]">
                    {SHARED_STRINGS[StringsE.OriginalCoverPhoto]}
                  </span>
                  <Button
                    title={SHARED_STRINGS[StringsE.ManageFile]}
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
                    {SHARED_STRINGS[StringsE.PhotosAndFiles]}
                  </span>
                </div>
                <div className="rounded-lg h-[70%] w-[95%] ">
                  <SwiperComponent
                    setSelecteditems={setSelectedsecondImages}
                    selecteditems={selectedsecondImages}
                    row={2}
                    data={data?.data.result}
                    type={"checkbox"}
                  />
                </div>
              </div>
              <div className="flex items-center px-6 justify-end  gap-x-4  h-[10%]">
                <Button
                  title={SHARED_STRINGS[StringsE.Close]}
                  model="outline_red"
                  className="px-12"
                  onClick={handleCloseModal}
                />
                <Button
                  onClick={closeModal}
                  title={SHARED_STRINGS[StringsE.Add]}
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
