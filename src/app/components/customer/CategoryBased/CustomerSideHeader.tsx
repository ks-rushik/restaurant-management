import React, { FC } from "react";
import { ICustomerSideHeaderProps } from "../ItemBased/CustomerSideHeader";
import Image from "next/image";

const CustomerSideHeader: FC<ICustomerSideHeaderProps> = (props) => {
  const { logo, name } = props;
  return (
    <div className="flex  justify-center pt-2">
      <div className="flex flex-col justify-center items-center space-y-2">
      <Image
          src={logo}
          alt="logo"
          width={150}
          height={150}
          className="rounded-full border-2 border-gray-300 shadow-md object-cover"
        />
        <h1 className="text-2xl">{name}</h1>
      </div>
    </div>
  );
};

export default CustomerSideHeader;
