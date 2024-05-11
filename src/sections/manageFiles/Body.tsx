import StringsE from "@/types/strings";
import SHARED_STRINGS from "@/constants/strings/shared.string";
import { useGlobalState } from "@/context/globalStateContext";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HttpApiResponse, HttpResponseList } from "@/types/httpResponse";
import { FilesI } from "@/types/models/Files.type";
import { useModal } from "@/context/modalContext";
import { fileController } from "@/controllers/file.controller";
import Pagination from "@/components/Pagination";
import Modal from "@/components/Modal";
import DeleteModal from "@/components/Modal/DeleteModal";
import toast from "react-hot-toast";
import CustomToast from "@/components/Toast";
import Skeleton from "@/components/Skeleton";
import CardFile from "./Cards/CardFile";
import CardPhoto from "./Cards/CardPhoto";

export default function ManageFileBody() {
  const { setTab, tab, itemFile, setItemFile, queryKey, setQueryKey } =
    useGlobalState();
  const [fileTypeEnum, setFileTypeEnum] = useState<"Image" | "File">("Image");
  const [allPage, setAllPage] = useState<number | undefined>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { isDeleteModalOpen, closeDeleteModal } = useModal();

  const { data, isFetched, isLoading } = useQuery<HttpResponseList<FilesI>>({
    queryKey: [queryKey, currentPage, fileTypeEnum],
    queryFn: () => fileController.getFiles(currentPage, 6, fileTypeEnum),
    retry: false,
    refetchOnWindowFocus: true,
  });

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

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
          queryClient.invalidateQueries({ queryKey: [queryKey] });
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

  useEffect(() => {
    if (data) {
      setAllPage(Math.ceil(Number(data?.data.totalRowCount) / 6));
    }
  }, [data, isFetched]);

  const HandleChangeTab = (
    tab: "photo" | "file",
    fileTypeEnumP: "Image" | "File",
    queryKey: "images" | "files"
  ) => {
    setTab(tab);
    setFileTypeEnum(fileTypeEnumP);
    setQueryKey(queryKey);
    setCurrentPage(1);
    setAllPage(undefined);
  };

  return (
    <>
      <div className="px-5 h-full">
        <div className="flex">
          <div
            className={`h-[37px] w-16 font-bold flex justify-center cursor-pointer border-b ${
              tab === "photo"
                ? "border-Blue-PrimaryBlue text-Blue-PrimaryBlue"
                : "border-Black-B3 text-Black-B3"
            }`}
            onClick={() => HandleChangeTab("photo", "Image", "images")}
          >
            {SHARED_STRINGS[StringsE.Photo]}
          </div>
          <div
            className={`h-[37px] w-16 font-bold flex justify-center cursor-pointer border-b ${
              tab === "file"
                ? "border-Blue-PrimaryBlue text-Blue-PrimaryBlue"
                : "border-Black-B3 text-Black-B3"
            }`}
            onClick={() => HandleChangeTab("file", "File", "images")}
          >
            {SHARED_STRINGS[StringsE.File]}
          </div>
        </div>
        <div className="h-[67%] overflow-auto">
          <div className="h-fit grid grid-cols-3 gap-6 mt-3">
            {isLoading ? (
              <Skeleton />
            ) : tab === "file" ? (
              data?.data.result.map((item) => (
                <CardFile item={item} key={item.id} />
              ))
            ) : (
              tab === "photo" &&
              data?.data.result.map((item) => (
                <CardPhoto item={item} key={item.id} />
              ))
            )}
          </div>
        </div>
        <div className="flex gap-x-5 justify-end items-center h-[8%]">
          <Pagination
            allPage={allPage}
            currentPage={currentPage}
            onChangePage={onChangePage}
          />
        </div>
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
      </div>
    </>
  );
}
