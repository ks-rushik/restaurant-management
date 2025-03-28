import { Button, ButtonProps, ButtonStylesNames } from "@mantine/core";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { ButtonHTMLAttributes, FC } from "react";

type IBaseButtonProps = ButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    classNames?: 
      Partial<Record<ButtonStylesNames, string>>;
    type?: "button" | "submit" | "reset";
  };

const buttonVariants = cva(
  "transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none",
  {
    variants: {
      disabled: {
        true: "mb-6 text-sm rounded-lg block p-2.5 cursor-not-allowed",
        false: "",
      },
      intent: {
        primary: "bg-blue-600 hover:bg-blue-700 text-blue-100 hover:text-white",
        warning:
          "bg-yellow-500 hover:bg-yellow-600 text-orange-100 hover:text-white",
        danger: "bg-red-500 hover:bg-red-600 text-orange-100 hover:text-white",
        inverse: "bg-gray-600 hover:bg-gray-700 text-blue-100 hover:text-white",
        success:
          "bg-green-600 hover:bg-green-700 text-teal-100 hover:text-white",
        purple: "bg-indigo-700 hover:bg-indigo-800 text-white",
        default: "bg-gray-500 hover:bg-gray-600",
      },
    },
    defaultVariants: {
      intent: "primary",
      disabled: false,
    },
  }
);

const BaseButton: FC<IBaseButtonProps> = (props) => {
  const { classNames, children,intent,disabled, ...other } = props;
  const { root, ...otherElement } = classNames || {};
  return (
    <Button
      classNames={{
        root: clsx(buttonVariants({intent,disabled}), root),
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