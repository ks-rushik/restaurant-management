import React, { FC, useEffect, useState } from "react";

import { IItemdata } from "@components/item/AddItemModal";
import { Badge } from "@mantine/core";

import { Jainoption } from "@/app/constants/common";

import { Menu } from "../ItemBased/CustomerSideBody";

type ICustomerSideCard = {
  category: {
    filteredItems: IItemdata[];
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

const CustomerSideCard: FC<ICustomerSideCard> = (props) => {
  const { currency, category } = props;
  const [expandedDescriptions, setExpandedDescriptions] = useState<
    Record<string, boolean>
  >({});
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDescription = (itemId: string, event: React.MouseEvent) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  return (
    <div className="px-2 md:px-8 w-full">
      {category?.filteredItems.map((item: IItemdata) => (
        // item and description
        <div
          key={item.id}
          className={`flex flex-col pb-4 ${
            item.status === "Not Available" && " opacity-50"
          }`}
        >
          {/* name and price */}
          <div>
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-col md:flex-row md:gap-2 md:items-center items-start">
                <div className="merriweather-2 text-sm md:text-xl dark:text-white flex items-center">
                  {item.name}
                  {Jainoption.Jain === item.jain && (
                    <Badge
                      title="Jain"
                      classNames={{
                        root: "mx-4 py-0 h-4 md:h-5  bg-primary-main opacity-70 text-sm text-gray-900",
                      }}
                    >
                      Jain
                    </Badge>
                  )}
                </div>
                {mounted && item.status === "Not Available" && (
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
              className={`w-full md:w-2/3 text-gray-800 text-xs md:text-base merriweather-roboto cursor-pointer transition-all duration-300 dark:text-gray-400 dark:!opacity-80 ${
                expandedDescriptions[item.id!] ? "" : "line-clamp-1"
              }`}
              onClick={(e) => toggleDescription(item.id!, e)}
            >
              {item.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerSideCard;
