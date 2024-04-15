import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import Edit from "@/components/Icons/Edit";
import RecycleBin from "@/components/Icons/RecycleBin";
import http from "@/core/services/httpServices";
import TailSpinner from "@/components/Loading/TailSpinner";
import { Advertisement } from "@/types/models/Content.type";
import { HttpResponseList } from "@/types/httpResponse";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";

const getContent = async (currentPage: number) => {
  try {
    const res = await http.get<HttpResponseList<Advertisement>>(
      "Panel/Content",
      {
        params: {
          Size: 6,
          Page: currentPage,
          Sort: "createdOn",
        },
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`, // Add the token to the Authorization header
        },
      }
    );
    return res.data; // Return the data after successfully fetching
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch content"); // Throw error to be caught by React Query
  }
};

export default function ContentChart() {
  const [allPage, setAllPage] = useState<number | undefined>();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isError, isLoading } = useQuery<
    HttpResponseList<Advertisement>
  >({
    queryKey: ["content", currentPage],
    queryFn: () => getContent(currentPage),
    retry: false,
    refetchOnWindowFocus: true,
  });

  const nextPageClick = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const prevPageClick = () => {
    setCurrentPage((prev) => prev - 1);
  };

  console.log(data?.data.result);

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
        <div className="flex justify-center items-center w-[15%] ">
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
                <div className="flex items-center justify-center gap-x-4  w-[15%] h-[40px]">
                  <Edit
                    onClick={() => console.log(`Edit:${item.id}`)}
                    fill="#41CD92"
                    className="cursor-pointer"
                  />
                  <RecycleBin
                    onClick={() => console.log(`RecycleBin:${item.id}`)}
                    fill="#FF8A8A"
                    className="cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </>
        )}
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
  );
}
