import { useEffect, useState } from "react";
import Skeleton from "@/components/Skeleton";
import Pagination from "@/components/Pagination";
import StringsE from "@/types/strings";
import SHARED_STRINGS from "@/constants/strings/shared.string";
import { FilesI } from "@/types/models/Files.type";
import { useQuery } from "@tanstack/react-query";
import { HttpResponseList } from "@/types/httpResponse";
import { fileController } from "@/controllers/file.controller";
import { useGlobalState } from "@/context/globalStateContext";
import FileTabs from "./Tabs";

export default function ManageFileBody() {
  const [allPage, setAllPage] = useState<number | undefined>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [photos, setPhotos] = useState<FilesI[] | undefined>([]);
  const [files, setFiles] = useState<FilesI[] | undefined>([]);

  const { setTab, tab } = useGlobalState();

  const { data, isLoading } = useQuery<HttpResponseList<FilesI>>({
    queryKey: ["manage_file", currentPage],
    queryFn: () => fileController.getFiles(currentPage, 6),
    retry: false,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (data) {
      setPhotos(
        data.data.result.filter(
          (item: FilesI) => item.contentType.slice(0, 5) === "image"
        )
      );
      setFiles(
        data.data.result.filter(
          (item: FilesI) => item.contentType.slice(0, 11) === "application"
        )
      );
      setAllPage(Math.ceil(Number(data?.data.totalRowCount) / 6));
    }
  }, [data]);

  const onChangePage = (page: number) => {
    setCurrentPage(page);
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
            onClick={() => setTab("photo")}
          >
            {SHARED_STRINGS[StringsE.Photo]}
          </div>
          <div
            className={`h-[37px] w-16 font-bold flex justify-center cursor-pointer border-b ${
              tab === "file"
                ? "border-Blue-PrimaryBlue text-Blue-PrimaryBlue"
                : "border-Black-B3 text-Black-B3"
            }`}
            onClick={() => setTab("file")}
          >
            {SHARED_STRINGS[StringsE.File]}
          </div>
        </div>
        <div className="h-[67%] overflow-auto">
          <div className="h-fit grid grid-cols-3 gap-6 mt-3">
            {isLoading ? (
              <Skeleton />
            ) : (
              <FileTabs photos={photos} files={files} />
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
      </div>
    </>
  );
}
