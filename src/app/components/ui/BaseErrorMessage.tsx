import { Text, TextProps } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";

type IErrorMessage = TextProps & {
  error?:Error
};

const BaseErrorMessage:FC<IErrorMessage> = (props: IErrorMessage)=>{
  const {error, className, ...other } = props;

  return (
    <Text className={clsx("text-red-500 ", className)} {...other}>
      {error?.message}
    </Text>
  );
}

export default BaseErrorMessage