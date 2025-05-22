import React, { FC } from "react";

import { Select, SelectProps, SelectStylesNames } from "@mantine/core";
import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";

export type IBaseSelectProps = SelectProps &
  VariantProps<typeof SelectVariants> & {
    classNames?: Partial<Record<SelectStylesNames, string>> | undefined;
    labelvalue?: boolean;
  };

const SelectVariants = cva("", {
  variants: {
    size: {
      small: "h-9",
      normal: "h-14",
    },
    filled: {
      true: "bg-gray-800/7 border-none",
      false: "",
    },
    standard: {
      true: "bg-white border-t-0 border-l-0 border-r-0 rounded-none focus-within:border-b-2 focus-within:border-t-0 focus-within:border-l-0 focus-within:border-r-0 focus-within:border-b-black",
      false: "",
    },
  },
  defaultVariants: {
    size: "normal",
    filled: false,
    standard: false,
  },
});

const BaseSelect: FC<IBaseSelectProps> = (props) => {
  const { classNames, labelvalue, size, filled, standard, ...other } = props;
  const { label, input, dropdown, option, ...otherElements } = classNames ?? {};
  return (
    <Select
      withAsterisk
      withCheckIcon={false}
      classNames={{
        root: "relative group",
        label: `${
          !labelvalue
            ? clsx(
                "absolute left-3 transform -translate-y-1/2 text-sm transition-all group-focus-within:text-xs group-focus-within:top-0 group-focus-within:bg-gray-100 duration-200 ease-in-out z-10 px-1  top-1/2 ",
                label,
              )
            : clsx(
                "absolute left-3 transform -translate-y-1/2 z-10 bg-gray-100 px-1 dark:bg-white dark:rounded-full !font-bold   text-md",
                label,
              )
        } text-sm font-normal text-gray-600`,
        input: clsx(
          SelectVariants({ size, filled, standard }),
          "rounded-lg focus-within:border-2 focus-within:border-black dark:bg-gray-700 dark:border-none dark:focus-within:ring-0 dark:text-white",
          input,
        ),
        dropdown: clsx("dark:border-gray-700 dark:bg-gray-700", dropdown),
        option: clsx(
          "font-semibold text-sm hover:bg-linear-to-tr from-red-200 via-gray-50 to-blue-100 hover:dark:bg-gray-500 ",
          option,
        ),
        ...otherElements,
      }}
      {...other}
    />
  );
};

export default BaseSelect;
