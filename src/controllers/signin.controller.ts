import http from "@/core/services/httpServices";
import { SigninI } from "@/types/forms/signin";

export async function SigninController(data: SigninI) {
  try {
    const res = await http.post("Panel/Login", {
      username: data.username,
      password: data.password,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
