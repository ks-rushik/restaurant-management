import { Select, SelectProps, SelectStylesNames } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";

type IBaseSelectProp = SelectProps & {
  classNames?: {input:Partial<Record<SelectStylesNames, string>>}
};

const BaseSelect:FC<IBaseSelectProp> = (props) => {
  const { classNames,disabled, ...other } = props;
  const { input, ...otherElement } = classNames || {};

  return (
    <Select
      classNames={{
        input: clsx(
         "bg-[#f9eed164] border border-none text-gray-900 font-bold text-sm  rounded-xl h-12 focus:ring-2 focus:ring-[#2a85ff] focus:border-none",
          {
            "mb-6  text-sm rounded-lg block w-full p-2.5 cursor-not-allowed":
              disabled,
          },
          input
        ),
        ...otherElement,
      }}
      disabled={disabled}
      {...other}
      searchable
    />
  );
}

export default BaseSelect