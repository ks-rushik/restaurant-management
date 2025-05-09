"use client";
import React, { FC } from "react";
import Image from "next/legacy/image";
import LeftSideImage from "@/app/images/LeftSideImage";
import RightSideImage from "@/app/images/RightSideImage";

export type ICustomerSideHeaderProps = {
  logo: string;
  name: string;
};
const CustomerSideHeader: FC<ICustomerSideHeaderProps> = (props) => {
  const { logo, name } = props;
  return (
    <div className="flex  sm:flex-row justify-between items-center py-4  space-y-4 sm:space-y-0 sm:space-x-6">
  
      <LeftSideImage />

      <div className="flex flex-col items-center gap-2 sm:gap-4 w-full max-w-xs sm:max-w-md md:max-w-lg">
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
          <Image
            src={logo}
            alt="logo"
            width={100}
            height={100}
            className="rounded-full border-2 border-gray-300 shadow-md object-cover"
          />
        </div>

        <h1 className="text-lg sm:text-2xl md:text-3xl text-gray-800 text-center tracking-wide font-extrabold dark:text-white">
          {name}
        </h1>
      </div>
      <RightSideImage />
      {/* <Image
        src={knife}
        alt="knife"
        className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32"
      /> */}
    </div>
  );
};

export default CustomerSideHeader;
