import { FC } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

const Datepicker: FC<{
  value?: string;
  from?: Date;
  end?: string;
  onChange: (value: string) => void;
}> = ({ value = "", onChange, end }) => {
  return (
    <DatePicker
      inputClass="custom-input"
      weekDays={weekDays}
      monthYearSeparator="|"
      calendar={persian}
      locale={persian_fa}
      minDate={end}
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
      value={new Date(value)}
      placeholder="از تاریخ"
      onChange={(date: DateObject) => {
        if (date) {
          onChange(date.toDate().toISOString());
        }
      }}
    />
  );
};

export default Datepicker;
