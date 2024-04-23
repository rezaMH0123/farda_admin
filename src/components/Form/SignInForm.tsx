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
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CustomToast from "../Toast";
import { SetToStorage } from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import { SigninController } from "@/controllers/signin.controller";
import { HttpApiResponse } from "@/types/httpResponse";
import { SiginData } from "@/types/signin";
import { AxiosError } from "axios";
import "../../../yup.config";

const siginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const methods = useForm<SigninI>({
    resolver: yupResolver(siginSchema),
  });

  const { mutateAsync: signinMutate, isPending } = useMutation<
    HttpApiResponse<SiginData>,
    unknown,
    SigninI
  >({
    mutationFn: SigninController,
  });

  const onSubmit: SubmitHandler<SigninI> = async (inputsData) => {
    try {
      const res = await signinMutate(inputsData);
      console.log(res);
      if (res.data && res.isSuccess) {
        const access_token = res.data.access_token;
        console.log(access_token);
        SetToStorage({
          key: "access_token",
          value: access_token,
          expireTime: 2,
        });
        methods.reset();
        navigate("/");
        toast.custom((t) => (
          <CustomToast
            text="!با موفقیت وارد شدید"
            animation={t}
            status="success"
          />
        ));
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err);
        if (err.response && err.response.status === 400) {
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
      }
    }
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
          model="fill_blue"
          className="mt-8 w-full font-bold"
          title={isPending ? <Loading className={"bg-Black-B2"} /> : "ورود"}
          disable={isPending ? true : false}
        />
      </form>
    </FormProvider>
  );
}
