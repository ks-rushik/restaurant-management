import { FC, ReactNode } from "react";

type IFormGroupProps = {
  children: ReactNode;
};

const FormGroup: FC<IFormGroupProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-6 sm:px-6 lg:px-8 bg-gray-50">
      <div className="min-w-[500px] max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border dark:border-gray-700">
        {children}
      </div>
    </div>
  );
};

export default FormGroup;
