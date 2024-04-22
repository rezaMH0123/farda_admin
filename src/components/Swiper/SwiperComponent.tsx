import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FilesI } from "@/types/models/Files.type";

type SwiperComponentProps = {
  data: FilesI[] | undefined;
  row?: number;
};

export default function SwiperComponent({
  data,
  row = 1,
}: SwiperComponentProps) {
  const chunkArray = (array: FilesI[], size: number): FilesI[][] => {
    const chunkedArray: FilesI[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
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
                  className={`border border-blue-600 ${
                    row === 2 ? "w-[23%] h-[40%]" : "w-[24%] h-[85%]"
                  }  rounded-md`}
                ></div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
