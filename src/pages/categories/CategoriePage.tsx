import TableWithApi from "@/components/TableWithApi";
import { CategorieController } from "@/controllers/categorie.contoroller";
import AddCategorieModal from "@/sections/categories/AddCategorieModal";
import PagesHeaderSection from "@/sections/categories/Header";
import RowCategory from "@/sections/categories/RowCategory";
import { CategoryMain } from "@/types/models/Categories.type";
import { useState } from "react";
import { useLocation } from "react-router-dom";

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
      <PagesHeaderSection setModal={setModal} title={passedData.title} />
      <TableWithApi<CategoryMain>
        controller={(currentPage) =>
          CategorieController.getChilds(passedData.id, currentPage)
        }
        title={chartTitles}
        keyNme="category"
      >
        {(row) => (
          <RowCategory
            modal={modal}
            setModal={setModal}
            keyName="category"
            {...row}
          />
        )}
      </TableWithApi>
      <AddCategorieModal isModal={modal} HandleCloseModal={HandleCloseModal} />
    </div>
  );
}
