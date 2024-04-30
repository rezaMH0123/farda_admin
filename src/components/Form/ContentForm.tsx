import {
  useForm,
  SubmitHandler,
  FormProvider,
  FieldError,
} from "react-hook-form";
import TextInput from "../Inputs/TextInput";
import Button from "../Button";
import Datepicker from "../Inputs/Datepicker";
import IconDatePicker from "../Icons/DatePickerIcon";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import LableSelected from "@/sections/content/components/LableSelected";
import { HttpApiResponse, HttpResponseList } from "@/types/httpResponse";
import { TagsI } from "@/types/models/Tags.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TagsController } from "@/controllers/tags.contoroller";
import { useEffect, useState } from "react";
import MyDropDown from "../DropDown";
import { CategorieController } from "@/controllers/categorie.contoroller";
import { CategorieItem } from "@/types/models/Categories.type";
import SwitchToggle from "../SwitchToggle";
import RadioButton from "../RadioButton";
import * as yup from "yup";
import "../../../yup.config";
import { yupResolver } from "@hookform/resolvers/yup";
import { useModal } from "@/context/modalContext";
import UploadFile from "../Icons/UploadFile";
import { contentController } from "@/controllers/content.controller";
import { postContentT } from "@/types/models/Content.type";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CustomToast from "../Toast";
import SHARED_STRINGS from "@/constants/strings/shared.string";
import StringsE from "@/types/strings";

export type Inputs = {
  title: string;
  summary: string;
  ckDescription?: string;
  dateStart?: string;
  dateEnd?: string;
  selectedLable?: string[];
  selectedOption: string;
  category: string;
  subcategory?: string[];
  isShare: boolean;
  isComment: boolean;
};

type LabelItem = {
  name: string;
  value: string;
};

const formContentScherma = yup.object().shape({
  title: yup.string().required(),
  summary: yup.string().required(),
  isShare: yup.boolean().required(),
  isComment: yup.boolean().required(),
  selectedOption: yup.string().required(),
  category: yup.string().required(),
  subcategory: yup.array().min(1),
  selectedLable: yup.array().min(1),
});

