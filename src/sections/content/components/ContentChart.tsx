import { useState } from "react";
import Pagination from "@/components/Pagination";
import Edit from "@/components/Icons/Edit";
import RecycleBin from "@/components/Icons/RecycleBin";

export default function ContentChart() {
  const [allPage] = useState<number>(8);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data] = useState([
    {
      id: 1,
      title: "آگهی دعوت به مجمع عمومی عادی سالیانه...",
      status: "منتشر شده",
      shareable: "می شود",
      commentable: "نمی شود",
      checked: false,
    },
    {
      id: 2,
      title: "آگهی دعوت به مجمع عمومی عادی سالیانه...",
      status: "منتشر شده",
      shareable: "می شود",
      commentable: "نمی شود",
      checked: false,
    },
    {
      id: 3,
      title: "آگهی دعوت به مجمع عمومی عادی سالیانه...",
      status: "منتشر شده",
      shareable: "می شود",
      commentable: "نمی شود",
      checked: false,
    },
    {
      id: 4,
      title: "آگهی دعوت به مجمع عمومی عادی سالیانه...",
      status: "منتشر شده",
      shareable: "می شود",
      commentable: "نمی شود",
      checked: false,
    },
    {
      id: 5,
      title: "آگهی دعوت به مجمع عمومی عادی سالیانه...",
      status: "منتشر شده",
      shareable: "می شود",
      commentable: "نمی شود",
      checked: false,
    },
    {
      id: 6,
      title: "آگهی دعوت به مجمع عمومی عادی سالیانه...",
      status: "منتشر شده",
      shareable: "می شود",
      commentable: "نمی شود",
      checked: false,
    },
  ]);

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
        <div className="flex justify-center items-center w-[15%] ">
          <span>عملیات</span>
        </div>
      </div>

      <div className="haedBody order-b border-t border-PrimaryBlack-300 h-[60%] w-full ">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex items-center h-[14%] text-PrimaryBlack-400  mt-2 "
          >
            <div className="flex items-center   w-[40%] h-[40px]">
              {item.title}
            </div>
            <div className="flex items-center justify-center  w-[15%] h-[40px]">
              {item.status}
            </div>
            <div className="flex items-center justify-center  w-[15%] h-[40px]">
              {item.shareable}
            </div>
            <div className="flex items-center justify-center  w-[15%] h-[40px]">
              {item.commentable}
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
