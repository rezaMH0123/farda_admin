import { useEffect, useState } from "react";
import Skeleton from "@/components/Skeleton";
import Pagination from "@/components/Pagination";
import StringsE from "@/types/strings";
import SHARED_STRINGS from "@/constants/strings/shared.string";
import Photos from "./Photo";
import Files from "./File";

export default function ManageFileBodySection({
  files,
  photos,
}: {
  files: File[];
  photos: File[];
}) {
  const [tab, setTab] = useState<"photo" | "file">("photo");
  const allPage: number = 8;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const nextPageClick = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const prevPageClick = () => {
    setCurrentPage((prev) => prev - 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
