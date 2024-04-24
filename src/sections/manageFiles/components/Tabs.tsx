import Modal from "@/components/Modal";
import DeleteModal from "@/components/Modal/DeleteModal";
import CustomToast from "@/components/Toast";
import { useGlobalState } from "@/context/globalStateContext";
import { useModal } from "@/context/modalContext";
import { fileController } from "@/controllers/file.controller";
import { HttpApiResponse } from "@/types/httpResponse";
import { FilesI } from "@/types/models/Files.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import CardPhoto from "./Cards/CardPhoto";
import CardFile from "./Cards/CardFile";
import SHARED_STRINGS from "@/constants/strings/shared.string";
import StringsE from "@/types/strings";

type Props = {
  photos: FilesI[] | undefined;
  files: FilesI[] | undefined;
};

export default function FileTabs({ photos, files }: Props) {
  const { tab, itemFile, setItemFile } = useGlobalState();
  const { isDeleteModalOpen, closeDeleteModal } = useModal();

  const fileName = itemFile && itemFile?.filename + itemFile?.extention;

  const queryClient = useQueryClient();

  const { mutateAsync: fileDeleteMutate, isPending } = useMutation<
    HttpApiResponse,
    unknown,
    string
  >({
    mutationFn: fileController.deleteFiles,
  });

  const DeleteFile = async () => {
    if (itemFile && itemFile.id) {
      try {
        const res = await fileDeleteMutate(itemFile.id);
        if (res.isSuccess) {
          queryClient.invalidateQueries({ queryKey: ["manage_file"] });
          closeDeleteModal();
          toast.custom((t) => (
            <CustomToast
              text={SHARED_STRINGS[StringsE.DeletedSuccessfully]}
              animation={t}
              status="success"
            />
          ));
        }
        setItemFile(undefined);
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  };

  return (
    <>
      {tab === "photo" ? (
        photos?.length === 0 ? (
          <>there is no photos</>
        ) : (
          photos?.map((item) => <CardPhoto key={item.id} item={item} />)
        )
      ) : (
        tab === "file" &&
        (files?.length === 0 ? (
          <>there is no files</>
        ) : (
          files?.map((item) => <CardFile key={item.id} item={item} />)
        ))
      )}
      <>
        {isDeleteModalOpen && (
          <Modal width={25} height={38}>
            <DeleteModal
              onClick={DeleteFile}
              loading={isPending}
              title={fileName}
            />
          </Modal>
        )}
      </>
    </>
  );
}
