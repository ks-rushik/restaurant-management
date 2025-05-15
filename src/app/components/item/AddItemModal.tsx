"use client";

import Image from "next/image";
import React, { FC, useEffect, useState } from "react";

import BaseDropzone from "@components/ui/BaseDropzone";
import { zodResolver } from "@hookform/resolvers/zod";
import { Text } from "@mantine/core";
import { FileWithPath } from "@mantine/dropzone";
import { useDisclosure } from "@mantine/hooks";
import { Controller, useForm } from "react-hook-form";
import { RxImage } from "react-icons/rx";
import { z } from "zod";

import { IMessages } from "@/app/[locale]/messages";
import FormField from "@/app/components/forms/FormField";
import BaseButton from "@/app/components/ui/BaseButton";
import BaseInput from "@/app/components/ui/BaseInput";
import BaseModal from "@/app/components/ui/BaseModal";
import BaseSelect from "@/app/components/ui/BaseSelect";
import BaseTextArea from "@/app/components/ui/BaseTextArea";
import { Availablity, Jainoption } from "@/app/constants/common";
import { ImageError } from "@/app/utils/imagevalidation";
import validation from "@/app/utils/validation";

export type IItemdata = {
  created_at?: string;
  id?: string;
  image?: File | undefined;
  name: string | null;
  description: string | null;
  category_id?: string | null;
  price: number | "";
  status: string | null;
  jain: string | null;
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
  lang?: IMessages;
};

const AddItemModal: FC<IItemModalProps> = (props) => {
  const { onAddItem, onEditItem, selectedItem, setSelectedItem, lang } = props;
  const AddItemschema = z.object({
    name: z
      .string()
      .nonempty(validation(lang?.items.itemname!, "required", lang)),
    status: z.enum([Availablity.Available, Availablity.NotAvailable], {
      errorMap: () => validation(lang?.items.status!, "required", lang),
    }),
    jain: z.enum([Jainoption.Jain, Jainoption.NotJain], {
      errorMap: () => validation(lang?.items.jainoption!, "required", lang),
    }),
    description: z
      .string()
      .min(8, validation(lang?.items.description!, "minLength", lang)),
    price: z
      .string()
      .nonempty(validation(lang?.items.price!, "required", lang))
      .transform((value) => (value === "" ? "" : Number(value)))
      .refine((value) => !isNaN(Number(value)), validation("Price", "nan")),
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

  const handleFileChange = (newFile: FileWithPath[] | null) => {
    if (!newFile) return;
    setFile(newFile[0]);

    if (newFile) {
      setPreview(URL.createObjectURL(newFile[0]));
    }
  };

  useEffect(() => {
    if (selectedItem) {
      setPreview(selectedItem.image as unknown as string);
      reset({
        name: selectedItem.name!,
        description: selectedItem.description!,
        price: selectedItem.price!,
        status: selectedItem.status as keyof typeof Availablity,
        jain: selectedItem.jain as keyof typeof Jainoption,
      });

      open();
    } else {
      reset({
        name: "",
        description: "",
        price: "",
        status: undefined,
        jain: undefined,
      });
    }
  }, [selectedItem, reset, open]);
  const onError = () => {
    if (!selectedItem?.image) {
      return setError("root", { message: ImageError(file, lang).setError });
    }
    if (file) {
      setError("root", { message: ImageError(file, lang).setError });
    }
  };

  const onSubmit = async (data: IAddItemData) => {
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
      jain: undefined,
    });
    setFile(null), setPreview(null);
  };

  const handleClose = () => {
    close();
    setSelectedItem(null);
    reset({
      name: "",
      description: "",
      price: "",
      status: undefined,
      jain: undefined,
    });
    setFile(null);
  };

  return (
    <div>
      <BaseModal
        opened={opened}
        onClose={handleClose}
        title={selectedItem ? lang?.items.edititem : lang?.items.modaltitle}
      >
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <FormField name="name" error={errors.name?.message}>
            <BaseInput
              type="text"
              label={lang?.items.title}
              forceLabelOnTop
              placeholder={lang?.items.itemplaceholder}
              {...register("name")}
            />
          </FormField>
          <FormField name="description" error={errors.description?.message}>
            <BaseTextArea
              label={lang?.items.description}
              labelvalue
              {...register("description")}
              placeholder={lang?.items.itemdescriptionplaceholder}
            />
          </FormField>

          <FormField name="price" error={errors.price?.message}>
            <BaseInput
              type="text"
              label={lang?.items.price}
              forceLabelOnTop
              placeholder={lang?.items.itempriceplaceholder}
              {...register("price")}
            ></BaseInput>
          </FormField>
          <FormField name="status" error={errors.status?.message}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <BaseSelect
                  label={lang?.items.status}
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
                  placeholder={lang?.items.itemstatusplaceholder}
                  {...field}
                />
              )}
            />
          </FormField>
          <FormField name="jain" error={errors.jain?.message}>
            <Controller
              name="jain"
              control={control}
              render={({ field }) => (
                <BaseSelect
                  label={lang?.items.jainoption}
                  labelvalue
                  data={[Jainoption.Jain, Jainoption.NotJain]}
                  placeholder={lang?.items.itemsjainoptionplaceholder}
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
              preview={preview}
              onDrop={(file) => {
                handleFileChange(file);
              }}
              text={{
                attachtext: lang?.common.attachfile,
                browsetext: lang?.common.browsefile,
                imagetext: lang?.common.dragimagehere,
              }}
            />
          </FormField>
          <BaseButton
            type="submit"
            classNames={{
              root: "h-12 w-full rounded-xl",
              inner: "font-bold text-white text-sm",
            }}
          >
            {lang?.items.submitbutton}
          </BaseButton>
        </form>
      </BaseModal>
      <BaseButton
        onClick={() => {
          reset({
            status: undefined,
            jain: undefined,
          });
          setFile(null), setPreview(null);
          open();
        }}
        classNames={{
          root: "rounded-md h-10 sm:h-11 md:h-12 lg:h-10 xl:h-12 px-4 sm:px-6",
          inner: "font-bold text-white text-sm sm:text-md md:text-sm",
        }}
      >
        {lang?.items.button}
      </BaseButton>
    </div>
  );
};

export default AddItemModal;
