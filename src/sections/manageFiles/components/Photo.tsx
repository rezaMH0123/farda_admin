import { FilesI } from "@/types/models/Files.type";
import { useModal } from "@/context/modalContext";
import Modal from "@/components/Modal";
import IconDelete from "@/components/Icons/DeleteIcon";
import Button from "@/components/Button";
import { useGlobalState } from "@/context/globalStateContext";
import CardPhoto from "./Cards/CardPhoto";
import Loading from "@/components/Loading";

export default function Photos({ photos }: { photos?: FilesI[] }) {
  const { isDeleteModalOpen, closeDeleteModal } = useModal();
  const { itemFile, loading, deleteFiles, setItemFile } = useGlobalState();

  const DeleteFile = async () => {
    if (itemFile && itemFile.id) {
      await deleteFiles(itemFile.id);
      setItemFile(undefined);
    }
  };

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
                    title={
                      loading ? (
                        <Loading className={"bg-PrimaryBlack-200"} />
                      ) : (
                        "حذف شود"
                      )
                    }
                    onClick={DeleteFile}
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
