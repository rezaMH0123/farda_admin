import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FilesI } from "@/types/models/Files.type";
import pdfImage from "@/assets/img/tools/file.svg";
import xelImage from "@/assets/img/tools/excelFile.svg";
import docImage from "@/assets/img/tools/wordFile.svg";

type SwiperComponentProps = {
  data: FilesI[] | undefined;
  row?: number;
  setSelecteditem?: React.Dispatch<React.SetStateAction<string | undefined>>;
  selecteditem?: string | undefined;
  setSelecteditems?: React.Dispatch<React.SetStateAction<string[]>>;
  selecteditems?: string[];
  type: string;
};

export default function SwiperComponent({
  data,
  row = 1,
  type,
  setSelecteditem,
  setSelecteditems,
  selecteditems,
  selecteditem,
}: SwiperComponentProps) {
  const chunkArray = (
    array: FilesI[] | undefined,
    size: number
  ): FilesI[][] => {
    if (!array) return [];
    const chunkedArray: FilesI[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  };
  const handleRadioSelect = (itemId: string) => {
    if (setSelecteditem) setSelecteditem(itemId);
  };

  const handleCheckboxToggle = (itemId: string) => {
    const isSelected = selecteditems?.includes(itemId) || false;
    setSelecteditems &&
      setSelecteditems((prevSelectedItems) => {
        if (isSelected) {
          return prevSelectedItems
            ? prevSelectedItems.filter((id) => id !== itemId)
            : [];
        } else {
          return prevSelectedItems ? [...prevSelectedItems, itemId] : [itemId];
        }
      });
  };

  return (
    <>
      <Swiper navigation={true} modules={[Navigation]}>
        {chunkArray(data, row * 4).map((chunk, index) => (
          <SwiperSlide
            key={index}
            style={{ background: "#F2F2F2" }}
            className="flex gap-x-3 rounded-lg "
          >
            <div
              className={`${
                row === 2 ? "flex flex-wrap" : "flex"
              } justify-center items-center gap-x-3  h-full w-[88%]`}
            >
              {chunk.map((item, index) => (
                <div
                  key={index}
                  className={`relative border border-[#C8C8C8] flex justify-center items-center ${
                    row === 2 ? "w-[23%] h-[40%]" : "w-[24%] h-[85%]"
                  }  rounded-md`}
                >
                  {type === "radio" && (
                    <>
                      <label
                        className={`${
                          selecteditem === item.id ? "bg-PrimaryBlue-100" : ""
                        } w-5 h-5 border border-PrimaryBlue-100 rounded-full absolute top-2 right-2 flex justify-center items-center`}
                        htmlFor={`radio_${item.id}`}
                      >
                        {selecteditem === item.id && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="white"
                            className="w-4 h-4 fill-white"
                          >
                            <path d="M16.288 4.712a1 1 0 0 1 1.414 1.414l-9 9a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L8 12.586l8.288-8.288a1 1 0 0 1 1.414 0z" />
                          </svg>
                        )}
                      </label>
                      <input
                        type="radio"
                        id={`radio_${item.id}`}
                        className="hidden"
                        value={item.id}
                        checked={!!selecteditem && selecteditem === item.id}
                        onChange={() => handleRadioSelect(item.id)}
                      />
                    </>
                  )}

                  {type === "checkbox" && (
                    <>
                      <label
                        className={`${
                          selecteditems && selecteditems.includes(item.id)
                            ? "bg-PrimaryBlue-100"
                            : ""
                        } w-5 h-5 border border-PrimaryBlue-100 rounded-full absolute top-2 right-2 flex justify-center items-center`}
                        htmlFor={`checkbox_${item.id}`}
                      >
                        {selecteditems && selecteditems.includes(item.id) && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="white"
                            className="w-4 h-4 fill-white"
                          >
                            <path d="M16.288 4.712a1 1 0 0 1 1.414 1.414l-9 9a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L8 12.586l8.288-8.288a1 1 0 0 1 1.414 0z" />
                          </svg>
                        )}
                      </label>
                      <input
                        type="checkbox"
                        id={`checkbox_${item.id}`}
                        className="hidden"
                        value={item.id}
                        checked={
                          selecteditems && selecteditems.includes(item.id)
                        }
                        onChange={() => handleCheckboxToggle(item.id)}
                      />
                    </>
                  )}

                  {item.extention === ".pdf" ? (
                    <img src={pdfImage} alt={pdfImage} className="fileUpload" />
                  ) : item.extention === ".mp4" ? (
                    <></>
                  ) : item.extention === "xlsx" ||
                    item.extention === "xltx" ||
                    item.extention === "xlsm" ||
                    item.extention === "xltm" ||
                    item.extention === "xls" ? (
                    <img src={xelImage} alt={xelImage} className="fileUpload" />
                  ) : item.extention === "docx" ? (
                    <img src={docImage} alt={docImage} className="fileUpload" />
                  ) : (
                    <img
                      src={item.fileUrl}
                      alt={item.filename}
                      className="w-full h-full rounded-md"
                    />
                  )}
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
