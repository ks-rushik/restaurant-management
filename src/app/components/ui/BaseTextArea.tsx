import {
    __InputStylesNames,
    Textarea,
    TextareaProps,
  } from "@mantine/core";
  import clsx from "clsx";
  import { FC } from "react";
  
  type IBaseTextAreaProps = TextareaProps & {
    classNames?: Partial<Record<__InputStylesNames, string>>;
  };
  
  const BaseTextArea: FC<IBaseTextAreaProps> = (props) => {
    const { classNames, disabled, ...other } = props;
    const { input, ...otherElement } = classNames || {};
    return (
      <Textarea
        classNames={{
          ...classNames,
          input: clsx(
           "bg-bgInput border dark:text-gray-800 dark:bg-white border-none text-gray-900 font-bold text-sm focus-within:ring-2 focus-within:ring-Border  rounded-xl  focus-within:border-Border focus:border-Border block w-full p-2.5 ",
            {
              "mb-6  text-sm rounded-lg block w-full p-2.5 cursor-not-allowed":
                disabled,
            },
            input
          ),
          ...otherElement,
        }}
        {...other}
      ></Textarea>
    );
  };
  
  export default BaseTextArea;