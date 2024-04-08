import { useState } from "react";
import openEye from "@/assets/img/logo/openEye.svg";
import closedEye from "@/assets/img/logo/closedEye.svg";
import person from "@/assets/img/logo/Vector.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";
import TextField from "@/components/TextFields";
import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { SigninI } from "@/types/forms/signin";
import FormE from "@/types/form";
import "../../../yup.config";
import Cookies from "js-cookie";
import http from "@/core/services/httpServices";
import CustomToast from "../Toast";

const siginSchema = yup.object().shape({
  [FormE.Username]: yup.string().required(),
  [FormE.Password]: yup.string().required(),
});

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SigninI>({
    resolver: yupResolver(siginSchema),
  });

  const onSubmit: SubmitHandler<SigninI> = async (inputsData) => {
    setLoading(true);

    await http
      .post("Panel/Login", {
        username: inputsData.username,
        password: inputsData.password,
      })
      .then((response) => {
        const data = response.data;
        const access_token = data.data.access_token;
        Cookies.set("access_token", access_token, { expires: 2 });
        reset();
        navigate("/");
        setLoading(false);
        toast.custom((t) => (
          <CustomToast
            text=".با موفقیت وارد شدید"
            backgroundColor="#76f18b"
            animation={t}
            status="success"
          />
        ));
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 400) {
          toast.custom((t) => (
            <CustomToast
              text=".نام کاربری یا رمز عبور صحیح نمی‌باشد"
              backgroundColor="#f93838"
              animation={t}
              status="error"
            />
          ));
        } else {
          toast.custom((t) => (
            <CustomToast
              text=".مشکلی پیش آمده است"
              backgroundColor="#f93838"
              animation={t}
              status="error"
            />
          ));
        }
      });

    // try {
    //   const res = await http.post("Panel/Login", {
    //     username: inputsData.username,
    //     password: inputsData.password,
    //   });
    //   console.log(res);
    // } catch (error) {
    //   const err = error as AxiosError;
    // }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      {/* username input */}
      <TextField
        register={register("username")}
        placeholder="نام کاربری"
        type="text"
        className={`mt-6 w-full h-[44px] text-base font-ShabnamRegular leading-6 border px-[14px] rounded-lg outline-none ${
          errors.username ? "border-PrimaryRed-200" : "border-PrimaryBlack-300"
        }`}
        spanClassname="absolute inset-y-11 left-0 pl-[14px] flex items-center"
        icon={person}
        containerClassname="relative"
      />
      {errors.username && (
        <p className="text-Priborder-PrimaryRed-200 text-xs font-ShabnamRegular leading-5 mt-1">
          {errors.username.message}
        </p>
      )}
      {/* password input */}
      <TextField
        register={register("password")}
        placeholder="رمز عبور"
        className={` w-full h-[44px] text-base  font-ShabnamRegular leading-6 border px-[14px] rounded-lg outline-none ${
          errors.password ? "border-PrimaryRed-200" : "border-PrimaryBlack-300"
        }`}
        type={`${showPassword ? "text" : "password"}`}
        spanClassname="absolute top-[50%] translate-y-[-50%] left-0 pl-[14px] flex items-center cursor-pointer"
        icon={showPassword ? closedEye : openEye}
        spanOnclick={() => setShowPassword(!showPassword)}
        containerClassname="relative h-[44px] mt-6"
      />
      {errors.password && (
        <p className="text-Priborder-PrimaryRed-200 text-xs font-ShabnamRegular leading-5 mt-1">
          {errors.password.message}
        </p>
      )}
      {/* sigin button */}
      <Button
        type="submit"
        className="mt-8 h-[44px] w-full  font-ShabnamBold bg-PrimaryBlue-100 text-[#FFFFFF] leading-5 disabled:bg-[#a2e5fd] disabled:cursor-not-allowed"
        title={loading ? <Loading className={"bg-PrimaryBlack-200"} /> : "ورود"}
        disable={loading ? true : false}
      />
    </form>
  );
}
