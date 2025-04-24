import { Button, ButtonProps, ButtonStylesNames } from "@mantine/core";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import React, { ButtonHTMLAttributes, FC } from "react";

type IBaseButtonProps = ButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    classNames?: Partial<Record<ButtonStylesNames, string>>;
  };
const buttonVariants = cva(
  "transition-130 cursor-pointer text-sm rounded-lg disabled:opacity-50 disabled:cursor-not-allowed font-bold min-w-12",
  {
    variants: {
      disabled: {
        true: "cursor-not-allowed !bg-gray-400 !text-gray-800",
        false: "",
      },
      intent: {
        themeColor: "bg-blue-700 hover:bg-blue-600 text-white",
        default: "bg-gray-800 hover:bg-gray-700 text-white",
        secondary: "bg-secondary-main hover:bg-secondary-dark text-white",
        primary: "bg-primay-main hover:bg-primary-dark text-white",
        info: "bg-info-main hover:bg-info-dark text-white",
        sucess: "bg-sucess-main hover:bg-sucess-dark text-white",
        error: "bg-error-dark hover:bg-error-main text-white",
        warning:
          "bg-warning-main hover:bg-warning-dark text-black hover:text-black",
        lightgray:
          "bg-gray-300 hover:bg-gray-400 min-w-12  text-black hover:text-black",
        loading:
          "bg-gray-400 min-w-16 text-gray-700 hover:bg-gray-400 hover:text-gray-700 cursor-not-allowed",
      },
      size: {
        small: "text-sm px-2 py-1 h-8",
        medium: "text-sm px-3 py-1.5 h-10",
        large: "text-sm px-4 py-2 h-12",
      },
      fabsize: {
        small: "h-10 px-2 py-1  font-bold !rounded-full",
        medium: "h-12 px-3 py-1.5  font-bold !rounded-full",
        large: "h-14 px-4 py-2  font-bold !rounded-full",
      },
      outline: {
        true: "",
        false: "",
      },
      text: {
        true: "",
        false: "",
      },
      soft: {
        true: "",
        false: "",
      },
      icon: {
        true: "p-2",
        false: "",
      },
      fab: {
        true: " px-4 h-14  font-bold !rounded-full",
        false: "",
      },
      inGroup: {
        true: "border-l border-l-gray-300 border-t-0 border-r-0 border-b-0 first:border-l-0",
        false: "",
      },
    },
    compoundVariants: [
      //outline
      {
        outline: true,
        disabled: true,
        class:
          "cursor-not-allowed !bg-transparent border !border-gray-500 hover:border-gray-500",
      },
      {
        intent: "themeColor",
        outline: true,
        class:
          "box-border border border-blue-700 !text-blue-700 bg-transparent hover:ring-1  hover:ring-blue-700 hover:bg-blue-100 ",
      },
      {
        intent: "primary",
        outline: true,
        class:
          "box-border border border-primary-main !text-primary-main bg-transparent hover:outline hover:outline-primary-main hover:bg-primary-main/10 ",
      },
      {
        intent: "secondary",
        outline: true,
        class:
          "box-border border border-secondary-main !text-secondary-main bg-transparent hover:outline hover:outline-secondary-main hover:!bg-secondary-lighter ",
      },
      {
        intent: "lightgray",
        outline: true,
        class:
          "box-border !border border-gray-400 !text-gray-800 !font-bold hover:outline hover:outline-gray-600  bg-transparent hover:!bg-gray-700/8 ",
      },
      {
        intent: "default",
        outline: true,
        class:
          "box-border !border border-gray-400 !text-gray-800 !font-bold bg-transparent hover:!bg-gray-700/8",
      },
      {
        intent: "error",
        outline: true,
        class:
          "box-border border border-error-main !text-error-main bg-transparent hover:outline hover:outline-error-main hover:bg-error-main/10 ",
      },
      {
        intent: "warning",
        outline: true,
        class:
          "box-border border border-warning-main !text-warning-main !bg-transparent hover:outline hover:outline-warning-main hover:!bg-warning-main/10 ",
      },
      {
        intent: "info",
        outline: true,
        class:
          "box-border border border-info-main !text-info-main bg-transparent hover:outline hover:outline-info-main hover:bg-info-main/10 ",
      },
      {
        intent: "sucess",
        outline: true,
        class:
          "box-border border border-sucess-main !text-sucess-main bg-transparent hover:outline hover:outline-sucess-main hover:bg-sucess-main/10 ",
      },
      {
        intent: "loading",
        outline: true,
        class:
          "box-border border border-gray-500 !text-gray-700 bg-transparent hover:border-gray-500 ",
      },
      //text
      {
        intent: "primary",
        text: true,
        class: "!text-primary-main bg-white hover:bg-primary-main/10 font-bold",
      },
      {
        intent: "lightgray",
        text: true,
        class: "text-black bg-white hover:!bg-gray-700/8",
      },
      {
        intent: "secondary",
        text: true,
        class:
          "!text-secondary-main bg-white hover:bg-secondary-main/10 font-bold",
      },
      {
        intent: "default",
        text: true,
        class: "!text-black bg-white hover:bg-gray-700/10 font-bold",
      },
      {
        intent: "info",
        text: true,
        class: "!text-info-main bg-white hover:bg-info-main/10 font-bold",
      },
      {
        intent: "sucess",
        text: true,
        class: "!text-sucess-main bg-white hover:bg-sucess-main/10 font-bold",
      },
      {
        intent: "error",
        text: true,
        class: "!text-error-main bg-white hover:bg-error-main/10 font-bold",
      },
      {
        intent: "warning",
        text: true,
        class:
          "text-warning-main bg-white hover:bg-warning-main/10 font-bold hover:text-warning-main",
      },
      {
        text: true,
        disabled: true,
        class: "!bg-white",
      },
      //soft
      {
        intent: "primary",
        soft: true,
        class:
          "bg-primary-main/14 !text-primary-dark font-sans font-bold hover:bg-primary-main/40",
      },
      {
        intent: "secondary",
        soft: true,
        class:
          "bg-secondary-main/14 !text-secondary-dark font-sans font-bold hover:bg-secondary-main/40",
      },
      {
        intent: "info",
        soft: true,
        class:
          "bg-info-main/14 !text-info-dark font-sans font-bold hover:bg-info-main/40",
      },
      {
        intent: "default",
        soft: true,
        class:
          "!bg-gray-700/8 !text-black font-sans font-bold hover:!bg-gray-300",
      },
      {
        intent: "warning",
        soft: true,
        class:
          "bg-warning-main/14 !text-warning-dark font-sans font-bold hover:bg-warning-main/40",
      },
      {
        intent: "error",
        soft: true,
        class:
          "bg-error-main/14 !text-error-dark font-sans font-bold hover:bg-error-main/40",
      },
      {
        intent: "sucess",
        soft: true,
        class:
          "bg-sucess-main/14 !text-sucess-dark font-sans font-bold hover:bg-sucess-main/40",
      },
      //icons
      {
        intent: "default",
        icon: true,
        class: "bg-white hover:rounded-full hover:!bg-gray-700/10 rounded-full",
      },

      {
        intent: "primary",
        icon: true,
        class:
          "bg-white hover:rounded-full hover:bg-primary-main/10 rounded-full ",
      },
      {
        intent: "secondary",
        icon: true,
        class:
          "bg-white hover:rounded-full hover:bg-secondary-main/10 rounded-full",
      },
      {
        intent: "info",
        icon: true,
        class: "bg-white hover:rounded-full hover:bg-info-main/10 rounded-full",
      },
      {
        intent: "warning",
        icon: true,
        class:
          "bg-white hover:rounded-full hover:bg-warning-main/10 rounded-full",
      },
      {
        intent: "error",
        icon: true,
        class:
          "bg-white hover:rounded-full hover:bg-error-main/10 rounded-full",
      },
      {
        intent: "sucess",
        icon: true,
        class:
          "bg-white hover:rounded-full hover:bg-sucess-main/10 rounded-full",
      },
      {
        disabled: true,
        icon: true,
        class: "!bg-white",
      },
    ],
    defaultVariants: {
      intent: "themeColor",
      inGroup: false,
      icon: false,
      soft: false,
      text: false,
      disabled: false,
      outline: false,
    },
  }
);

const BaseButton: FC<IBaseButtonProps> = (props) => {
  const {
    classNames,
    children,
    intent,
    disabled,
    size,
    fabsize,
    inGroup,
    outline,
    icon,
    text,
    soft,
    fab,
    ...other
  } = props;
  const { root, ...otherElement } = classNames || {};
  return (
    <Button
      classNames={{
        root: clsx(
          buttonVariants({
            intent,
            disabled,
            size,
            outline,
            text,
            soft,
            icon,
            fab,
            fabsize,
            inGroup,
          }),
          root
        ),
        
        ...otherElement,
      }}
      
      disabled={disabled}
      {...other}
    >
      {children}
    </Button>
  );
};

export default BaseButton;
