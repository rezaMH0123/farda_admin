import IconChevron from "../Icons/Chevron";

interface PaginationProps {
  allPage: number;
  currentPage: number;
  prevPageClick: () => void;
  nextPageClick: () => void;
}

export default function Pagination({
  allPage,
  currentPage,
  nextPageClick,
  prevPageClick,
}: PaginationProps) {
  return (
    <>
      {currentPage === allPage ? (
        <IconChevron className="ml-1 " fill="#B3B3B3" />
      ) : (
        <IconChevron
          onClick={nextPageClick}
          className="ml-1 cursor-pointer"
          fill="#33BDF1"
        />
      )}

      <div className="flex justify-center items-center gap-x-3 border border-[#BABABA] w-[160px] rounded-xl py-2 px-2 ">
        <span className="text-[#404040] select-none">
          صفحه {currentPage} از {allPage}
        </span>
      </div>
      {currentPage < 2 ? (
        <IconChevron className="ml-1 rotate-180" fill="#B3B3B3" />
      ) : (
        <IconChevron
          onClick={prevPageClick}
          className="ml-1 rotate-180 cursor-pointer"
          fill="#33BDF1"
        />
      )}
    </>
  );
}
