"use client";
import FormField from "@/app/components/forms/FormField";
import BaseButton from "@/app/components/ui/BaseButton";
import BaseInput from "@/app/components/ui/BaseInput";
import BaseModal from "@/app/components/ui/BaseModal";
import BaseSelect from "@/app/components/ui/BaseSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDisclosure } from "@mantine/hooks";
import React, { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export type ICategorydata = {
  updated_at?: string;
  create_at?: string;
  id?: string;
  category_name: string | null;
  menu_id?: string | null;
  status: string | null;
  position?: number | null | undefined;
};

export type ICategoryModalProps = {
  onAddCategory: (data: ICategorydata) => Promise<void>;
  onEditCategory: (updatedmenu: ICategorydata) => Promise<void>;
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
    category_name: z.string().min(1, "Category name is required"),
    status: z.enum(["Active", "InActive"], {
      errorMap: () => ({ message: "Status is required" }),
    }),
  });

  type IAddCategoryData = z.infer<typeof AddCategorychema>;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<IAddCategoryData>({
    resolver: zodResolver(AddCategorychema),
    defaultValues: { category_name: "", status: undefined },
  });

  useEffect(() => {
    if (selectedCategory) {
      reset({
        category_name: selectedCategory.category_name!,
        status: selectedCategory.status as "Active" | "InActive",
      });
      open();
    } else {
      reset({ category_name: "", status: undefined });
    }
  }, [selectedCategory, reset]);

  const onSubmit = async (data: IAddCategoryData) => {
    if (selectedCategory) {
      const updatedItem = { ...selectedCategory, ...data };
      await onEditCategory(updatedItem);
    } else {
      await onAddCategory(data);
    }
    close();
    setSelectedCategory(null);
    reset({ category_name: "", status: undefined });
  };

  const handleClose = () => {
    close();
    setSelectedCategory(null);
    reset({ category_name: "", status: undefined });
  };

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      <BaseModal opened={opened} onClose={handleClose} title={selectedCategory ? "Edit Category" : "Add Category"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            label="Category name"
            name="category_name"
            error={errors.category_name?.message}
          >
            <BaseInput
              type="text"
              placeholder="Enter category"
              {...register("category_name")}
            />
          </FormField>
          <FormField
            label="Status"
            name="status"
            error={errors.status?.message}
          >
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <BaseSelect
                  data={["Active", "InActive"]}
                  placeholder="Enter status"
                  {...field}
                />
              )}
            />
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
          reset({ category_name: "", status: undefined })
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
