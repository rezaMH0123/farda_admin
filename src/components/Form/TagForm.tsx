import SHARED_STRINGS from "@/constants/strings/shared.string";
import StringsE from "@/types/strings";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import Button from "../Button";
import TextInput from "../Inputs/TextInput";
import SwitchToggle from "../SwitchToggle";
import * as yup from "yup";
import "../../../yup.config";
import FormE from "@/types/form";
import { LabelI } from "@/types/models/Label.type";

type Props = {
  onCloseModal: () => void;
  value?: LabelI;
};

interface InputI {
  [FormE.TagTitle]: string;
}

const tagsSchema = yup.object().shape({
  tagTitle: yup.string().required(),
});

export default function TagForm({ onCloseModal, value }: Props) {
  const methods = useForm<InputI>({
    resolver: yupResolver(tagsSchema),
  });
  const [isPin, setIsPin] = useState<boolean>(false);

  const onSubmit: SubmitHandler<InputI> = (inputData) => {
    console.log(inputData, isPin);
  };

  console.log(methods.getValues());

  const inputValue = methods.getValues();

  return (
    <div className="h-[80%] w-[70%] flex flex-col justify-center">
      <p className="text-Black-B2 font-bold mb-[32px]">افزودن</p>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <TextInput
            name="tagTitle"
            placeholder="عنوان*"
            value={value?.title}
          />
          <div className="mt-[32px]">
            <SwitchToggle
              isActive={isPin}
              setIsActive={setIsPin}
              toggleBackground="#36B37E"
              toggleText="پین کردن*"
            />
          </div>
          <div className="flex w-full mt-[32px] gap-5">
            <Button
              title={SHARED_STRINGS[StringsE.Close]}
              model="outline_red"
              className="w-[50%]"
              onClick={onCloseModal}
            />
            <Button
              title={SHARED_STRINGS[StringsE.Add]}
              model="fill_blue"
              className="w-[50%]"
              type="submit"
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
