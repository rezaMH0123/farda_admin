import SHARED_STRINGS from "@/constants/strings/shared.string";
import StringsE from "@/types/strings";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import Button from "../Button";
import TextInput from "../Inputs/TextInput";
import SwitchToggle from "../SwitchToggle";
import { LabelI, TagI } from "@/types/models/Label.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HttpApiResponse } from "@/types/httpResponse";
import { labelController } from "@/controllers/label.controller";
import Loading from "../Loading";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../../yup.config";

type Props = {
  onCloseModal: () => void;
  value?: LabelI;
  title: string;
  controller: "post" | "put";
};

const tagsSchema = yup.object().shape({
  title: yup.string().required(),
  isPin: yup.boolean().required(),
});

export default function TagForm({
  onCloseModal,
  value,
  title,
  controller,
}: Props) {
  const methods = useForm<TagI>({
    resolver: yupResolver(tagsSchema),
    defaultValues: {
      isPin: value?.isPin ? value.isPin : false,
      title: value?.title ? value.title : "",
    },
  });
  const queryClient = useQueryClient();

  // POST
  const { mutateAsync: labelPostMutate, isPending: postPending } = useMutation<
    HttpApiResponse,
    unknown,
    TagI
  >({
    mutationFn: labelController.postLabel,
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });

  // PUT
  const { mutateAsync: labelPutMutate, isPending: putPending } = useMutation<
    HttpApiResponse,
    unknown,
    LabelI
  >({
    mutationFn: labelController.putLabel,
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });

  const onSubmit: SubmitHandler<TagI> = async (inputData) => {
    let mutateOption;
    if (controller === "post") {
      mutateOption = labelPostMutate(inputData);
    } else if (controller === "put") {
      mutateOption = labelPutMutate({
        title: inputData.title,
        isPin: inputData.isPin,
        id: value?.id,
        createdOn: value?.createdOn,
        modifiedOn: value?.modifiedOn,
        createdBy: value?.createdBy,
        modifiedBy: value?.modifiedBy,
      });
    }
    await mutateOption;
    onCloseModal();
  };

  return (
    <div className="h-[80%] w-[70%] flex flex-col justify-center">
      <p className="text-Black-B2 font-bold mb-[32px]">{title}</p>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <TextInput name="title" placeholder="عنوان*" />
          <div className="mt-[32px]">
            <SwitchToggle
              toggleBackground="#36B37E"
              toggleText="پین کردن*"
              value={methods.watch("isPin")}
              onChange={(value) => {
                methods.setValue("isPin", value);
              }}
            />
          </div>
          <div className="flex w-full mt-[32px] gap-5">
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
                postPending || putPending ? (
                  <Loading className={"bg-Black-B2"} />
                ) : (
                  title
                )
              }
              disable={postPending}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
