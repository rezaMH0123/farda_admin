import { Link, useLocation } from "react-router-dom";
import { sidebarItems } from "@/constants/items/sideBarItems";
import Logout from "@/components/Icons/Logout";
import { RemoveFromStorage } from "@/utils/storage";
import Modal from "@/components/Modal";
import { useModal } from "@/context/modalContext";
import Button from "@/components/Button";
import SHARED_STRINGS from "@/constants/strings/shared.string";
import StringsE from "@/types/strings";

export default function SideBar() {
  const location = useLocation();

  const { isLogoutModal, openLogoutModal, closeLogoutModal } = useModal();

  const HandleLogout = () => {
    RemoveFromStorage("access_token");
    window.location.reload();
    closeLogoutModal();
  };

  const active = "shadow-custom1 text-[#33BDF1]";
  return (
    <div
      dir="rtl"
      className="flex flex-col justify-between h-[85%] w-[20%] bg-Back-Back1 rounded-[14px] font-medium select-none"
    >
      <ul className=" flex flex-col gap-y-5  mt-16">
        {sidebarItems.map((item, index) => (
          <Link key={index} to={item.link}>
            <li
              className={`${
                (location.pathname === item.link ||
                  location.pathname === item?.childLink) &&
                active
              } w-[75%] text-Black-B2 flex gap-x-3 mr-5 p-2 cursor-pointer rounded-md`}
            >
              <item.icon
                className={`${
                  location.pathname === item.link ||
                  location.pathname === item?.childLink
                    ? "fill-Blue-PrimaryBlue"
                    : "fill-Black-B2"
                }`}
              />
              <span
                className={`${
                  (location.pathname === item.link ||
                    location.pathname === item?.childLink) &&
                  "text-Blue-PrimaryBlue"
                }`}
              >
                {item.title}
              </span>
            </li>
          </Link>
        ))}
      </ul>
      <div
        className="flex w-fit gap-x-3 items-center p-2 mr-5 mb-10 cursor-pointer text-Red-R1"
        onClick={openLogoutModal}
      >
        <Logout className="fill-Red-R1" />
        <span>{SHARED_STRINGS[StringsE.Logout]}</span>
      </div>
      {isLogoutModal && (
        <Modal width={25} height={30}>
          <div className="w-full h-full flex items-center flex-col">
            <div className="h-[40%] text-Black-B4 flex items-end">
              {SHARED_STRINGS[StringsE.ConfirmLogoutMessage]}
            </div>
            <div className="w-[70%] h-[60%] m-auto flex gap-5 fles items-center">
              <Button
                className="text-sm w-[50%]"
                model="outline_gray"
                title={SHARED_STRINGS[StringsE.Cancel]}
                onClick={closeLogoutModal}
              />
              <Button
                className="text-sm w-[50%]"
                model="fill_red"
                title={SHARED_STRINGS[StringsE.Logout]}
                onClick={HandleLogout}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
