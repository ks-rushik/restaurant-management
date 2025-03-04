import { BackgroundImage, Box, Center } from "@mantine/core";
import { FC, ReactNode } from "react";

type IFormGroupProps = {
  children: ReactNode;
};

const FormGroup: FC<IFormGroupProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-6 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md p-6 sm:p-8 bg-white  rounded-xl shadow-2xl border">
        {children}
      </div>
    </div>
  );
};

export default FormGroup;
