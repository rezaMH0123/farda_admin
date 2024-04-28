import IconChevron from "../Icons/Chevron";

interface PaginationProps {
  allPage: number | undefined;
  currentPage: number;
  onChangePage: (page: number) => void;
}

export default function Pagination({
  allPage,
  currentPage,
  onChangePage,
}: PaginationProps) {
  const nextPageClick = () => {
    onChangePage(currentPage + 1);
  };
  const prevPageClick = () => {
    onChangePage(currentPage - 1);
  };
  return (
    <>
      {currentPage === allPage ? (
        <IconChevron className="ml-1 fill-Black-B3" />
      ) : (
        <IconChevron
          onClick={nextPageClick}
          className="ml-1 cursor-pointer fill-Blue-PrimaryBlue"
        />
      )}

      <div className="flex justify-center items-center gap-x-3 border border-Black-B3 w-[160px] rounded-xl py-2 px-2">
        <span className="text-Black-B2 select-none">
          صفحه {currentPage} از {allPage}
        </span>
      </div>
      {currentPage < 2 ? (
        <IconChevron className="ml-1 rotate-180 fill-Black-B3" />
      ) : (
        <IconChevron
          onClick={prevPageClick}
          className="ml-1 rotate-180 cursor-pointer fill-Blue-PrimaryBlue"
        />
      )}
    </>
  );
}
