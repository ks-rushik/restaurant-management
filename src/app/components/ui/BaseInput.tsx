import {
    ElementProps,
    Input,
    InputProps,
    InputStylesNames,
    PasswordInput,
    PasswordInputProps,
  } from "@mantine/core";
  import clsx from "clsx";
  import { FC } from "react";
  
  type IBaseInputProps = ElementProps<"input", keyof InputProps> &
    InputProps & PasswordInputProps & {
      classNames?: Partial<Record<InputStylesNames, string>>
    
    };
  
  const BaseInput: FC<IBaseInputProps> = (props) => {
    const { classNames,type, disabled, ...other } = props;
    const { input, ...otherElement } = classNames || {};
  
    if(type === 'password'){
      return  <PasswordInput
      classNames={{
        ...otherElement,
        input: clsx(
          "bg-bgInput border border-none text-gray-900 font-bold text-sm focus-within:ring-2 focus-within:ring-Border  rounded-xl h-12 focus-within:border-Border focus:border-Border block w-full p-2.5 ",
          input
        ),
      }}
      disabled={disabled}
      {...other}
    />
    }
  
    return (
      <Input
        classNames={{
          input: clsx(
            "bg-bgInput border border-none text-gray-900 font-bold text-sm  rounded-xl h-12 focus:ring-2 focus:ring-Border focus:border-none  block w-full p-2.5",
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
      />
    );
  };
  
  export default BaseInput;