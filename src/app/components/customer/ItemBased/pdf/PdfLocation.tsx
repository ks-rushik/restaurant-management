import { Paper } from "@mantine/core";
import React, { FC } from "react";

type IPdfSideLocation = {
  location: string;
  email: string;
  contact: string;
};

const PdfSideLocation:FC<IPdfSideLocation> = (props) => {
  const { location, email, contact } = props;
  return (
    <Paper
      shadow="md"
      radius="lg"
      withBorder
      p="xl"
      className="h-full flex flex-col rounded-lg dark:bg-gray-800 dark:border-gray-800 "
      
    >
      <h2 className="mb-3 font-semibold text-base sm:text-xl w-1/2 dark:text-white ">
        Our Location
      </h2>
      <div className="flex justify-between sm:flex-row flex-col  ">
        <p className="text-gray-500  text-base  font-mono w-1/2  cursor-pointer dark:text-white">
          {location}
        </p>
        <div className="flex-row">
          <p className="text-blue-400 font-serif font-semibold opacity-70 dark:text-blue-400">
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

export default PdfSideLocation;
