import { FilesI } from "@/types/models/Files.type";
import Square from "@/assets/img/tools/square.svg";
import DropDownMenu from "./DropDownMenu";

export default function Photos({ photos }: { photos?: FilesI[] }) {
  return (
    <>
      {photos?.length === 0 ? (
        <>there is no photos</>
      ) : (
        photos?.map((item) => (
          <div
            key={item.id}
            className="h-[200px] w-[100%] rounded-[20px] bg-[#DEE8FF] custom-shadow"
          >
            <div className="w-[91%] h-[20%] m-auto flex items-center justify-between">
              <img src={Square} alt="square" className="cursor-pointer" />
              <DropDownMenu />
            </div>
            <div
              className="w-[95%] h-[123px] rounded m-auto bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${item.fileUrl})` }}
            ></div>
            <div className="w-full h-[20%] flex items-center justify-center">
              <p className="font-ShabnamRegular text-PrimaryBlack-500">
                سه‌شنبه 21 فروردین 1403
              </p>
            </div>
          </div>
        ))
      )}
    </>
  );
}
