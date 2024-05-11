import moment from "jalali-moment";

const persianDaysOfWeek = [
  "یک‌شنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه",
  "شنبه",
];
const persianMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

export function getPersianDayOfWeek() {
  const today = moment();

  const dayOfWeekIndex = today.day();
  const persianDayOfWeek = persianDaysOfWeek[dayOfWeekIndex + 1];
  return persianDayOfWeek;
}

export function getPersianMonth() {
  const today = moment();

  const monthIndex = today.jMonth();
  const persianMonth = persianMonths[monthIndex];
  return persianMonth;
}

export function getPersianDay() {
  const today = moment();
  const day = today.jDate();
  return day;
}

export function getPersianYear() {
  const today = moment();
  const year = today.jYear();
  return year;
}

export function isShamsiDate(dateString: string) {
  return /^\d{4}\/\d{2}\/\d{2}$/.test(dateString);
}

export function convertToPersianDate(dateString: string | undefined) {
  const date = moment(dateString);
  const persianDayOfWeek = persianDaysOfWeek[date.day()];
  const persianMonth = persianMonths[date.jMonth()];
  const perisanDay = date.jDate();
  const perisanYear = date.jYear();
  return `${persianDayOfWeek} ${perisanDay} ${persianMonth} ${perisanYear}`;
}
