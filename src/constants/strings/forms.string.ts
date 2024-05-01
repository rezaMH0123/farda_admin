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
  [FormE.Title]: {
    label: "عنوان",
    placeholder: "عنوان*",
  },
  [FormE.ParentId]: {
    label: "دسته بندی اصلی",
    placeholder: "دسته بندی اصلی*",
  },

  [FormE.Summary]: {
    label: "خلاصه",
    placeholder: "خلاصه*",
  },
  [FormE.IsPin]: {
    label: "قابلیت اشتراک گذاری",
    placeholder: "قابلیت اشتراک گذاری*",
  },
  [FormE.IsComment]: {
    label: "قابلیت کامنت گذاری",
    placeholder: "قابلیت کامنت گذاری*",
  },
  [FormE.Category]: {
    label: "دسته بندی‌ها",
    placeholder: "دسته بندی‌ها*",
  },
  [FormE.Subcategory]: {
    label: "زیر دسته بندی‌ها",
    placeholder: "زیر دسته بندی‌ها*",
  },
  [FormE.SelectedLable]: {
    label: "برچسب ها",
    placeholder: "برچسب ها*",
  },
  [FormE.IsShare]: {
    label: "قابلیت اشتراک گذاری",
    placeholder: "قابلیت اشتراک گذاری*",
  },
};

export default FORM_STRINGS;
