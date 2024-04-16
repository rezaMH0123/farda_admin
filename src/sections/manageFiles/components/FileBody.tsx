import { useEffect, useState } from "react";
import Skeleton from "@/components/Skeleton";
import Pagination from "@/components/Pagination";
import StringsE from "@/types/strings";
import SHARED_STRINGS from "@/constants/strings/shared.string";
import Photos from "./Photo";
import Files from "./File";
import http from "@/core/services/httpServices";
import Cookies from "js-cookie";
import { FilesI } from "@/types/models/Files.type";

export default function ManageFileBodySection() {
  const [tab, setTab] = useState<"photo" | "file">("photo");
  const allPage: number = 8;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const [photos, setPhotos] = useState<FilesI[]>([]);
  const [files, setFiles] = useState<FilesI[]>([]);

  const access_token: string | undefined = Cookies.get("access_token");

  const nextPageClick = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const prevPageClick = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const getFiles = async () => {
    setLoading(true);

    await http
      .get("Panel/File", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          Size: 6,
          Page: currentPage,
          Sort: "createdOn desc",
        },
      })
      .then((response) => {
        console.log(response);
        // filtering images from resullt
        const photosArr: FilesI[] = response.data.data.result.filter(
          (item: FilesI) => item.contentType.slice(0, 5) === "image"
        );
        setPhotos(photosArr);
        // filtering files from result
        const filesArr: FilesI[] = response.data.data.result.filter(
          (item: FilesI) => item.contentType.slice(0, 11) === "application"
        );
        setFiles(filesArr);

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    getFiles();
  }, [currentPage]);

  return (
    <>
      <div className="px-5 h-full">
        <div className="h-[70%]">
          <div className="flex">
            <div
              className={`h-[37px] w-16 font-ShabnamBold flex justify-center cursor-pointer border-b ${
                tab === "photo"
                  ? "border-PrimaryBlue-100 text-PrimaryBlack-200"
                  : "border-PrimaryBlack-300 text-PrimaryBlack-300"
              }`}
              onClick={() => setTab("photo")}
            >
              {SHARED_STRINGS[StringsE.Photo]}
            </div>
            <div
              className={`h-[37px] w-16 font-ShabnamBold flex justify-center cursor-pointer border-b ${
                tab === "file"
                  ? "border-PrimaryBlue-100 text-PrimaryBlack-200"
                  : "border-PrimaryBlack-300 text-PrimaryBlack-300"
              }`}
              onClick={() => setTab("file")}
            >
              {SHARED_STRINGS[StringsE.File]}
            </div>
          </div>
          <div className="h-[92%] grid grid-cols-3 gap-6 mt-3">
            {loading ? (
              <Skeleton />
            ) : tab === "photo" ? (
              <Photos photos={photos} />
            ) : (
              <Files files={files} />
            )}
          </div>
        </div>
        <div className="flex gap-x-5 justify-end items-center  h-[15%]">
          <Pagination
            allPage={allPage}
            currentPage={currentPage}
            nextPageClick={nextPageClick}
            prevPageClick={prevPageClick}
          />
        </div>
      </div>
    </>
  );
}
