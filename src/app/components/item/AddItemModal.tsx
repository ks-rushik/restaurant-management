"use client";
import FormField from "@/app/components/forms/FormField";
import BaseButton from "@/app/components/ui/BaseButton";
import BaseInput from "@/app/components/ui/BaseInput";
import BaseModal from "@/app/components/ui/BaseModal";
import BaseSelect from "@/app/components/ui/BaseSelect";
import BaseTextArea from "@/app/components/ui/BaseTextArea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, FileButton, FileInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoFastFoodOutline } from "react-icons/io5";
import { z } from "zod";

export type IItemdata = {
  created_at?: string;
  id?: string;
  image?: File | undefined;
  name: string | null;
  description: string | null;
  category_id?: string | null;
  price: string | null;
  status: string | null;
  position?: number | null | undefined;
  category?: {
    menu: {
      currency: string;
    };
  };
};

export type IItemModalProps = {
  onAddItem: (newItem: IItemdata, file?: File) => Promise<void>;
  onEditItem: (updateditem: IItemdata, file?: File) => Promise<void>;
  selectedItem: IItemdata | null;
  setSelectedItem: (value: IItemdata | null) => void;
};

const AddItemModal: FC<IItemModalProps> = (props) => {
  const { onAddItem, onEditItem, selectedItem, setSelectedItem } = props;
  const AddItemschema = z.object({
    name: z.string().min(1, "Category name is required"),
    status: z.enum(["Available", "Not Available"], {
      errorMap: () => ({ message: "Status is required" }),
    }),
    description: z.string().min(8, "At least 9 characters long"),
    price: z.string().min(1, "Price is required"),
  });

  type IAddItemData = z.infer<typeof AddItemschema>;

  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<IAddItemData>({
    resolver: zodResolver(AddItemschema),
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  const handleFileChange = (newFile: File | null) => {
    setFile(newFile);
    if (newFile) {
      setPreview(URL.createObjectURL(newFile));
    }
  };

  useEffect(() => {
    if (selectedItem) {
      setPreview(selectedItem.image as unknown as string)
      reset({
        name: selectedItem.name!,
        description: selectedItem.description!,
        price: selectedItem.price!,
        status: selectedItem.status as "Available" | "Not Available",
      });

      open();
    } else {
      reset({
        name: "",
        description: "",
        price: "",
        status: undefined,
      });
    }
  }, [selectedItem, reset]);

  const onSubmit = async (data: IAddItemData) => {
    if (!selectedItem?.image && !file) {
      return setError("root", { message: "Image is required" });
    }

    if (selectedItem) {
      const updatedItem = { ...selectedItem, ...data };
      await onEditItem(updatedItem, file ?? undefined);
    } else {
      await onAddItem(data, file ?? undefined);
    }
    close();
    setSelectedItem(null);
    reset({
      name: "",
      description: "",
      price: "",
      status: undefined,
    });
    setFile(null),
    setPreview(null);
  };

  const handleClose = () => {
    close();
    setSelectedItem(null);
    reset({
      name: "",
      description: "",
      price: "",
      status: undefined,
    });
  };


  return (
    <div>
      <BaseModal
        opened={opened}
        onClose={handleClose}
        title={selectedItem ? "Edit Item" : "Add Item"}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField label="Item name" name="name" error={errors.name?.message} required={true}>
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
            required
          >
            <BaseTextArea
              {...register("description")}
              placeholder="Enter Description..."
            />
          </FormField>

          <FormField label="Price" name="price" error={errors.price?.message} required>
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
            required
          >
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <BaseSelect
                  data={[`Available`,`Not Available`]}
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
              className="mb-4 w-32 h-32"
            >
              <IoFastFoodOutline />
            </Avatar>

            <FileButton
              onChange={(file) => {
                handleFileChange(file);
              }}
              accept="image/png,image/jpeg"
            >
              {(props) => <BaseButton {...props} classNames={{root:'text-white'}}>Upload Image</BaseButton>}
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
          reset({
            status: undefined,
          });
          setFile(null), setPreview(null);
          open();
        }}
        classNames={{
          root: "rounded-md h-10 sm:h-11 md:h-12 lg:h-10 xl:h-12 px-4 sm:px-6",
          inner: "font-bold text-white text-sm sm:text-md md:text-sm",
        }}
      >
        Add New Item
      </BaseButton>
    </div>
  );
};

export default AddItemModal;
