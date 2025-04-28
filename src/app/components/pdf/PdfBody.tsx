import { Divider } from "@mantine/core";
import React, { forwardRef } from "react";
import PdfSideCard from "./PdfCard";
import PdfSideHeader from "./PdfHeader";
import PdfSideLocation from "./PdfLocation";

type MenuContentProps = {
  filteredCategories: any[] | undefined;
  openCategories: string[];
  currency: string;

  logo: string;
  name: string;
};

const Pdf = forwardRef<HTMLDivElement, MenuContentProps>(
  ({ filteredCategories, currency, logo, name }, ref) => {
    const contact = filteredCategories?.[0]?.menus?.restaurant_id?.phone;
    const location = filteredCategories?.[0]?.menus?.restaurant_id?.address;
    const email = filteredCategories?.[0]?.menus?.restaurant_id?.email;

    return (
      <div ref={ref} className="container px-4 mx-auto  mb-10">
        <PdfSideHeader logo={logo} name={name} />
        <Divider size="sm" />
        <p className="text-4xl text-center tracking-widest font-thin pb-6">
          MENU
        </p>
        <Divider size="sm" className="mt-4" />

        {filteredCategories?.map((category) => (
          <div key={category.id}>
            <div className="bg-white p-4 rounded-lg shadow-2x dark:bg-gray-800">
              <p className="font-bold text-lg sm:text-2xl text-gray-800 dark:text-white flex justify-between items-center cursor-pointer hover:text-blue-600 transition-all duration-300 pt-2">
                {category.category_name}
              </p>

              <div className="mt-2 flex justify-center flex-wrap md:justify-start gap-4">
                {category.filteredItems.map((item: any) => (
                  <PdfSideCard item={item} key={item.id} currency={currency} />
                ))}
              </div>
            </div>
          </div>
        ))}
        <PdfSideLocation location={location} email={email} contact={contact} />
      </div>
    );
  }
);

export default Pdf;
