import { Divider } from "@mantine/core";
import React, { forwardRef } from "react";
import PdfSideCard from "./PdfCard";
import PdfSideLocation from "./PdfLocation";
import { IItemdata } from "@components/item/AddItemModal";

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
      <>
      <div ref={ref} className="container px-4 mx-auto mb-10">
        <Divider size="sm" />
        <p className="text-4xl text-center tracking-widest font-thin p-6">
          MENU
        </p>
        <Divider size="sm" className="mt-4" />

        {filteredCategories?.map((category ,index ) => (
         <div
         key={category.id}
         className={`py-6 ${index === 0 ? '' : 'page-break-before'}`}

       >
         <div className="p-4  dark:bg-gray-800">
           <p className="font-bold text-lg sm:text-2xl text-gray-800 dark:text-white flex justify-between items-center  pt-2">
             {category.category_name}
           </p>

           <div className="mt-6 flex justify-center flex-wrap md:justify-start gap-16">
             {category.filteredItems.map((item: IItemdata) => (
              
                 <PdfSideCard item={item} key={item.id} currency={currency} />
             ))}
           </div>
         </div>
       </div>
        ))}
        <div className="mt-8">
          <PdfSideLocation location={location} email={email} contact={contact} />
        </div>
      </div>
      </>
    );
  }
);
export default Pdf;
