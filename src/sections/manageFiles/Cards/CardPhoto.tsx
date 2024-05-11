import { FilesI } from "@/types/models/Files.type";
import Square from "@/assets/img/tools/square.svg";
import { PhotoMenuItems } from "@/constants/items/dropDownMenuItems";
import DropDownMenu from "../DropDownMenu";
import { Link } from "react-router-dom";
import { convertToPersianDate } from "@/utils/helper";

interface CardPhotoProps {
  item: FilesI | undefined;
}

export default function CardPhoto({ item }: CardPhotoProps) {
  const shamsiDate = convertToPersianDate(item?.uploadFileDateTime);

  return (
    <>
      {item && (
        <div
          key={item.id}
          className="h-[190px] w-[100%] rounded-[20px] bg-Blue-CardBack custom-shadow"
        >
          <div className="w-[91%] h-[20%] m-auto flex items-center justify-between">
            <img src={Square} alt="square" className="cursor-pointer" />
            <DropDownMenu items={item} menuItemsT={PhotoMenuItems} />
          </div>
          <Link to={item.fileUrl} target="_blank">
            <div
              className="w-[95%] h-[123px] rounded m-auto bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${item.fileUrl})` }}
            />
          </Link>
          <div className="w-full h-[15%] flex items-center justify-center">
            <p className="font-normal text-[#667085]">{shamsiDate}</p>
          </div>
        </div>
      )}
    </>
  );
}
