import { FilesI } from "@/types/models/Files.type";
import { useGlobalState } from "@/context/globalStateContext";
import { useModal } from "@/context/modalContext";
import Modal from "@/components/Modal";
import CardFile from "./Cards/CardFile";
import DeleteModal from "@/components/Modal/DeleteModal";

export default function Files({ files }: { files: FilesI[] | undefined }) {
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
      {files?.length === 0 ? (
        <>there is no files</>
      ) : (
        files?.map((item) => <CardFile key={item.id} item={item} />)
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
