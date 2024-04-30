import { ReactElement, useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import TailSpinner from "@/components/Loading/TailSpinner";
import { HttpResponseList } from "@/types/httpResponse";
import { useQuery } from "@tanstack/react-query";

type TableWithApiProps<T> = {
  title: string[];
  children: (row: T) => ReactElement | ReactElement[];
  controller: (currentPage: number) => Promise<HttpResponseList<T>>;
  keyNme: string;
};

export default function TableWithApi<T>({
  title,
  children,
  controller,
  keyNme,
}: TableWithApiProps<T>) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading } = useQuery<HttpResponseList<T>>({
    queryKey: [keyNme, currentPage],
    queryFn: () => controller(currentPage),
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

  return (
    <div className="chartContetnt px-6 h-full w-full">
      <div className="headChart flex h-[60px] font-medium pt-3 text-Black-B2">
        {title.length === 5 ? (
          <>
            {title.map((item, index) => (
              <>
                {index < 1 ? (
                  <div className="flex items-center w-[40%]">
                    <span className="mr-5 ">{item}</span>
                  </div>
                ) : (
                  <div
                    className={`flex ${
                      index === title.length - 1
                        ? "justify-end"
                        : "justify-center"
                    } items-center  w-[15%]`}
                  >
                    <span>{item}</span>
                  </div>
                )}
              </>
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
                <span className="mr-5 ">{item}</span>
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
