import { FilesI } from "@/types/models/Files.type";
import { useModal } from "@/context/modalContext";
import Modal from "@/components/Modal";
import IconDelete from "@/components/Icons/DeleteIcon";
import Button from "@/components/Button";
import { useGlobalState } from "@/context/globalStateContext";
import CardPhoto from "./Cards/CardPhoto";

export default function Photos({ photos }: { photos?: FilesI[] }) {
  const { isDeleteModalOpen, closeDeleteModal } = useModal();
  const { itemFile } = useGlobalState();

  console.log(itemFile && itemFile);
  return (
    <>
      {photos?.length === 0 ? (
        <>there is no photos</>
      ) : (
        photos?.map((item) => <CardPhoto key={item.id} item={item} />)
      )}
      <>
        {isDeleteModalOpen && (
          <Modal width={25} height={38}>
            <div className="w-full h-full">
              <div className="w-full h-full flex items-center flex-col">
                <IconDelete className="mt-[82px]" />
                <p className="mt-4 text-PrimaryBlack-800 text-xs">
                  {itemFile?.filename}
                  {itemFile?.extention}
                </p>
                <div className="w-[70%] h-[44px] m-auto flex gap-5 mt-12">
                  <Button
                    className="text-sm w-[50%]"
                    model="outline_gray"
                    title="منصرف شدم"
                    onClick={closeDeleteModal}
                  />
                  <Button
                    className="text-sm w-[50%]"
                    model="fill_red"
                    title="حذف شود"
                  />
                </div>
              </div>
            </div>
          </Modal>
        )}
      </>
    </>
  );
}
