import { Link, useLocation } from "react-router-dom";
import { sidebarItems } from "@/constants/items/sideBarItems";
import Logout from "@/components/Icons/Logout";

export default function SideBar() {
  const location = useLocation();

  const active = "shadow-custom1 text-[#33BDF1]";
  return (
    <div
      dir="rtl"
      className="flex flex-col justify-between h-[85%] w-[20%] bg-[#EFF4FF] rounded-lg font-ShabnamMedium select-none"
    >
      <ul className=" flex flex-col gap-y-5  mt-16">
        {sidebarItems.map((item, index) => (
          <Link key={index} to={item.link}>
            <li
              className={`${
                location.pathname === item.link && active
              } w-[75%] text-[#565656] flex gap-x-3 mr-5 p-2 cursor-pointer rounded-md `}
            >
              <item.icon
                fill={`${
                  location.pathname === item.link ? "#33BDF1" : "#565656"
                }`}
              />
              <span
                className={`${
                  location.pathname === item.link && "text-[#33BDF1]"
                }`}
              >
                {item.title}
              </span>
            </li>
          </Link>
        ))}
      </ul>
      <div className="flex gap-x-3 items-center p-2  mr-5  mb-10 cursor-pointer text-[#FF8A8A]">
        <Logout fill="#FF8A8A" />
        <span>خروج</span>
      </div>
    </div>
  );
}
