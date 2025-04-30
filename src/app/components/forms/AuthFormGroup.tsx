import { FC, ReactNode } from "react";
import background from '@/app/images/background.jpg';
import Image from "next/legacy/image";

type IFormGroupProps = {
  children: ReactNode;
};

const AuthFormGroup: FC<IFormGroupProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden md:flex w-1/2 h-screen">
        <Image
          src={background}
          layout="responsive"
          width={500}
          height={500}
          alt="Website Logo"
          className="w-full h-full object-cover opacity-80"
          priority
        />
      </div>
      <div className="flex w-full md:w-1/2 items-center justify-center px-4  sm:px-6 lg:px-8 opacity-90">
        <div className="w-full max-w-md p-6 sm:p-8">{children}</div>
      </div>
    </div>
  );
};

export default AuthFormGroup;
