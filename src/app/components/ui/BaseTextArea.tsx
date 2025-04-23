import { __InputStylesNames, Textarea, TextareaProps } from "@mantine/core";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import React, { FC } from "react";
type IBaseTextAreaProps = TextareaProps &
  VariantProps<typeof TextareaVariants> & {
    classNames?: Partial<Record<__InputStylesNames, string>> | undefined;
    labelvalue?: boolean;
  };

const TextareaVariants = cva("", {
  variants: {
    filled: {
      true: "bg-gray-800/7 border-none",
      false: "",
    },
    standard: {
      true: "bg-white border-t-0 border-l-0 border-r-0 rounded-none focus-within:border-b-2 focus-within:border-t-0 focus-within:border-l-0 focus-within:border-r-0 focus-within:border-b-black",
      false: "",
    },
  },
});

const BaseTextArea: FC<IBaseTextAreaProps> = (props) => {
  const { classNames, labelvalue, filled, standard, ...other } = props;
  const { root, input, label, ...otherElements } = classNames ?? {};
  return (
    <Textarea
      classNames={{
        root: clsx("relative group", root),
        label: clsx(
          `${
            !labelvalue
              ? "absolute left-3 transform -translate-y-1/2 text-sm transition-all group-focus-within:text-xs group-focus-within:top-0 group-focus-within:bg-gray-100 duration-200 ease-in-out z-10 px-1  top-1/2 "
              : "absolute left-3 transform -translate-y-1/2 z-10 bg-gray-100 dark:bg-white dark:rounded-full px-1 text-md font-bold text-gray-600"
          }`,
          label
        ),
        input: clsx(
          TextareaVariants({ filled, standard }),
          "h-24 pt-4 rounded-lg focus-within:ring-2 focus-within:ring-blue-700 dark:bg-gray-700 dark:border-none dark:focus-within:ring-0 dark:text-white ",
          input
        ),
        
        ...otherElements,
      }}
      {...other}
    />
  );
};

export default BaseTextArea;
