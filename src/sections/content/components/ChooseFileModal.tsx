import Button from "@/components/Button";
import PlusIcon from "@/components/Icons/PlusIcon";
import Modal from "@/components/Modal";
import SwiperComponent from "@/components/Swiper/SwiperComponent";
import SHARED_STRINGS from "@/constants/strings/shared.string";
import { useGlobalState } from "@/context/globalStateContext";
import { useModal } from "@/context/modalContext";
import { fileController } from "@/controllers/file.controller";
import { HttpResponseList } from "@/types/httpResponse";
import { FilesI } from "@/types/models/Files.type";
import StringsE from "@/types/strings";
import { useQuery } from "@tanstack/react-query";
import { Fragment } from "react/jsx-runtime";

type ChooseFileModalProps = {
  selectedMainImage: string | undefined;

  setSelectedMainImage: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  selectedsecondImages: string[];
  setSelectedsecondImages: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function ChooseFileModal({
  setSelectedMainImage,
  setSelectedsecondImages,
  selectedMainImage,
  selectedsecondImages,
}: ChooseFileModalProps) {
  const { isModalOpen, openUploadFileModal, closeModal } = useModal();

  const { queryKey } = useGlobalState();

  const { data } = useQuery<HttpResponseList<FilesI>>({
    queryKey: [queryKey],
    queryFn: () => fileController.getFiles(1, 1000000),
    retry: false,
    refetchOnWindowFocus: true,
  });

  const handleCloseModal = () => {
    closeModal();
    setSelectedMainImage("");
    setSelectedsecondImages([]);
  };

  return (
    <Fragment>
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
    </Fragment>
  );
}