type ContentFormProps = {
  selectedMainImage?: string | undefined;
  selectedsecondImages: string[];
};
export default function ContentForm({
  selectedMainImage,
  selectedsecondImages,
}: ContentFormProps) {
  const navigate = useNavigate();

  const methods = useForm<Inputs>({
    resolver: yupResolver(formContentScherma),
    defaultValues: {
      title: "",
      summary: "",
      ckDescription: "",
      dateStart: "",
      dateEnd: "",
      selectedLable: [],
      selectedOption: "preview",
      category: "",
      subcategory: [],
      isShare: false,
      isComment: false,
    },
  });
  const { openModal } = useModal();

  const [labelItems, setLabelItems] = useState<LabelItem[] | undefined>();
  const [option1, setOption1] = useState<{ value: string; label: string }[]>(
    []
  );
  const [option2, setOption2] = useState<{ value: string; label: string }[]>(
    []
  );
  const dateStart = methods.watch("dateStart");

  const { data, isFetched } = useQuery<HttpResponseList<TagsI>>({
    queryKey: ["tags"],
    queryFn: () => TagsController.getTags(),
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { data: categorieData, isFetched: categorieisFetched } = useQuery<
    HttpApiResponse<CategorieItem[]>
  >({
    queryKey: ["categori"],
    queryFn: () => CategorieController.getCategorie(),
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { mutateAsync: postMutation } = useMutation<
    HttpApiResponse,
    unknown,
    postContentT
  >({
    mutationFn: contentController.postContent,
  });

  useEffect(() => {
    setLabelItems(
      data?.data.result.map((item) => ({
        name: item.title,
        value: item.id,
      }))
    );
  }, [isFetched]);

  useEffect(() => {
    if (isFetched) {
      const updatedOptions =
        categorieData?.data?.map((item) => ({
          value: item.id,
          label: item.title,
        })) ?? [];

      setOption1(updatedOptions);
    }
  }, [categorieisFetched, categorieData]);

  const getSubCategories = () => {
    const subCategories: { id: string; title: string }[] = [];
    const id = methods.watch("category");

    categorieData?.data?.forEach((category) => {
      if (id === category.id) {
        subCategories.push(...category.subCategories);
      }
    });
    return subCategories;
  };
  getSubCategories();
  useEffect(() => {
    const op = getSubCategories();
    methods.setValue("subcategory", []);
    const subcategoriOP =
      op.map((item) => ({
        value: item.id,
        label: item.title,
      })) ?? [];

    setOption2(subcategoriOP);
  }, [methods.watch("category")]);
  const goBackHandle = () => {
    navigate("/content");
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const combinedArray = [data.category ?? [], ...(data.subcategory ?? [])];
    const res = await postMutation({
      title: data.title,
      description: data.ckDescription,
      summary: data.summary,
      fileId: selectedMainImage ? selectedMainImage : null,
      fromDate: data.dateStart,
      toDate: data.dateEnd,
      isCommentAvailable: data.isComment,
      isShareAvailable: data.isShare,
      status: data.selectedOption,
      categoriesId: combinedArray,
      tagsId: data.selectedLable,
      sectionsId: [],
      fileIds: selectedsecondImages ? selectedsecondImages : [],
      languageId: "43d6d5de-7f07-ee11-92c2-0050568129d7",
    });
    if (res.isSuccess) {
      toast.custom((t) => (
        <CustomToast
          text={SHARED_STRINGS[StringsE.AddContent]}
          animation={t}
          status="success"
        />
      ));
    }
    console.log(res);
  };

  return (
    <div className="flex justify-center items-center w-full h-full overflow-auto">
      <FormProvider {...methods}>
        <form
          className="flex justify-center items-center w-full h-full  overflow-auto"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-y-10  w-[90%] h-full py-4 ">
            <div className="h-[25%] mb-4">
              <span className="font-bold text-[20px] text-Black-PrimaryBlack">
                افزودن محتوا
              </span>

              <TextInput
                type="text"
                name="title"
                placeholder="عنوان*"
                className="mt-4 pr-3"
              />
              <TextInput
                type="text"
                name="summary"
                placeholder="خلاصه*"
                className="mt-4 pr-3"
              />
            </div>
            <div className="h-fit  mt-3">
              <span className="font-normal block mb-4 text-Black-B2">
                توضیحات
              </span>

              <CKEditor
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                editor={(window as any).ClassicEditor}
                onChange={(_event, editor) => {
                  const data = editor.getData();

                  methods.setValue("ckDescription", data);
                }}
                data={methods.getValues("ckDescription")}
                config={{
                  placeholder: "توضیحات...",
                }}
              />
            </div>
            <div className="flex justify-between items-center h-[8%] mt-3">
              <div className="relative w-[47%]">
                <div className="flex justify-between overflow-hidden items-center h-[38px] w-[100%] border border-Black-B3 rounded-lg">
                  <div style={{ direction: "rtl" }}>
                    <Datepicker
                      value={methods.getValues("dateStart")}
                      onChange={(value) => {
                        methods.setValue("dateStart", value);
                      }}
                    />
                  </div>
                  <IconDatePicker className="fill-Black-B3 ml-3 absolute top-[50%] left-0 -translate-y-[50%]" />
                </div>
              </div>

              <div className="relative w-[47%]">
                <div className="flex justify-between overflow-hidden items-center h-[38px] w-[100%] border border-Black-B3 rounded-lg">
                  <div style={{ direction: "rtl" }}>
                    <Datepicker
                      value={methods.getValues("dateEnd")}
                      onChange={(value) => {
                        methods.setValue("dateEnd", value);
                      }}
                      end={dateStart}
                    />
                  </div>
                  <IconDatePicker className="fill-Black-B3 ml-3 absolute top-[50%] left-0 -translate-y-[50%]" />
                </div>
              </div>
            </div>

            <div className="h-[8%] flex items-center font-light text-Black-B2 mt-3">
              <LableSelected
                onChange={(value) => {
                  methods.setValue("selectedLable", value);
                  methods.clearErrors("selectedLable");
                }}
                value={methods.watch("selectedLable") || []}
                items={labelItems}
                error={methods.formState.errors.selectedLable as FieldError}
              />
            </div>

            <div className="w-full h-[8%] flex justify-between items-center gap-x-3 mt-3">
              <MyDropDown
                value={methods.watch("category")}
                onChange={(value) => {
                  methods.setValue("category", value as string);
                  methods.clearErrors("category");
                }}
                options={option1}
                placeholder="دسته بندی‌ها*"
                isMulti={false}
                error={methods.formState.errors.category}
              />

              <MyDropDown
                value={methods.watch("subcategory")}
                onChange={(value) => {
                  methods.setValue("subcategory", value as string[]);
                  methods.clearErrors("subcategory");
                }}
                options={option2}
                placeholder="زیر دسته بندی‌ها*"
                isMulti={true}
                error={methods.formState.errors.subcategory as FieldError}
              />
            </div>

            <div className="flex justify-between items-center h-[8%] text-[13.5px]">
              <div className="flex gap-10 items-center">
                <SwitchToggle
                  value={methods.watch("isShare")}
                  onChange={(value) => {
                    methods.setValue("isShare", value);
                  }}
                  toggleBackground="#36B37E"
                  toggleText="قابلیت اشتراک گذاری*"
                />

                <SwitchToggle
                  value={methods.watch("isComment")}
                  onChange={(value) => {
                    methods.setValue("isComment", value);
                  }}
                  toggleBackground="#36B37E"
                  toggleText="قابلیت کامنت گذاری*"
                />
              </div>
              <div className="flex items-center gap-x-3">
                <span className="text-Black-B2">وضعیت نمایش*</span>

                <RadioButton
                  value={methods.watch("selectedOption")}
                  onChange={(value) => {
                    methods.setValue("selectedOption", value);
                  }}
                  color="#33BDF1"
                />
              </div>
            </div>
            <div className="flex items-center justify-between h-[8%]">
              <div
                onClick={openModal}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="w-fit border-b border-Blue-PrimaryBlue">
                  <span className="text-Blue-PrimaryBlue">بارگذاری فایل</span>
                </div>
                <UploadFile className="fill-Blue-PrimaryBlue" />
              </div>
              <div className="flex gap-x-4 mb-6">
                <Button
                  type="button"
                  onClick={goBackHandle}
                  className="w-[180px]"
                  model="outline_red"
                  title={"بازگشت"}
                />
                <Button
                  type="submit"
                  className="w-[180px]"
                  model="fill_blue"
                  title={"افزودن"}
                />
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
