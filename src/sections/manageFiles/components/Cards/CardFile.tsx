import { FilesI } from "@/types/models/Files.type";
import DropDownMenu from "../DropDownMenu";
import { FileMenuItems } from "@/constants/items/dropDownMenuItems";
import Pdf from "@/assets/img/tools/pdf.svg";
import Word from "@/assets/img/tools/word.svg";
import Exel from "@/assets/img/tools/exel.svg";
import PdfFile from "@/assets/img/tools/file.svg";
import WordFile from "@/assets/img/tools/wordFile.svg";
import ExelFile from "@/assets/img/tools/excelFile.svg";
import { Link } from "react-router-dom";

interface CardFileProps {
  item: FilesI;
}

export default function CardFile({ item }: CardFileProps) {
  const fileType: string = item.extention;
  return (
    <div
      key={item.id}
      className="h-[200px] w-[100%] rounded-[20px] bg-[#DEE8FF] custom-shadow"
    >
      <div className="w-[91%] h-[20%] m-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={
              fileType === ".pdf"
                ? Pdf
                : fileType === ".docx"
                ? Word
                : fileType === ".xlsx" || fileType === ".xls"
                ? Exel
                : ""
            }
            alt="fileType"
          />
          <p className="font-normal text-xs text-PrimaryBlack-300">
            {item.filename}
          </p>
        </div>
        <DropDownMenu items={item} menuItemsT={FileMenuItems} />
      </div>
      <Link to={item.fileUrl} target="_blank">
        <div className="w-[95%] h-[123px] flex justify-center items-center rounded m-auto">
          <img
            src={
              fileType === ".pdf"
                ? PdfFile
                : fileType === ".docx"
                ? WordFile
                : fileType === ".xlsx" || fileType === ".xls"
                ? ExelFile
                : ""
            }
            alt="file"
          />
        </div>
      </Link>
      <div className="w-full h-[20%] flex items-center justify-center">
        <p className="font-normal text-PrimaryBlack-500">
          سه‌شنبه 21 فروردین 1403
        </p>
      </div>
    </div>
  );
}
