import { Paper, PaperProps, PaperStylesNames } from "@mantine/core";
import clsx from "clsx";
import React, { FC } from "react";

type ICustomerSideLocation = PaperProps & {
  location: string;
  email: string;
  contact: string;
  classNames?: Partial<Record<PaperStylesNames, string>>;
};

const CustomerSideLocation: FC<ICustomerSideLocation> = (props) => {
  const { location, email, contact, classNames } = props;
  const { root } = classNames ?? {};
  return (
    <Paper
      shadow="md"
      radius="lg"
      p="xl"
      classNames={{
        root: clsx(" flex flex-col rounded-lg  shadow-lg mt-10", root),
      }}
    >
      <h2 className="mb-3 lg:font-semibold text-base sm:text w-1/2 dark:text-white ">
        Our Location
      </h2>
      <div className="flex justify-between md:flex-row flex-col gap-y-3 items-center">
        <p className="text-gray-900  lg:text-base  font-mono  cursor-pointer text-xs dark:text-white">
          {location}
        </p>
        <div className="flex-row">
          <p className="text-blue-800 font-serif font-semibold opacity-70 dark:text-blue-400">
            {email}
          </p>
          <p
            className="text-gray-800 text-base font-mono cursor-pointer dark:text-white"
            title="Contact number"
          >
            +91 {contact}
          </p>
        </div>
      </div>
    </Paper>
  );
};

export default CustomerSideLocation;
