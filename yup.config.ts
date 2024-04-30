import FORM_STRINGS from "@/constants/strings/forms.string";
import VALIDATION_STRINGS from "@/constants/strings/validation.string";
import FormE from "@/types/form";
import { setLocale } from "yup";

setLocale({
  mixed: {
    required: ({ path }) =>
      VALIDATION_STRINGS.required(FORM_STRINGS[path as FormE].label),
  },
  array: {
    min: ({ path }) =>
      VALIDATION_STRINGS.minArray(1, FORM_STRINGS[path as FormE].label),
  },
  string: {
    matches: ({ path }) => path,
  },
});
