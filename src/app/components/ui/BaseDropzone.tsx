import Image from "next/image";
import React, { FC, useEffect, useState } from "react";

import { Text } from "@mantine/core";
import {
  Dropzone,
  DropzoneProps,
  DropzoneStylesNames,
  FileRejection,
  FileWithPath,
} from "@mantine/dropzone";
import clsx from "clsx";
import { UseFormSetError } from "react-hook-form";
import { RxImage } from "react-icons/rx";
import { TiDelete } from "react-icons/ti";

import { IMessages } from "@/app/[locale]/messages";
import { ACCEPTED_IMAGE_TYPES, ImageError } from "@/app/utils/imagevalidation";

export type IFormAFields = {
  status: string;
  category_name: string;
};

export type IFormBFields = {
  name: string;
  status: string;
  jain: string;
  description: string;
  price: number | "";
  category_name: string;
};

type IUseRootClearErrors = (name?: "root") => void;

export type IBaseDropzoneProps = Omit<DropzoneProps, "onDrop"> & {
  classNames?: Partial<Record<DropzoneStylesNames, string>>;
  preview?: string | null;
  language: IMessages | undefined;
  editModalImage?: string | undefined;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  clearErrors: IUseRootClearErrors;
  setError: UseFormSetError<{
    name: string;
    status: string;
    jain: string;
    description: string;
    price: number | "";
    category_name: string;
  }>;
};

const BaseDropzone: FC<IBaseDropzoneProps> = ({
  classNames,
  language,
  editModalImage,
  setError,
  setFile,
  clearErrors,
  ...other
}) => {
  const [preview, setPreview] = useState<string | null>("");

  const handleError = (file: FileRejection[] | null) => {
    if (!editModalImage) {
      return setError("root", { message: ImageError(file, language).setError });
    }
    if (file) {
      setError("root", { message: ImageError(file, language).setError });
    }
  };

  const handleFileChange = (newFile: FileWithPath[] | null) => {
    if (!newFile) return;
    setFile(newFile[0]);
    setPreview(URL.createObjectURL(newFile[0]));
    clearErrors("root");
  };

  return (
    <>
      {preview ? (
        <div className="relative w-[470px] h-[350px] border border-dashed border-gray-400 rounded-md">
          <Image
            src={editModalImage ? editModalImage : preview}
            alt="Preview"
            width={470}
            height={350}
            className="object-cover rounded-md"
          />
          <TiDelete
            onClick={() => {
              setPreview(null);
              setFile(null);
            }}
            size={24}
            className="absolute top-2 right-2 bg-red-400 rounded-full "
          />
        </div>
      ) : (
        <Dropzone
          onReject={handleError}
          onDrop={handleFileChange}
          multiple={false}
          accept={ACCEPTED_IMAGE_TYPES}
          maxSize={1 * 1024 ** 2}
          mih={300}
          w={470}
          radius="md"
          classNames={{
            ...classNames,
            root: clsx(
              "flex justify-center items-center flex-col",
              classNames?.root,
            ),
          }}
          {...other}
        >
          <RxImage
            size={34}
            color="gray"
            className="flex justify-self-center mb-2"
          />
          <Text size="lg" classNames={{ root: "text-center text-gray-700" }}>
            {language?.common.dragimagehere}
            <b>{language?.common.browsefile}</b>
          </Text>
          <Text
            size="sm"
            c="dimmed"
            inline
            mt={7}
            classNames={{ root: "text-center px-8" }}
          >
            {language?.common.attachfile}
          </Text>
        </Dropzone>
      )}
    </>
  );
};

export default BaseDropzone;
