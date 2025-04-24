import { Select, SelectProps, SelectStylesNames } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";

type IBaseSelectProp = SelectProps & {
  classNames?: Partial<Record<SelectStylesNames, string>>
};

const BaseSelect:FC<IBaseSelectProp> = (props) => {
  const { classNames,disabled, ...other } = props;
  const { input ,dropdown , ...otherElement } = classNames || {};

  return (
    <Select
      classNames={{
        input: clsx(
         "bg-gray-200 border border-none text-gray-900 font-bold text-sm dark:text-white dark:bg-gray-200 rounded-xl h-12 focus:ring-2 focus:ring-Border focus:border-none",
          {
            "mb-6  text-sm rounded-lg block w-full p-2.5 cursor-not-allowed":
              disabled,
          },
          input,
        ),
       dropdown: clsx("dark:text-blue-400 dark:border-gray-700 dark:bg-gray-700" , dropdown),

        ...otherElement,
      }}
      disabled={disabled}
      {...other}
      searchable
    />
  );
}

export default BaseSelect