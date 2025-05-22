"use client";

import React, { FC, useEffect, useState } from "react";

import BaseDropzone from "@components/ui/BaseDropzone";
import BaseModal from "@components/ui/BaseModal";
import BaseSelect from "@components/ui/BaseSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDisclosure } from "@mantine/hooks";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { IMessages } from "@/app/[locale]/messages";
import FormField from "@/app/components/forms/FormField";
import BaseButton from "@/app/components/ui/BaseButton";
import BaseInput from "@/app/components/ui/BaseInput";
import { Availablity } from "@/app/constants/common";
import validation from "@/app/utils/validation";

export type ICategorydata = {
  updated_at?: string;
  create_at?: string;
  id?: string;
  category_name: string | null;
  menu_id?: string | null;
  status: string | null;
  position?: number | null | undefined;
  image?: string | undefined;
};

export type ICategoryModalProps = {
  onAddCategory: (data: ICategorydata, file?: File) => Promise<void>;
  onEditCategory: (updatedmenu: ICategorydata, file?: File) => Promise<void>;
  selectedCategory?: ICategorydata | null;
  setSelectedCategory: (value: ICategorydata | null) => void;
  lang?: IMessages;
};

const AddCategoryModal: FC<ICategoryModalProps> = (props) => {
  const {
    onAddCategory,
    onEditCategory,
    selectedCategory,
    setSelectedCategory,
    lang,
  } = props;
  const AddCategorychema = z.object({
    category_name: z
      .string()
      .nonempty(validation(lang?.categories.categoryname!, "required", lang)),
    status: z.enum([Availablity.Available, Availablity.NotAvailable], {
      errorMap: () => validation(lang?.categories.status!, "required", lang),
    }),
  });

  type IAddCategoryData = z.infer<typeof AddCategorychema>;

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
    reset,
    control,
  } = useForm<IAddCategoryData>({
    resolver: zodResolver(AddCategorychema),
    defaultValues: { category_name: "", status: undefined },
  });

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (selectedCategory) {
      reset({
        category_name: selectedCategory.category_name ?? "",
        status: selectedCategory.status ?? "",
      });
      open();
    } else {
      reset({ category_name: "", status: "" });
    }
  }, [selectedCategory, reset]);

  const onSubmit = async (data: IAddCategoryData) => {
    if (selectedCategory) {
      const updatedItem = { ...selectedCategory, ...data };
      await onEditCategory(updatedItem, file ?? undefined);
    } else {
      await onAddCategory(data, file ?? undefined);
    }
    close();
    setSelectedCategory(null);
    reset({ category_name: "", status: undefined });
    setFile(null);
  };

  const handleClose = () => {
    close();
    setSelectedCategory(null);
    reset({ category_name: "", status: undefined });
    setFile(null);
  };

  const [opened, { open, close }] = useDisclosure(false);
  const editModalImage = selectedCategory?.image;

  return (
    <div>
      <BaseModal
        opened={opened}
        onClose={handleClose}
        title={
          selectedCategory
            ? lang?.categories.editcategory
            : lang?.categories.modaltitle
        }
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField name="category_name" error={errors.category_name?.message}>
            <BaseInput
              type="text"
              label={lang?.categories.categoryname}
              forceLabelOnTop
              placeholder={lang?.categories.categoryplaceholder}
              {...register("category_name")}
            />
          </FormField>
          <FormField name="status" error={errors.status?.message}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <BaseSelect
                  label={lang?.categories.status}
                  labelvalue
                  data={[
                    {
                      label: lang?.availableStatus.available!,
                      value: Availablity.Available,
                    },
                    {
                      label: lang?.availableStatus.notAvailable!,
                      value: Availablity.NotAvailable,
                    },
                  ]}
                  placeholder={lang?.categories.categorystatusplaceholder}
                  {...field}
                />
              )}
            />
          </FormField>
          <FormField
            label={lang?.categories.uploadimage}
            name="image"
            required
            error={errors.root?.message}
          >
            <BaseDropzone
              clearErrors={clearErrors}
              setFile={setFile}
              setError={setError}
              editModalImage={editModalImage}
              language={lang}
            />
          </FormField>
          <BaseButton
            type="submit"
            classNames={{
              root: "h-12 w-full rounded-xl",
              inner: "font-bold text-white text-sm",
            }}
          >
            {lang?.categories.submitbutton}
          </BaseButton>
        </form>
      </BaseModal>
      <BaseButton
        onClick={() => {
          setSelectedCategory(null);
          setFile(null), reset({ category_name: "", status: undefined });
          open();
        }}
        classNames={{
          root: "h-12 rounded-md",
          inner: "font-bold text-white text-md",
        }}
      >
        {lang?.categories.button}
      </BaseButton>
    </div>
  );
};

export default AddCategoryModal;
