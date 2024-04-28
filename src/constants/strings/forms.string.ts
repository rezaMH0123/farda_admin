import FormE from "@/types/form";

const FORM_STRINGS: Record<
  FormE,
  {
    label: string;
    placeholder: string;
  }
> = {
  [FormE.Username]: {
    label: "نام کاربری",
    placeholder: "نام کاربری",
  },
  [FormE.Password]: {
    label: "رمز عبور",
    placeholder: "رمز عبور",
  },
  [FormE.TagTitle]: {
    label: "عنوان",
    placeholder: "عنوان*",
  },
};

export default FORM_STRINGS;
