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
           "bg-[#f9eed164] border border-none text-gray-900 font-bold text-sm focus-within:ring-2 focus-within:ring-[#2a85ff]  rounded-xl  focus-within:border-[#2a85ff] focus:border-[#2a85ff] block w-full p-2.5 ",
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