import { Fragment, ReactElement, useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import TailSpinner from "@/components/Loading/TailSpinner";
import { HttpResponseList } from "@/types/httpResponse";
import { useQuery } from "@tanstack/react-query";
import IconChevron from "../Icons/Chevron";
import FilterDropDown from "../FilterDropDown";

type TableWithApiProps<T> = {
  title: {
    title: string;
    value: string[] | boolean[] | null;
  }[];
  children: (row: T) => ReactElement | ReactElement[];
  controller: (
    currentPage: number,
    IsShareAvailable?: boolean | null,
    IsCommentAvailable?: boolean | null,
    Status?: string
  ) => Promise<HttpResponseList<T>>;
  keyNme: string;
};

export default function TableWithApi<T>({
  title,
  children,
  controller,
  keyNme,
}: TableWithApiProps<T>) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterState, setFilterState] = useState<number>(0);
  const [isShareAvailable, setIsShareAvailable] = useState<
    boolean | null | undefined
  >(null);
  const [isCommentable, setIsCommentable] = useState<
    boolean | null | undefined
  >(null);
  const [status, setStatus] = useState<string | undefined>();

  const { data, isLoading } = useQuery<HttpResponseList<T>>({
    queryKey: [keyNme, currentPage, isShareAvailable, isCommentable, status],
    queryFn: () =>
      controller(currentPage, isShareAvailable, isCommentable, status),
    retry: false,
  });
  const [allPage, setAllPage] = useState<number | undefined>();

  useEffect(() => {
    if (data) {
      setAllPage(Math.ceil(Number(data?.data.totalRowCount) / 6));
    }
  }, [data]);

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const filterOnChange = (data: string | boolean) => {
    console.log(data);
    if (typeof data === "boolean") {
      if (filterState === 2) {
        setIsShareAvailable(data);
      } else if (filterState === 3) {
        setIsCommentable(data);
      }
    } else {
      if (filterState === 1) {
        setStatus(data);
      } else if (data === "" && filterState === 2) {
        setIsShareAvailable(undefined);
      } else if (data === "" && filterState === 3) {
        setIsCommentable(undefined);
      }
    }
  };
  return (
    <div className="chartContetnt px-6 h-full w-full">
      <div className="headChart flex h-[60px] font-medium pt-3 text-Black-B2">
        {title.length === 5 ? (
          <>
            {title.map((item, index) => (
              <Fragment key={index}>
                {index < 1 ? (
                  <div className="flex items-center w-[40%]">
                    <span className="mr-5 ">{item.title}</span>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      index < title.length - 1 && setFilterState(index);
                    }}
                    className={`flex ${
                      index === title.length - 1
                        ? "justify-end"
                        : "justify-center"
                    } items-center  w-[15%] cursor-pointer relative`}
                  >
                    <span>{item.title}</span>
                    {index < title.length - 1 && (
                      <IconChevron className="fill-black h-3 w-3 rotate-90 mr-2 cursor-pointer" />
                    )}

                    {index === filterState && (
                      <FilterDropDown
                        option={item.value}
                        setFilterState={setFilterState}
                        onChange={filterOnChange}
                      />
                    )}
                  </div>
                )}
              </Fragment>
            ))}
          </>
        ) : (
          <>
            {title.map((item, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index === 0
                    ? "justify-start"
                    : index === title.length - 1
                    ? "justify-end"
                    : "justify-center"
                }  flex-1`}
              >
                <span className="mr-5 ">{item.title}</span>
              </div>
            ))}
          </>
        )}
      </div>

      <div className="haedBody border-b border-t border-Black-B6 h-[60%] w-full">
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <TailSpinner />
          </div>
        ) : (
          <div className="flex flex-col gap-y-2">
            {data ? (
              data?.data?.result?.map((item, index) => (
                <div key={index}>{children(item)}</div>
              ))
            ) : (
              <div>empty state</div>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-x-5 justify-end items-center h-[15%]">
        <Pagination
          allPage={allPage}
          currentPage={currentPage}
          onChangePage={onChangePage}
        />
      </div>
    </div>
  );
}
