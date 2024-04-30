import ArrowLeft from "@/assets/img/tools/arrowLeft.svg";
import Skeleton from "@/components/Skeleton";
import { CategorieController } from "@/controllers/categorie.contoroller";
import { HttpResponseList } from "@/types/httpResponse";
import { CategoryMain } from "@/types/models/Categories.type";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Categories() {
  const location = useLocation();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery<HttpResponseList<CategoryMain>>({
    queryKey: ["category"],
    queryFn: () => CategorieController.getMainCategory(1000, 1),
    retry: false,
    refetchOnWindowFocus: true,
  });

  console.log(data);

  return (
    <div
      dir="rtl"
      className="border border-Black-B5 w-[80%] h-[85%] rounded-[14px] bg-W1"
    >
      {location.pathname === "/categories" ? (
        <>
          <div className="w-full h-[15%]">
            <p className="p-12 font-bold text-xl text-Black-B2">دسته بندی‌ها</p>
          </div>
          <div className="w-full h-[80%] flex justify-center flex-wrap gap-5">
            {isLoading ? (
              <div className="w-[100%] h-[40%] grid grid-cols-3 gap-6 ml-6 mr-6">
                {" "}
                <Skeleton value={6} />
              </div>
            ) : (
              data?.data.result.map((item) => {
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (item.title) {
                        navigate(item.title, { state: { data: item } });
                      }
                    }}
                    className="w-[30%] h-[40%] rounded-[14px] cursor-pointer mt-5 hover:bg-[#DBE6FF] transition-all duration-100 bg-Back-Back1"
                  >
                    <div className="pt-6 pr-6 h-[30%] font-medium text-Black-B2">
                      {item.title}
                    </div>
                    <div className="pr-6 pt-2 h-[50%] text-[#A9A9A9] text-base w-[90%]">
                      محتوای بارگذاری شده در قسمت {item.title} نشان داده می شود.
                    </div>
                    <div className="flex justify-end pl-7">
                      <img src={ArrowLeft} alt="ArrowLeft" />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      ) : (
        <Outlet />
      )}
    </div>
  );
}
