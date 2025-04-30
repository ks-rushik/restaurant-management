import { FC, ReactNode } from "react";
import BaseLabel from "../ui/BaseLabel";
import BaseErrorMessage from "../ui/BaseErrorMessage";

type IFormFieldProps = {
  label?: string;
  name?: string;
  error?: string;
  children?: ReactNode;
  required?: boolean;
  size?:string
};

const FormField: FC<IFormFieldProps> = (props) => {
  const { label, name, error, children, required ,size  } = props;

  return (
    <div className="mb-2">
      <BaseLabel
        htmlFor={name}
        labeltitle={label!}
        required={required}
        size={size}
      />
      {children}
      {error && <BaseErrorMessage error={new Error(error)} />}
    </div>
  );
};

export default FormField;
