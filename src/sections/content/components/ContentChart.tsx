import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import Edit from "@/components/Icons/Edit";
import RecycleBin from "@/components/Icons/RecycleBin";
import TailSpinner from "@/components/Loading/TailSpinner";
import { Advertisement } from "@/types/models/Content.type";
import { HttpApiResponse, HttpResponseList } from "@/types/httpResponse";
import { useMutation, useQuery } from "@tanstack/react-query";
import { contentController } from "@/controllers/content.controller";
import Modal from "@/components/Modal";
import { useModal } from "@/context/modalContext";
import DeleteModal from "@/components/Modal/DeleteModal";

export default function ContentChart() {
  const { isDeleteModalOpen, closeDeleteModal, openDeleteModal } = useModal();
  const [allPage, setAllPage] = useState<number | undefined>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [deleteItemTitle, setDeleteItemTitle] = useState<string>();
  const [deleteItemId, setDeleteItemId] = useState<string>();

  const { data, isLoading, refetch } = useQuery<
    HttpResponseList<Advertisement>
  >({
    queryKey: ["content", currentPage],
    queryFn: () => contentController.getContent(currentPage),
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { mutateAsync: deleteMutation, isPending } = useMutation<
    HttpApiResponse,
    unknown,
    string
  >({
    mutationFn: contentController.deleteContent,
  });

  useEffect(() => {
    if (data) {
      setAllPage(Math.ceil(Number(data?.data.totalRowCount) / 6));
    }
  }, [data]);

  const handleDelete = async (contentId: string, title: string) => {
    openDeleteModal();
    setDeleteItemTitle(title);
    setDeleteItemId(contentId);
  };
  const handleDeleteModal = async () => {
    try {
      if (deleteItemId) {
        await deleteMutation(deleteItemId);
        closeDeleteModal();
        await refetch();
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const nextPageClick = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const prevPageClick = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="chartContetnt px-6 h-full w-full">
      <div className="headChart flex  h-[60px] font-ShabnamMedium pt-3">
        <div className="flex items-center w-[40%]">
          <span className="mr-5 ">عنوان</span>
        </div>
        <div className="flex justify-center items-center w-[15%] ">
          <span>وضعیت</span>
        </div>
        <div className="flex justify-center items-center w-[15%] ">
          <span>اشتراک گذاری</span>
        </div>
        <div className="flex justify-center items-center w-[15%] ">
          <span>کامنت گذاری</span>
        </div>
        <div className="flex justify-end items-center w-[15%] ">
          <span>عملیات</span>
        </div>
      </div>

      <div className="haedBody order-b border-t border-PrimaryBlack-300 h-[60%] w-full ">
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <TailSpinner />
          </div>
        ) : (
          <>
            {data?.data.result.map((item) => (
              <div
                key={item.id}
                className="flex items-center h-[14%] text-PrimaryBlack-400  mt-2 "
              >
                <div className="flex items-center   w-[40%] h-[40px]">
                  {item.title.length > 50
                    ? item.title.slice(0, 50) + "..."
                    : item.title}
                </div>
                <div className="flex items-center justify-center  w-[15%] h-[40px]">
                  {item.status === "Publish" ? "منتشر شده" : "منتشر نشده"}
                </div>
                <div className="flex items-center justify-center  w-[15%] h-[40px]">
                  {item.isShareAvailable ? "می شود" : "نمی شود"}
                </div>
                <div className="flex items-center justify-center  w-[15%] h-[40px]">
                  {item.isCommentAvailable ? "می شود" : "نمی شود"}
                </div>
                <div className="flex items-center justify-end gap-x-4  w-[15%] h-[40px]">
                  <Edit
                    onClick={() => console.log(`edit:${item.id}`)}
                    fill="#41CD92"
                    className="cursor-pointer"
                  />
                  <RecycleBin
                    onClick={() => handleDelete(item.id, item.title)}
                    fill="#FF8A8A"
                    className="cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {isDeleteModalOpen && (
        <Modal height={40} width={25}>
          <DeleteModal
            title={deleteItemTitle}
            onClick={handleDeleteModal}
            loading={isPending}
          />
        </Modal>
      )}

      <div className="flex gap-x-5 justify-end items-center  h-[15%]">
        <Pagination
          allPage={allPage}
          currentPage={currentPage}
          nextPageClick={nextPageClick}
          prevPageClick={prevPageClick}
        />
      </div>
    </div>
  );
}
