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
          "bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-red-500 block w-full p-2.5 ",
          "dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
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
            "bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-700 block w-full p-2.5",
            "dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
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