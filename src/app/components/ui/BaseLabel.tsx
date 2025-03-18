import { InputLabel, InputLabelProps } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";

type IBaseLableProps = InputLabelProps & {
  labeltitle: string;
  className?: string;
};

const BaseLabel: FC<IBaseLableProps> = (props) => {
  const { labeltitle, className, ...other } = props;
  return (
    <InputLabel className={clsx(" text-[#737380] mb-2 font-semibold text-sm font-[system-ui]  ", className)} {...other}>
      {labeltitle}
    </InputLabel>
  );
};

export default BaseLabel;