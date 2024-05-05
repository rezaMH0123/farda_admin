import Edit from "@/components/Icons/Edit";
import RecycleBin from "@/components/Icons/RecycleBin";
import Modal from "@/components/Modal";
import DeleteModal from "@/components/Modal/DeleteModal";
import { contentController } from "@/controllers/content.controller";
import { HttpApiResponse } from "@/types/httpResponse";
import { Advertisement } from "@/types/models/Content.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

const RowContent: FC<{ keyName: string } & Advertisement> = ({
  keyName,
  ...props
}) => {
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [deleteItemTitle, setDeleteItemTitle] = useState<string>();
  const [deleteItemId, setDeleteItemId] = useState<string>();
  const queryClient = useQueryClient();
  const { mutateAsync: deleteMutation, isPending } = useMutation<
    HttpApiResponse,
    unknown,
    string
  >({
    mutationFn: contentController.deleteContent,
  });

  const handleDelete = async (contentId: string, title: string) => {
    console.log(title);
    setDeleteItemTitle(title);
    setDeleteItemId(contentId);
    setIsOpenModal(true);
  };

  const handleDeleteModal = async () => {
    console.log(deleteItemTitle);
    try {
      if (deleteItemId) {
        await deleteMutation(deleteItemId);
        await queryClient.invalidateQueries({ queryKey: [keyName] });
        setIsOpenModal(false);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  return (
    <div
      key={props.id}
      className="flex items-center h-[14%] text-Black-B2 mt-2"
    >
      <div className="flex items-center w-[40%] h-[40px]">
        {props.title.length > 50
          ? props.title.slice(0, 50) + "..."
          : props.title}
      </div>
      <div className="flex items-center justify-center  w-[15%] h-[40px]">
        {props.status === "Publish" ? "منتشر شده" : "منتشر نشده"}
      </div>
      <div className="flex items-center justify-center  w-[15%] h-[40px]">
        {props.isShareAvailable ? "می شود" : "نمی شود"}
      </div>
      <div className="flex items-center justify-center  w-[15%] h-[40px]">
        {props.isCommentAvailable ? "می شود" : "نمی شود"}
      </div>
      <div className="flex items-center justify-end gap-x-4  w-[15%] h-[40px]">
        <Edit
          onClick={() => {
            navigate(`edit/${props.id}`);
          }}
          className="cursor-pointer fill-Green-G1"
        />
        <RecycleBin
          onClick={() => handleDelete(props.id, props.title)}
          className="cursor-pointer fill-Red-R1"
        />
      </div>

      {isOpenModal && (
        <Modal height={40} width={25}>
          <DeleteModal
            title={deleteItemTitle}
            onClick={handleDeleteModal}
            onCloaseModal={handleCloseModal}
            loading={isPending}
          />
        </Modal>
      )}
    </div>
  );
};

export default RowContent;
