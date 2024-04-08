import More from "@/assets/img/tools/more.svg";
import Pdf from "@/assets/img/tools/pdf.svg";
import Word from "@/assets/img/tools/word.svg";
import Exel from "@/assets/img/tools/exel.svg";
import PdfFile from "@/assets/img/tools/file.svg";
import WordFile from "@/assets/img/tools/wordFile.svg";
import ExelFile from "@/assets/img/tools/excelFile.svg";

export default function FileCard({ files }: { files: File[] }) {
  return files?.map((item, index) => {
    const fileType = item.name.split(".").pop()?.toLowerCase();
    return (
      <div
        key={index}
        className="h-[200px] w-[100%] rounded-[20px] bg-[#DEE8FF] custom-shadow"
      >
        <div className="w-[91%] h-[20%] m-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            {" "}
            <img
              src={
                fileType === "pdf"
                  ? Pdf
                  : fileType === "docx"
                  ? Word
                  : fileType === "xlsx" || fileType === "xls"
                  ? Exel
                  : ""
              }
              alt="fileType"
            />
            <p className="font-ShabnamRegular text-xs text-PrimaryBlack-300">
              {item.name.substring(0, item.name.lastIndexOf("."))}
            </p>
          </div>
          <img src={More} alt="more" className="cursor-pointer" />
        </div>
        <div className="w-[95%] h-[123px] flex justify-center items-center rounded m-auto">
          <img
            src={
              fileType === "pdf"
                ? PdfFile
                : fileType === "docx"
                ? WordFile
                : fileType === "xlsx" || fileType === "xls"
                ? ExelFile
                : ""
            }
            alt="file"
          />
        </div>
        <div className="w-full h-[20%] flex items-center justify-center">
          <p className="font-ShabnamRegular text-PrimaryBlack-500">
            شنبه ۲۶ اسفند ۱۴۰۲
          </p>
        </div>
      </div>
    );
  });
}
