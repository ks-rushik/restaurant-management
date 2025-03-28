import { FC, ReactNode } from "react";

type IFormGroupProps = {
  children: ReactNode;
};

const FormGroup: FC<IFormGroupProps> = ({ children }) => {
  return (
    <div className="flex pt-12 px-4 sm:px-12 md:px-20 lg:px-32 xl:px-40  ">
      <div className="w-full max-w-5xl mx-auto p-6 border bg-white dark:bg-gray-800 dark:border-gray-800 rounded-2xl shadow-xl opacity-100">
        {children}
      </div>
    </div>
  );
};

export default FormGroup;
