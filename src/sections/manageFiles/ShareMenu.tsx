import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import telegramImg from "@/assets/img/tools/telegram.svg";
import whatsappImg from "@/assets/img/tools/whatsapp.svg";
import linkedinImg from "@/assets/img/tools/linkedin.svg";
import emailImg from "@/assets/img/tools/gmail.svg";
import {
  LinkedinShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "react-share";
import { FilesI } from "@/types/models/Files.type";
import SHARED_STRINGS from "@/constants/strings/shared.string";
import StringsE from "@/types/strings";

type Props = {
  items: FilesI;
};

export default function ShareMenu({ items }: Props) {
  return (
    <div>
      <Menu as="div" className="relative text-center">
        <Menu.Button>{SHARED_STRINGS[StringsE.Share]}</Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="flex items-center justify-center gap-4">
            <Menu.Item>
              <>
                <TelegramShareButton url={items.fileUrl}>
                  <img
                    src={telegramImg}
                    alt="telegram"
                    className="cursor-pointer"
                  />
                </TelegramShareButton>
                <WhatsappShareButton url={items.fileUrl}>
                  <img
                    src={whatsappImg}
                    alt="whatsapp"
                    className="cursor-pointer"
                  />
                </WhatsappShareButton>
                <LinkedinShareButton url={items.fileUrl}>
                  <img
                    src={linkedinImg}
                    alt="linkedin"
                    className="cursor-pointer"
                  />
                </LinkedinShareButton>
                <EmailShareButton url={items.fileUrl}>
                  <img src={emailImg} alt="email" className="cursor-pointer" />
                </EmailShareButton>
              </>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
