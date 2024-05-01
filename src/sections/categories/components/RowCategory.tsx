import CategoryForm from "@/components/Form/CategoryForm";
import Edit from "@/components/Icons/Edit";
import RecycleBin from "@/components/Icons/RecycleBin";
import Modal from "@/components/Modal";
import DeleteModal from "@/components/Modal/DeleteModal";
import CustomToast from "@/components/Toast";
import SHARED_STRINGS from "@/constants/strings/shared.string";
import { CategorieController } from "@/controllers/categorie.contoroller";
import { HttpApiResponse } from "@/types/httpResponse";
import { CategoryMain } from "@/types/models/Categories.type";
import StringsE from "@/types/strings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { FC, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const RowCategory: FC<{ keyName: string } & Props & CategoryMain> = ({
  keyName,
  modal,
  setModal,
  ...props
}) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteItemTitle, setDeleteItemTitle] = useState<string>();
  const [deleteItemId, setDeleteItemId] = useState<string>();
  const queryClient = useQueryClient();

  // delete
  const { mutateAsync: deleteMutation, isPending } = useMutation<
    HttpApiResponse,
    unknown,
    string
  >({
    mutationFn: CategorieController.deleteCategory,
  });

  const handleDelete = async (
    id: string | undefined,
    title: string | undefined
  ) => {
    console.log(title);
    setDeleteItemTitle(title);
    setDeleteItemId(id);
    setIsOpenModal(true);
  };

  const handleDeleteModal = async () => {
    if (deleteItemId) {
      await deleteMutation(deleteItemId);
      await queryClient.invalidateQueries({ queryKey: [keyName] });
      setIsOpenModal(false);
    }
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleEdit = () => {
    setEditModal(true);
  };

  const HandleCloseEditModal = () => {
    setEditModal(false);
  };
  return (
    <div
      key={props.id}
      className="flex items-center justify-between h-[14%] text-Black-B2 mt-2"
    >
      <div className="flex items-center w-[17%] h-[40px]">
        {props.title && props.title?.length > 50
          ? props.title.slice(0, 50) + "..."
          : props.title}
      </div>
      <div className="flex items-center justify-center w-[15%] h-[40px]">
        {props.isPin ? "بله" : "خیر"}
      </div>
      <div className="flex items-center justify-end gap-x-4 w-[15%] h-[40px]">
        <Edit onClick={handleEdit} className="cursor-pointer fill-Green-G1" />
        <RecycleBin
          onClick={() => handleDelete(props.id, props.title)}
          className="cursor-pointer fill-Red-R1"
        />
      </div>

      {isOpenModal && (
        <Modal onCloseModal={handleCloseModal} height={40} width={25}>
          <DeleteModal
            title={deleteItemTitle}
            onClick={handleDeleteModal}
            onCloaseModal={handleCloseModal}
            loading={isPending}
          />
        </Modal>
      )}

      {editModal && (
        <Modal onCloseModal={HandleCloseEditModal} height={45} width={30}>
          <CategoryForm
            onCloseModal={HandleCloseEditModal}
            value={props}
            title={SHARED_STRINGS[StringsE.Edit]}
            controller="put"
          />
        </Modal>
      )}
    </div>
  );
};

export default RowCategory;
