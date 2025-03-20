"use client";
import React from "react";
import Image from "next/image";
import dish from "../../../images/dish-svgrepo-com.svg";
import knife from "../../../images/fork-and-knife-svgrepo-com (2).svg";

const CustomerSideHeader = ({logo ,name}) => {
  
  return (
    <div className="flex  sm:flex-row justify-between items-center py-4  space-y-4 sm:space-y-0 sm:space-x-6">
      <Image
        src={dish}
        alt="dish"
        className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32"
      />

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

        <h1 className="text-lg sm:text-2xl md:text-3xl text-gray-800 text-center tracking-wide font-extrabold">
          {name}
        </h1>
      </div>

      <Image
        src={knife}
        alt="knife"
        className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32"
      />
    </div>
  );
};

export default CustomerSideHeader;
