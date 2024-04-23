import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import More from "@/assets/img/tools/more.svg";
import { useModal } from "@/context/modalContext";
import { useGlobalState } from "@/context/globalStateContext";
import { FilesI } from "@/types/models/Files.type";
import ShareMenu from "./ShareMenu";

type MenuItemsT = {
  name: string;
};

export type DropDownMenuProps = {
  menuItemsT: MenuItemsT[];
  items: FilesI;
};

export default function DropDownMenu({ menuItemsT, items }: DropDownMenuProps) {
  const { openDeleteModal } = useModal();
  const { setItemFile } = useGlobalState();

  const HandleDropDownMenu = (name: string) => {
    setItemFile(items);
    if (name === "حذف") {
      openDeleteModal();
    }
  };

  return (
    <div>
      <Menu as="div" className="relative inline-block text-center">
        <Menu.Button>
          <img src={More} alt="more" className="cursor-pointer mt-2" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute left-[-8px] mt-1 w-36 rounded-md shadow-lg bg-Black-B3 ring-1 ring-black ring-opacity-5 divide-y divide-gray-300 focus:outline-none z-10">
            {menuItemsT.map((item, index) => (
              <div key={index} className="py-1">
                <Menu.Item>
                  {item.name === "اشتراک‌گذاری" ? (
                    <ShareMenu items={items} />
                  ) : (
                    <p
                      className="cursor-pointer"
                      onClick={() => HandleDropDownMenu(item.name)}
                    >
                      {item.name}
                    </p>
                  )}
                </Menu.Item>
              </div>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
