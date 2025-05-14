import React, { FC, ReactNode } from "react";

import {
  Dropzone,
  DropzoneProps,
  DropzoneStylesNames,
} from "@mantine/dropzone";
import clsx from "clsx";

export type IBaseDropzoneProps = DropzoneProps & {
  classNames?: Partial<Record<DropzoneStylesNames, string>>;
  children: ReactNode;
};

const BaseDropzone: FC<IBaseDropzoneProps> = (props) => {
  const { children, classNames, ...other } = props;
  const { root, ...otherClassNames } = classNames ?? {};

  return (
    <Dropzone
      multiple={false}
      mih={200}
      w={350}
      p="md"
      radius="md"
      classNames={{
        root: clsx("flex justify-center items-center flex-col", root),
        ...otherClassNames,
      }}
      {...other}
    >
      {children}
    </Dropzone>
  );
};

export default BaseDropzone;
