import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import More from "@/assets/img/tools/more.svg";

type MenuItemsT = {
  name: string;
};

export type DropDownMenuProps = {
  menuItemsT: MenuItemsT[];
};

export default function DropDownMenu({ menuItemsT }: DropDownMenuProps) {
  return (
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
        <Menu.Items className="origin-top-right absolute left-[-10px] mt-1 w-56 rounded-md shadow-lg bg-PrimaryBlack-300 ring-1 ring-black ring-opacity-5 divide-y divide-gray-300 focus:outline-none">
          {menuItemsT.map((item, index) => (
            <div key={index} className="py-1">
              <Menu.Item>
                <p className="cursor-pointer">{item.name}</p>
              </Menu.Item>
            </div>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
