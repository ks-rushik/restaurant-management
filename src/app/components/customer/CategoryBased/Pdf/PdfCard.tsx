import React, { FC } from "react";
import { Badge } from "@mantine/core";
import { Menu } from "@components/customer/ItemBased/CustomerSideBody";
import { IItemdata } from "@/app/components/item/AddItemModal";
type ICustomerSideCard = {
  category: {
    id: string;
    category_name: string;
    create_at: string;
    updated_at?: string;
    image?: string;
    status: "Available" | "Not Available";
    position?: number;
    menu_id: string;
    menus?: Menu;
    Items: IItemdata[];
  };
  currency: string | undefined;
};

const PdfCard: FC<ICustomerSideCard> = (props) => {
  const { currency, category } = props;

  return (
    <div className="px-2 md:px-8 w-full">
      {category?.Items.map((item: IItemdata) => (
        // item and description
        <div
          key={item.id}
          className={`flex flex-col pb-2 ${
            item.status === "Not Available" && " opacity-50"
          }`}
        >
          {/* name and price */}
          <div>
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-col md:flex-row md:gap-2 md:items-center items-start">
                <div className="merriweather-2 text-sm md:text-xl dark:text-white">
                  {item.name}
                </div>
                {item.status === "Not Available" && (
                  <Badge color="red">{item.status}</Badge>
                )}
              </div>

              <div className="roboto-mono text-sm md:text-xl dark:text-white">
                {currency}
                {item.price}
              </div>
            </div>

            {/* description */}
            <div
              className="w-full md:w-2/3 text-gray-800 text-xs md:text-base merriweather-roboto cursor-pointer transition-all duration-300 dark:text-gray-400 dark:!opacity-80 page-break-inside-avoid "
            >
              {item.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PdfCard;
