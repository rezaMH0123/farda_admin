import ContentHeaderSection from "@/sections/content/components/ContentHeaderSection";
import { Outlet, useLocation } from "react-router-dom";
import SHARED_STRINGS from "@/constants/strings/shared.string";
import StringsE from "@/types/strings";
import { Advertisement } from "@/types/models/Content.type";
import { contentController } from "@/controllers/content.controller";
import RowContent from "./components/RowContent";
import TableWithApi from "@/components/TableWithApi";

export default function Content() {
  const location = useLocation();

  const chartTitles = [
    "عنوان",
    "وضعیت",
    "اشتراک گذاری",
    "کامنت گذاری",
    "عملیات",
  ];

  return (
    <div
      dir="rtl"
      className="border border-Black-B5 w-[80%] h-[85%] rounded-[14px] bg-W1"
    >
      {location.pathname === "/content" || location.pathname === "/content/" ? (
        <>
          <ContentHeaderSection title={SHARED_STRINGS[StringsE.Content]} />
          <TableWithApi<Advertisement>
            controller={contentController.getContent}
            title={chartTitles}
            keyNme="content"
          >
            {(row) => <RowContent keyName="content" {...row} />}
          </TableWithApi>
        </>
      ) : (
        <Outlet />
      )}
    </div>
  );
}
