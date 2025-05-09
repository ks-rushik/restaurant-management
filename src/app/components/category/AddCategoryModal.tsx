"use client";

import React, { FC, useEffect, useState } from "react";

import BaseModal from "@components/ui/BaseModal";
import BaseSelect from "@components/ui/BaseSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, FileButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Controller, useForm } from "react-hook-form";
import { IoFastFoodOutline } from "react-icons/io5";
import { z } from "zod";

import FormField from "@/app/components/forms/FormField";
import BaseButton from "@/app/components/ui/BaseButton";
import BaseInput from "@/app/components/ui/BaseInput";
import { Availablity } from "@/app/constants/common";
import { ImageError } from "@/app/utils/imagevalidation";
import validation from "@/app/utils/validation";

export type ICategorydata = {
  updated_at?: string;
  create_at?: string;
  id?: string;
  category_name: string | null;
  menu_id?: string | null;
  status: string | null;
  position?: number | null | undefined;
  image?: File | undefined;
};

export type ICategoryModalProps = {
  onAddCategory: (data: ICategorydata, file?: File) => Promise<void>;
  onEditCategory: (updatedmenu: ICategorydata, file?: File) => Promise<void>;
  selectedCategory?: ICategorydata | null;
  setSelectedCategory: (value: ICategorydata | null) => void;
};

const AddCategoryModal: FC<ICategoryModalProps> = (props) => {
  const {
    onAddCategory,
    onEditCategory,
    selectedCategory,
    setSelectedCategory,
  } = props;
  const AddCategorychema = z.object({
    category_name: z.string().nonempty(validation("Category", "required")),
    status: z.enum([Availablity.Available, Availablity.NotAvailable], {
      errorMap: () => validation("Status", "required"),
    }),
  });

  type IAddCategoryData = z.infer<typeof AddCategorychema>;

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset,
    control,
  } = useForm<IAddCategoryData>({
    resolver: zodResolver(AddCategorychema),
    defaultValues: { category_name: "", status: undefined },
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (newFile: File | null) => {
    setFile(newFile);
    if (newFile) {
      setPreview(URL.createObjectURL(newFile));
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      setPreview(selectedCategory.image as unknown as string);
      reset({
        category_name: selectedCategory.category_name!,
        status: selectedCategory.status as keyof typeof Availablity,
      });
      open();
    } else {
      reset({ category_name: "", status: "" as keyof typeof Availablity });
    }
  }, [selectedCategory, reset]);

  const onSubmit = async (data: IAddCategoryData) => {
    if (!selectedCategory?.image && !file) {
      return setError("root", { message: "Image is required" });
    }
    if (file) {
      return setError("root", { message: ImageError(file).setError });
    }

    if (selectedCategory) {
      const updatedItem = { ...selectedCategory, ...data };
      await onEditCategory(updatedItem, file ?? undefined);
    } else {
      await onAddCategory(data, file ?? undefined);
    }
    close();
    setSelectedCategory(null);
    reset({ category_name: "", status: undefined });
    setFile(null), setPreview(null);
  };

  const handleClose = () => {
    close();
    setSelectedCategory(null);
    reset({ category_name: "", status: undefined });
    setFile(null)
  };

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      <BaseModal
        opened={opened}
        onClose={handleClose}
        title={selectedCategory ? "Edit Category" : "Add Category"}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField name="category_name" error={errors.category_name?.message}>
            <BaseInput
              type="text"
              label="Category name"
              forceLabelOnTop
              placeholder="Enter category"
              {...register("category_name")}
            />
          </FormField>
          <FormField name="status" error={errors.status?.message}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <BaseSelect
                  label="Status"
                  labelvalue
                  data={[Availablity.Available, Availablity.NotAvailable]}
                  placeholder="Enter status"
                  {...field}
                />
              )}
            />
          </FormField>
          <FormField
            label="Upload image"
            name="image"
            required
            error={errors.root?.message}
          >
            <Avatar
              src={preview}
              alt="Uploaded Logo"
              radius={"sm"}
              size={"xl"}
              className="mb-4 w-32 h-32 dark:bg-white"
            >
              <IoFastFoodOutline className="dark:text-black" />
            </Avatar>

            <FileButton
              onChange={(file) => {
                handleFileChange(file);
              }}
              accept="image/jpeg ,image/png"
            >
              {(props) => (
                <BaseButton {...props} classNames={{ root: "text-white" }}>
                  Upload Image
                </BaseButton>
              )}
            </FileButton>
          </FormField>
          <BaseButton
            type="submit"
            classNames={{
              root: "h-12 w-full rounded-xl",
              inner: "font-bold text-white text-sm",
            }}
          >
            Submit
          </BaseButton>
        </form>
      </BaseModal>
      <BaseButton
        onClick={() => {
          setSelectedCategory(null);
          setFile(null), setPreview(null);
          reset({ category_name: "", status: undefined });
          open();
        }}
        classNames={{
          root: "h-12 rounded-md",
          inner: "font-bold text-white text-md",
        }}
      >
        Add New Category
      </BaseButton>
    </div>
  );
};

export default AddCategoryModal;
