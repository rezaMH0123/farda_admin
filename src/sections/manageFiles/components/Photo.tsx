import { FilesI } from "@/types/models/Files.type";
import { useModal } from "@/context/modalContext";
import Modal from "@/components/Modal";
import { useGlobalState } from "@/context/globalStateContext";
import CardPhoto from "./Cards/CardPhoto";
import DeleteModal from "@/components/Modal/DeleteModal";

export default function Photos({ photos }: { photos?: FilesI[] | undefined }) {
  const { isDeleteModalOpen } = useModal();
  const { itemFile, loading, deleteFiles, setItemFile } = useGlobalState();

  const DeleteFile = async () => {
    if (itemFile && itemFile.id) {
      await deleteFiles(itemFile.id);
      setItemFile(undefined);
    }
  };

  const fileName = itemFile && itemFile?.filename + itemFile?.extention;

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
            <DeleteModal
              onClick={DeleteFile}
              loading={loading}
              title={fileName}
            />
          </Modal>
        )}
      </>
    </>
  );
}
