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

type IUseRootClearErrors = (name?: "root") => void;

export type IBaseDropzoneProps = Omit<DropzoneProps, "onDrop"> & {
  classNames?: Partial<Record<DropzoneStylesNames, string>>;
  preview?: string | null;
  language: IMessages | undefined;
  editModalImage?: string | undefined;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  maxSizeInKb?: number;
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
  maxSizeInKb = 1024,
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

  useEffect(() => {
    if (editModalImage) {
      setPreview(editModalImage);
      setFile(null);
    }
  }, [editModalImage, setFile]);

  const handledelete = () => {
    setPreview(null), setFile(null);
  };

  return (
    <>
      {preview ? (
        <div className="relative bg-gray-100">
          <Image src={preview} alt="Preview" width={470} height={300} />
          <TiDelete
            onClick={handledelete}
            size={28}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-0.5 cursor-pointer hover:bg-red-600 "
          />
        </div>
      ) : (
        <Dropzone
          onReject={handleError}
          onDrop={handleFileChange}
          multiple={false}
          accept={ACCEPTED_IMAGE_TYPES}
          maxSize={maxSizeInKb * 1024}
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
            {language?.common.attachfile} {(maxSizeInKb / 1024).toFixed(0)} MB
          </Text>
        </Dropzone>
      )}
    </>
  );
};

export default BaseDropzone;
