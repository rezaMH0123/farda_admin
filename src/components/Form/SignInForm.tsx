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
import { SetToStorage } from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import { SigninController } from "@/controllers/signin.controller";
import { HttpApiResponse } from "@/types/httpResponse";
import { SiginData } from "@/types/signin";
import SHARED_STRINGS from "@/constants/strings/shared.string";
import StringsE from "@/types/strings";
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
    const res = await signinMutate(inputsData);
    console.log(res);
    if (res.data && res.isSuccess) {
      const access_token = res.data.tokenResponse.access_token;
      console.log(access_token);
      SetToStorage({
        key: "access_token",
        value: access_token,
        expireTime: 2,
      });
      methods.reset();
      navigate("/");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="relative h-[44px] mt-6">
          <TextInput
            name="username"
            icon={person}
            placeholder={SHARED_STRINGS[StringsE.UserName]}
          />
        </div>
        <div className="relative h-[44px] mt-6">
          <TextInput
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder={SHARED_STRINGS[StringsE.Password]}
            icon={showPassword ? closedEye : openEye}
            spanOnclick={() => setShowPassword(!showPassword)}
          />
        </div>
        <Button
          type="submit"
          model="fill_blue"
          className="mt-8 w-full font-bold"
          title={
            isPending ? (
              <Loading className={"bg-Black-B2"} />
            ) : (
              <>{SHARED_STRINGS[StringsE.Login]}</>
            )
          }
          disable={isPending ? true : false}
        />
      </form>
    </FormProvider>
  );
}
