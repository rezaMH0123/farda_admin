import TagForm from "@/components/Form/TagForm";
import Modal from "@/components/Modal";
import TableWithApi from "@/components/TableWithApi";
import SHARED_STRINGS from "@/constants/strings/shared.string";
import { labelController } from "@/controllers/label.controller";
import { LabelI } from "@/types/models/Label.type";
import StringsE from "@/types/strings";
import { useState } from "react";
import LabelHeaderSection from "./components/Header";
import RowLabel from "./components/RowLabel";

const chartTitles = ["عنوان", "پین بودن", "عملیات"];

export default function Labels() {
  const [modal, setModal] = useState<boolean>(false);

  const HandleCloseModal = () => {
    setModal(false);
  };

  return (
    <div
      dir="rtl"
      className="border border-Black-B5 w-[80%] h-[85%] rounded-[14px] bg-W1"
    >
      <LabelHeaderSection setModal={setModal} title="تگ‌ها" />
      <TableWithApi<LabelI>
        controller={labelController.getLabel}
        title={chartTitles}
        keyNme="tags"
      >
        {(row) => (
          <RowLabel modal={modal} setModal={setModal} keyName="tags" {...row} />
        )}
      </TableWithApi>

      {modal && (
        <Modal onCloseModal={HandleCloseModal} height={45} width={30}>
          <TagForm
            onCloseModal={HandleCloseModal}
            title={SHARED_STRINGS[StringsE.Add]}
            controller="post"
          />
        </Modal>
      )}
    </div>
  );
}
