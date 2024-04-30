import ArrowLeft from "@/assets/img/tools/arrowLeft.svg";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

type ItemsT = {
  title: string;
  description: string;
  link: string;
  id: number;
};

const CategoryItems: ItemsT[] = [
  {
    title: "اخبار",
    description: "محتوای بارگذاری شده در قسمت اخبار نشان داده می شود.",
    link: "news",
    id: 1,
  },
  {
    title: "بلاگ",
    description: "محتوای بارگذاری شده در قسمت بلاگ نشان داده می شود.",
    link: "blog",
    id: 2,
  },
  {
    title: "آیین نامه",
    description: "محتوای بارگذاری شده در قسمت آیین نامه نشان داده می شود.",
    link: "regulations",
    id: 3,
  },
];

export default function Categories() {
  const location = useLocation();
  const navigate = useNavigate();

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
          <div className="w-full h-[80%] flex justify-center gap-5">
            {CategoryItems.map((item) => {
              return (
                <div
                  onClick={() =>
                    navigate(item.link, { state: { data: item.title } })
                  }
                  className="w-[340px] h-[200px] rounded-[14px] cursor-pointer mt-5 hover:bg-[#DBE6FF] transition-all duration-100 bg-Back-Back1"
                >
                  <div className="pt-6 pr-6 h-[30%] font-medium text-Black-B2">
                    {item.title}
                  </div>
                  <div className="pr-6 pt-2 h-[50%] text-[#A9A9A9] text-base w-[90%]">
                    {item.description}
                  </div>
                  <div className="flex justify-end pl-7">
                    <img src={ArrowLeft} alt="ArrowLeft" />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <Outlet />
      )}
    </div>
  );
}
