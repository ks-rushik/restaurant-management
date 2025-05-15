import Image from "next/image";
import React, { FC } from "react";

import { Text } from "@mantine/core";
import {
  Dropzone,
  DropzoneProps,
  DropzoneStylesNames,
} from "@mantine/dropzone";
import clsx from "clsx";
import { RxImage } from "react-icons/rx";

import { IMessages } from "@/app/[locale]/messages";
import { ACCEPTED_IMAGE_TYPES } from "@/app/utils/imagevalidation";

export type IBaseDropzoneProps = DropzoneProps & {
  classNames?: Partial<Record<DropzoneStylesNames, string>>;
  preview?: string | null;
  text: {
    imagetext?: string;
    browsetext?: string;
    attachtext?: string;
  };
};

const BaseDropzone: FC<IBaseDropzoneProps> = (props) => {
  const { classNames, preview, text, ...other } = props;

  return (
    <Dropzone
      multiple={false}
      accept={ACCEPTED_IMAGE_TYPES}
      mih={200}
      w={350}
      p="md"
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
      {preview ? (
        <Image src={preview} alt="Preview" width={350} height={350} />
      ) : (
        <>
          <RxImage
            size={34}
            color="gray"
            className="flex justify-self-center mb-2"
          />
          <Text size="lg" classNames={{ root: "text-center" }}>
            {text?.imagetext }
            <b>{text?.browsetext }</b>
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            {text?.attachtext}
          </Text>
        </>
      )}
    </Dropzone>
  );
};

export default BaseDropzone;
