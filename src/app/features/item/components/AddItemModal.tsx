"use client";
import FormField from "@/app/components/forms/FormField";
import BaseButton from "@/app/components/ui/BaseButton";
import BaseInput from "@/app/components/ui/BaseInput";
import BaseModal from "@/app/components/ui/BaseModal";
import BaseSelect from "@/app/components/ui/BaseSelect";
import BaseTextArea from "@/app/components/ui/BaseTextArea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDisclosure } from "@mantine/hooks";
import React, { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export type IItemdata = {
  created_at?: string;
  id?: string;
  name: string | null;
  description: string | null;
  category_id?: string | null;
  price: string | null;
  status: string | null;
  position?: number | null | undefined;
};

export type IItemModalProps = {
    onAddItem:  (data: IItemdata) => Promise<void>;
};

const AddItemModal: FC<IItemModalProps> = (props) => {
  const { onAddItem } = props;
  const AddItemschema = z.object({
    name: z.string().min(1, "Category name is required"),
    status: z.enum(["Active", "InActive"], {
      errorMap: () => ({ message: "Status is required" }),
    }),
    description: z.string().min(8, "At least 9 characters long"),
    price: z.string().min(1, "Price is required"),
  });

  type IAddItemData = z.infer<typeof AddItemschema>;

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IAddItemData>({
    resolver: zodResolver(AddItemschema),
  });

  const onSubmit = async (data: IItemdata) => {
    onAddItem(data)
    console.log(data);
  };

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      <BaseModal opened={opened} onClose={close} title="Add new category">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField label="Item name" name="name" error={errors.name?.message}>
            <BaseInput
              type="text"
              placeholder="Enter Item..."
              {...register("name")}
            />
          </FormField>
          <FormField
            label="Description"
            name="description"
            error={errors.description?.message}
          >
            <BaseTextArea
              {...register("description")}
              placeholder="Enter Description..."
            />
          </FormField>

          <FormField label="Price" name="price" error={errors.price?.message}>
            <BaseInput
              type="text"
              placeholder="Enter price..."
              {...register("price")}
            ></BaseInput>
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
          open();
        }}
        classNames={{
          root: "h-12 rounded-md",
          inner: "font-bold text-white text-md",
        }}
      >
        Add New Item
      </BaseButton>
    </div>
  );
};

export default AddItemModal;
