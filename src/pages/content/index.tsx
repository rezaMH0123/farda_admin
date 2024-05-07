import TableWithApi from "@/components/TableWithApi";
import SHARED_STRINGS from "@/constants/strings/shared.string";
import { contentController } from "@/controllers/content.controller";
import ContentHeaderSection from "@/sections/content/components/ContentHeaderSection";
import RowContent from "@/sections/content/components/RowContent";
import { Advertisement } from "@/types/models/Content.type";
import StringsE from "@/types/strings";

export default function Content() {
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
      <ContentHeaderSection title={SHARED_STRINGS[StringsE.Content]} />
      <TableWithApi<Advertisement>
        controller={contentController.getContent}
        title={chartTitles}
        keyNme="content"
      >
        {(row) => <RowContent keyName="content" {...row} />}
      </TableWithApi>
    </div>
  );
}
