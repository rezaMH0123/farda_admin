import { useState } from "react";
import TextField from "../../../../components/TextFields";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import IconDatePicker from "../../../../components/Icons/DatePickerIcon";
import MyDropDown from "@/components/DropDown";
import LableSelected from "../LableSelected";
import SwitchToggle from "@/components/SwitchToggle";
import RadioButton from "@/components/RadioButton";
import Button from "@/components/Button";

const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

type ContentsModalBodyProps = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function ContentsModalBody({
  setOpenModal,
}: ContentsModalBodyProps) {
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [dateStart, setDateStart] = useState<Date | null>(null);
  const [dateEnd, setDateEnd] = useState<Date | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>("اخبار");
  const [selectedOption, setSelectedOption] = useState<string>("preview");
  const [isShare, setIsShare] = useState(false);
  const [isComment, setIsComment] = useState(false);

  const handleDateChangeStart = (
    data: Date | DateObject | DateObject[] | null
  ) => {
    if (Array.isArray(data)) {
      // handle array of DateObjects if necessary
    } else if (data instanceof DateObject) {
      setDateStart(data.toDate());
    } else {
      setDateStart(data);
    }
  };

  const handleDateChangeEnd = (
    data: Date | DateObject | DateObject[] | null
  ) => {
    if (Array.isArray(data)) {
      // handle array of DateObjects if necessary
    } else if (data instanceof DateObject) {
      setDateEnd(data.toDate());
    } else {
      setDateEnd(data);
    }
  };

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <div className="flex justify-center items-center w-full h-full ">
      <div className="h-full w-[90%] py-4">
        <div className="h-[25%]">
          <span className="font-ShabnamBold text-[20px]">افزودن محتوا</span>
          <TextField
            type="text"
            placeholder="عنوان*"
            className="border border-PrimaryBlack-300 mt-4 rounded-md pr-3 w-full h-[44px] outline-none"
            value={title}
            setTitle={setTitle}
          />

          <TextField
            type="text"
            placeholder="خلاصه*"
            className="border border-PrimaryBlack-300 mt-4 rounded-md pr-3 w-full h-[44px] outline-none"
            value={summary}
            setTitle={setSummary}
          />
        </div>
        <div className="h-fit">
          <span className="font-ShabnamRegular block mb-4">توضیحات</span>
          <CKEditor
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            editor={(window as any).ClassicEditor}
            onChange={(_event, editor) => {
              const data = editor.getData();
              console.log("Content changed:", data);
            }}
            config={{
              placeholder: "توضیحات...",
            }}
          />
        </div>
        <div className="flex justify-between items-center  h-[8%]">
          <div className="relative  w-[47%]  ">
            <div className="flex justify-between overflow-hidden items-center h-[38px] w-[100%] border border-PrimaryBlack-300 rounded-lg ">
              <div style={{ direction: "rtl" }}>
                <DatePicker
                  inputClass="custom-input"
                  weekDays={weekDays}
                  monthYearSeparator="|"
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                  style={{
                    overflow: "hidden",
                    outline: "none",
                    background: "transparent",
                    height: "100%",
                    padding: "6px",
                    width: "350px",
                    paddingRight: "30px",
                    color: "#423B6F",
                    margin: "0px",
                  }}
                  value={dateStart}
                  placeholder="از تاریخ"
                  onChange={(data) => handleDateChangeStart(data)}
                />
              </div>
              <IconDatePicker className="fill-[#B3B3B3] ml-3 absolute top-[50%] left-0 -translate-y-[50%]" />
            </div>
          </div>
          <div className="relative w-[47%]">
            <div className="flex justify-between items-center overflow-hidden h-[38px] w-[100%] border border-PrimaryBlack-300 rounded-lg ">
              <div style={{ direction: "rtl" }}>
                <DatePicker
                  inputClass="custom-input"
                  weekDays={weekDays}
                  monthYearSeparator="|"
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                  style={{
                    outline: "none",
                    background: "transparent",
                    padding: "6px",
                    width: "350px",
                    paddingRight: "30px",
                    color: "#B3B3B3",
                    margin: "0px",
                  }}
                  value={dateEnd}
                  placeholder="تا تاریخ"
                  minDate={dateStart ?? undefined}
                  onChange={(data) => handleDateChangeEnd(data)}
                />
              </div>
              <IconDatePicker className="fill-[#B3B3B3] ml-3 absolute top-[50%] left-0 -translate-y-[50%]" />
            </div>
          </div>
        </div>
        <div className=" h-[8%] flex items-center font-light  text-PrimaryBlack-600">
          <LableSelected
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        </div>
        <div className="w-full  h-[8%] flex justify-between items-center gap-x-3">
          <MyDropDown options={options} placeholder="دسته بندی‌ها*" />
          <MyDropDown placeholder="دسته بندی زیر مجموعه" />
        </div>
        <div className="flex  justify-between items-center  h-[8%] text-[13.5px]">
          <div className="flex gap-10 items-center ">
            <SwitchToggle
              isShare={isShare}
              setIsShare={setIsShare}
              toggleBackground="#36B37E"
              toggleText="قابلیت اشتراک گذاری*"
            />
            <SwitchToggle
              isShare={isComment}
              setIsShare={setIsComment}
              toggleBackground="#36B37E"
              toggleText="قابلیت کامنت گذاری*"
            />
          </div>
          <div className="flex items-center gap-x-3">
            <span className="text-PrimaryBlack-400">وضعیت نمایش*</span>
            <RadioButton
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              color={"#33BDF1"}
            />
          </div>
        </div>
        <div className="flex gap-x-4 items-center justify-end b h-[8%]">
          <Button
            onClick={() => setOpenModal(false)}
            className="border border-[#FF8A8A] text-[#FF8A8A]  h-[44px] w-[180px]"
            title={"بستن"}
          />
          <Button
            type="submit"
            className="bg-PrimaryBlue-100 text-white  h-[44px] w-[180px]"
            title={"افزودن"}
          />
        </div>
      </div>
    </div>
  );
}
