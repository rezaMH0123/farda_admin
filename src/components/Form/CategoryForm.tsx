import SHARED_STRINGS from "@/constants/strings/shared.string";
import { CategorieItem } from "@/types/models/Categories.type";
import StringsE from "@/types/strings";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Button from "../Button";
import TextInput from "../Inputs/TextInput";
import SwitchToggle from "../SwitchToggle";

type Props = {
  title: string;
  onCloseModal: () => void;
  value?: CategorieItem;
  controller: "post" | "put";
};

export default function CategoryForm({ title, onCloseModal }: Props) {
  const [isShare, setIsShare] = useState<boolean>(false);
  const methods = useForm();

  const onSubmit = () => {
    console.log("first");
  };

  return (
    <div className="h-[85%] w-[70%] flex flex-col justify-center">
      <p className="text-Black-B2 font-bold mb-[32px]">{title}</p>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="h-[45%]">
            <TextInput name="title" placeholder="عنوان*" />
            <TextInput
              name="title"
              placeholder="دسته بندی اصلی*"
              className="mt-6"
            />
          </div>
          <div className="mt-[32px] h-[10%]">
            <SwitchToggle
              isActive={isShare}
              setIsActive={setIsShare}
              toggleBackground="#36B37E"
              toggleText="قابلیت اشتراک گذاری*"
            />
          </div>
          <div className="flex h-[20%] w-full mt-[32px] gap-5">
            <Button
              title={SHARED_STRINGS[StringsE.Close]}
              model="outline_red"
              className="w-[50%]"
              onClick={onCloseModal}
              type="button"
            />
            <Button
              type="submit"
              model="fill_blue"
              className="w-[50%]"
              title={
                // postPending || putPending ? (
                //   <Loading className={"bg-Black-B2"} />
                // ) : (
                //   title
                // )
                title
              }
              //   disable={postPending}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
