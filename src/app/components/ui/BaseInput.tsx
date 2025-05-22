import {
  Input,
  InputProps,
  InputStylesNames,
  InputWrapper,
  InputWrapperProps,
  InputWrapperStylesNames,
  PasswordInput,
  PasswordInputProps,
} from "@mantine/core";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import React, { FC, ReactNode, useState } from "react";

type IBaseTextFieldProps = InputProps &
  InputWrapperProps &
  PasswordInputProps &
  VariantProps<typeof InputVariants> &
  VariantProps<typeof TextFieldVariants> &
  InputWrapperProps & {
    classNames?: Partial<Record<InputStylesNames, string>> | undefined;
    InputWrapperClassNames?:
      | Partial<Record<InputWrapperStylesNames, string>>
      | undefined;
    children?: ReactNode;
    label?: string;
    labelvalue?: boolean;
    forceLabelOnTop?: boolean;
    type?: string;
    error?: string;
  };

const InputVariants = cva("", {
  variants: {
    border: {
      error:
        "border-error-main focus-within:border-2 focus-within:border-error-main",
      normal:
        "rounded-lg dark:bg-gray-700 dark:border-none dark:focus-within:ring-0 dark:text-white focus-within:border-2 focus-within:border-black",
    },
    size: {
      small: "h-9",
      normal: "h-[54px]",
    },
    filled: {
      true: "bg-gray-800/7 border-none",
      false: "",
    },
    standard: {
      true: "bg-white h-11 border-t-0 border-l-0 border-r-0 rounded-none focus-within:border-b-2 focus-within:border-t-0 focus-within:border-l-0 focus-within:border-r-0 focus-within:border-b-black",
      false: "",
    },
  },
  compoundVariants: [
    {
      filled: true,
      border: "error",
      class: "!bg-error-main/12",
    },
    {
      standard: true,
      size: "normal",
      class: "!h11",
    },
  ],
  defaultVariants: {
    border: "normal",
    size: "normal",
    filled: false,
    standard: false,
  },
});

const TextFieldVariants = cva("", {
  variants: {
    intent: {
      error: "!text-error-main group-focus-within:text-error-main",
      normal: "text-gray-600 group-focus-within:text-gray-600",
    },
    filled: {
      true: "",
      false: "!bg-gray-100",
    },
    standard: {
      true: "bg-white border-t-0 border-l-0 border-r-0 rounded-none focus-within:border-b-2 focus-within:border-t-0 focus-within:border-l-0 focus-within:border-r-0 focus-within:border-b-black",
      false: "",
    },
  },
  compoundVariants: [
    {
      filled: true,
      intent: "error",
      class: "",
    },
  ],
  defaultVariants: {
    intent: "normal",
    filled: false,
    standard: false,
  },
});

const BaseTextField: FC<IBaseTextFieldProps> = (props) => {
  const {
    children,
    classNames,
    label,
    filled,
    standard,
    intent,
    size,
    border,
    labelvalue,
    InputWrapperClassNames,
    type,
    error,
    forceLabelOnTop,
    ...other
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  const valueToCheck = props.value ?? "";
  const shouldFloatLabel = isFocused || !!valueToCheck || forceLabelOnTop; 

  const { input, ...otherElements } = classNames ?? {};
  const { root, ...otherWrapperElements } = InputWrapperClassNames ?? {};

  return (
    <InputWrapper
    withAsterisk
      label={label}
      error={error}
      classNames={{
        root: clsx("relative group", root),
        label: clsx(
          TextFieldVariants({ intent, filled }),
          "absolute left-3 transform -translate-y-1/2 z-10 px-1 dark:rounded-lg transition-all duration-200 ease-in-out",
          {
            "text-xs top-0 bg-gray-100 text-black font-bold": shouldFloatLabel,
            "text-sm top-1/2 text-gray-600": !shouldFloatLabel,
          }
        ),
        error: clsx(TextFieldVariants({ intent }), "px-4"),
        ...otherWrapperElements,
      }}
    >
      {type === "password" ? (
        <PasswordInput
          classNames={{
            input: clsx(
              InputVariants({ border, size, filled, standard }),
              input
            ),
            ...otherElements,
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...other}
        />
      ) : (
        <Input
          classNames={{
            input: clsx(
              InputVariants({ border, size, filled, standard }),
              input
            ),
            ...otherElements,
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...other}
        >
          {children}
        </Input>
      )}
    </InputWrapper>
  );
};



export default BaseTextField;
