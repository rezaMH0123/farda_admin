import CategoryForm from "@/components/Form/CategoryForm";
import Modal from "@/components/Modal";
import TableWithApi from "@/components/TableWithApi";
import SHARED_STRINGS from "@/constants/strings/shared.string";
import { CategorieController } from "@/controllers/categorie.contoroller";
import { CategorieItem } from "@/types/models/Categories.type";
import StringsE from "@/types/strings";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import PagesHeaderSection from "../components/Header";
import RowCategory from "../components/RowCategory";

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
      <PagesHeaderSection setModal={setModal} title={passedData.data} />
      <TableWithApi<CategorieItem>
        controller={() => CategorieController.getChilds(passedData.id, 1000, 1)}
        title={chartTitles}
        keyNme="categories"
      >
        {(row) => (
          <RowCategory
            modal={modal}
            setModal={setModal}
            keyName="categories"
            {...row}
          />
        )}
      </TableWithApi>

      {modal && (
        <Modal onCloseModal={HandleCloseModal} height={45} width={30}>
          <CategoryForm
            onCloseModal={HandleCloseModal}
            title={SHARED_STRINGS[StringsE.Add]}
            controller="post"
          />
        </Modal>
      )}
    </div>
  );
}
