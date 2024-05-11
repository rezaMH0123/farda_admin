import { ErrorToast, SuccessToast } from "@/components/Toast";
import SHARED_STRINGS from "@/constants/strings/shared.string";
import http from "@/core/services/httpServices";
import { SigninI } from "@/types/forms/signin";
import StringsE from "@/types/strings";
import { AxiosError } from "axios";

export async function SigninController(data: SigninI) {
  try {
    const res = await http.post("Panel/Login", data);
    SuccessToast(SHARED_STRINGS[StringsE.SigninSuccessMessage]);
    return res.data;
  } catch (err) {
    console.log(err);
    if (err instanceof AxiosError) {
      const errorMessage = err.response?.data.message;
      ErrorToast(errorMessage);
    }
    throw err;
  }
}
