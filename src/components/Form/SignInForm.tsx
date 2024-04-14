import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import TextInput from "../Inputs/TextInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import openEye from "@/assets/img/logo/openEye.svg";
import closedEye from "@/assets/img/logo/closedEye.svg";
import person from "@/assets/img/logo/Vector.svg";
import { useState } from "react";
import Button from "../Button";
import Loading from "../Loading";
import { SigninI } from "@/types/forms/signin";
import http from "@/core/services/httpServices";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CustomToast from "../Toast";
import "../../../yup.config";

const siginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const methods = useForm<SigninI>({
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
        methods.reset();
        navigate("/");
        setLoading(false);
        toast.custom((t) => (
          <CustomToast
            text="!با موفقیت وارد شدید"
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
              text="!نام کاربری یا رمز عبور صحیح نمی‌باشد"
              animation={t}
              status="error"
            />
          ));
        } else {
          toast.custom((t) => (
            <CustomToast
              text="!مشکلی پیش آمده است"
              animation={t}
              status="error"
            />
          ));
        }
      });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="relative h-[44px] mt-6">
          <TextInput name="username" icon={person} placeholder="نام کاربری" />
        </div>
        <div className="relative h-[44px] mt-6">
          <TextInput
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="رمز عبور"
            icon={showPassword ? closedEye : openEye}
            spanOnclick={() => setShowPassword(!showPassword)}
          />
        </div>
        <Button
          type="submit"
          className="mt-8 h-[44px] w-full font-bold bg-PrimaryBlue-100 text-[#FFFFFF] leading-5 disabled:bg-[#a2e5fd] disabled:cursor-not-allowed"
          title={
            loading ? <Loading className={"bg-PrimaryBlack-200"} /> : "ورود"
          }
          disable={loading ? true : false}
        />
      </form>
    </FormProvider>
  );
}
