import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fileController } from "@/controllers/file.controller";
import { useModal } from "@/context/modalContext";
import { useGlobalState } from "@/context/globalStateContext";
import toast from "react-hot-toast";
import CustomToast from "@/components/Toast";
import { HttpApiResponse } from "@/types/httpResponse";

export async function DeleteFile() {
  const { setItemFile, itemFile } = useGlobalState();
  const { closeDeleteModal } = useModal();
  const queryClient = useQueryClient();

  const { mutateAsync: fileDeleteMutate } = useMutation<
    HttpApiResponse,
    unknown,
    string
  >({
    mutationFn: fileController.deleteFiles,
  });

  if (itemFile && itemFile.id) {
    try {
      const res = await fileDeleteMutate(itemFile.id);
      if (res.isSuccess) {
        queryClient.invalidateQueries({ queryKey: ["manage_file"] });
        closeDeleteModal();
        toast.custom((t) => (
          <CustomToast
            text="!فایل با موفقیت حذف شد"
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
}
