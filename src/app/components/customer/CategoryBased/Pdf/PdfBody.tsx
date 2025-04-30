import { Card } from "@mantine/core";
import Image from "next/image";
import React, { forwardRef } from "react";
import CustomerSideLocation from "../CustomerSideLocation";
import { Category } from "../../CustomerSideBody";
import PdfCard from "./PdfCard";

type IPdfBodyProps = {
  categories: Category[] | null | undefined;
  currency: string;
};

const PdfBody = forwardRef<HTMLDivElement, IPdfBodyProps>(
  ({ categories, currency }, ref) => {
    const { email, phone, address } =
      categories?.[0].menus?.restaurant_id || {};

    return (
      <div ref={ref} className="px-6 py-6" >
        {categories?.map((category, index) => (
          category.status === "Available" && <div className={`${index === 0 ? '' : 'page-break-before'}`} key={category.id}>
            <p className="py-2 text-2xl merriweather  ">
              {category.category_name}
            </p>
            <Card
              classNames={{
                root: "rounded-xl bg-gradient-to-tl from-blue-200 via-indigo-200 to-blue-400 dark:bg-gradient-to-tl, dark:from-gray-600 , dark:via-gray-400, dark:to-gray-900 shadow-lg",
              }}
            >
              <div
                className={`flex flex-col lg:flex-row items-center gap-6 ${
                  index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <Image
                  src={category.image!}
                  width={400}
                  height={400}
                  alt="Category Image"
                  className="w-full md:w-[400px] h-auto max-h-80 object-cover border-gray-300 shadow-md lg:rounded-xl !break-inside-avoid"
                />
                <PdfCard category={category} currency={currency} />
              </div>
            </Card>
          </div>
        ))}
        <CustomerSideLocation
          location={address!}
          email={email!}
          contact={phone!}
          classNames={{
            root: "bg-gradient-to-tl from-blue-200 via-indigo-200 to-blue-400 dark:bg-gradient-to-tl, dark:from-gray-600 , dark:via-gray-400, dark:to-gray-900 page-break-before",
          }}
        />
      </div>
    );
  }
);
export default PdfBody;
