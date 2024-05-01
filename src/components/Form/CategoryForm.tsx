import SHARED_STRINGS from "@/constants/strings/shared.string";
import { CategorieController } from "@/controllers/categorie.contoroller";
import { HttpApiResponse, HttpResponseList } from "@/types/httpResponse";
import { CategoryMain, CategoryPostT } from "@/types/models/Categories.type";
import StringsE from "@/types/strings";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Button from "../Button";
import MyDropDown from "../DropDown";
import TextInput from "../Inputs/TextInput";
import SwitchToggle from "../SwitchToggle";
import * as yup from "yup";
import "../../../yup.config";
import { yupResolver } from "@hookform/resolvers/yup";
import Loading from "../Loading";

type Props = {
  title: string;
  onCloseModal: () => void;
  value?: CategoryMain | undefined;
  controller: "post" | "put";
};

const categoryFormSchema = yup.object().shape({
  title: yup.string().required(),
  parentId: yup.string().required(),
  isPin: yup.boolean().required(),
});

export default function CategoryForm({
  title,
  onCloseModal,
  value,
  controller,
}: Props) {
  const queryClient = useQueryClient();
  const methods = useForm<CategoryPostT>({
    resolver: yupResolver(categoryFormSchema),
    defaultValues: {
      title: value?.title,
      parentId: value?.parentId,
      isPin: value?.isPin ? value.isPin : false,
    },
  });

  const [option1, setOption1] = useState<{ value: string; label: string }[]>(
    []
  );

  // GET main category for dropdown
  const { data, isFetched } = useQuery<HttpResponseList<CategoryMain>>({
    queryKey: ["category"],
    queryFn: () => CategorieController.getMainCategory(6, 1),
    retry: false,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (isFetched) {
      const updatedOptions =
        data?.data?.result.map((item) => ({
          value: item.id,
          label: item.title,
        })) ?? [];

      setOption1(
        updatedOptions.map((item) => ({
          value: String(item.value),
          label: item.label,
        }))
      );
    }
  }, [isFetched, data]);

  // POST
  const { mutateAsync: postMutation, isPending: postPending } = useMutation<
    HttpApiResponse,
    unknown,
    CategoryPostT
  >({
    mutationFn: CategorieController.postCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });

  // PUT
  const { mutateAsync: putMutation, isPending: putPending } = useMutation<
    HttpApiResponse,
    unknown,
    CategoryMain
  >({
    mutationFn: CategorieController.putCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });

  const onSubmit: SubmitHandler<CategoryMain> = async (data) => {
    let mutateOption;
    if (controller === "post") {
      const postData: CategoryPostT = {
        title: data.title,
        isPin: data.isPin,
        parentId: data.parentId,
      };
      mutateOption = postMutation(postData);
    } else if (controller === "put") {
      const putData: CategoryMain = {
        title: data.title,
        parentId: data.parentId,
        isPin: data.isPin,
        subCategories: value?.subCategories,
        id: value?.id,
        createdOn: value?.createdOn,
        modifiedOn: value?.modifiedOn,
        createdBy: value?.createdBy,
        modifiedBy: value?.modifiedBy,
      };
      mutateOption = putMutation(putData);
    }
    await mutateOption;
    onCloseModal();
  };

  return (
    <div className="h-[85%] w-[70%] flex flex-col justify-center">
      <p className="text-Black-B2 font-bold mb-[32px]">{title}</p>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="h-[50%] flex flex-col justify-between">
            <TextInput name="title" placeholder="عنوان*" />
            <MyDropDown
              value={methods.watch("parentId")}
              onChange={(value) => {
                methods.setValue("parentId", value as string);
                methods.clearErrors("parentId");
              }}
              options={option1}
              placeholder="دسته بندی اصلی*"
              isMulti={false}
              error={methods.formState.errors.parentId}
              width={100}
            />
          </div>
          <div className="mt-[32px] h-[10%]">
            <SwitchToggle
              toggleBackground="#36B37E"
              toggleText="قابلیت اشتراک گذاری*"
              value={methods.watch("isPin")}
              onChange={(value) => {
                methods.setValue("isPin", value);
              }}
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
