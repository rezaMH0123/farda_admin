import Modal from "@/components/Modal";
import TableWithApi from "@/components/TableWithApi";
import { labelController } from "@/controllers/label.controller";
import RowLabel from "@/sections/labels/components/RowLabel";
import { LabelI } from "@/types/models/Label.type";
import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import PagesHeaderSection from "../components/Header";

const chartTitles = ["عنوان", "پین بودن", "عملیات"];

export default function CategoryPage() {
  const [modal, setModal] = useState<boolean>(false);
  const location = useLocation();

  const HandleCloseModal = () => {
    setModal(false);
  };
  const passedData = location.state?.data;
  return (
    <div className="h-full">
      <PagesHeaderSection setModal={setModal} title={passedData} />
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
          <div></div>
        </Modal>
      )}
    </div>
  );
}
