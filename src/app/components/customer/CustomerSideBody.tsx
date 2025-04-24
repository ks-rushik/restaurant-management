import {  Collapse, Divider} from "@mantine/core";
import React, { FC, useState } from "react";
import { IItemdata } from "../item/AddItemModal";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import useShortUrl from "../../hooks/useUrl";
import ThemeButton from "../ui/ThemeButton";
import { useTheme } from "@/app/hooks/useTheme";
import CustomerSideCard from "./CustomerSideCard";
import CustomerSideLocation from "./CustomerSideLocation";

type ICustomerSideBodyProps = {
  categories: any[] | null | undefined;
  id: string;
};

const CustomerSideBody: FC<ICustomerSideBodyProps> = (props) => {
  const { categories, id } = props;

  const urldata = useShortUrl(id);
  const { theme, toggleTheme } = useTheme();
  const urlid = urldata?.[0].menu_id;

  const currency = categories
    ?.map((item) => item.menus)
    .find((menu) => menu?.id === urlid)?.currency;
  
  const contact = categories?.[0].menus.restaurant_id.phone;
  const location = categories?.[0].menus.restaurant_id.address;
  const email = categories?.[0].menus.restaurant_id.email;

  const [openCategories, setOpenCategories] = useState<string[]>(
    categories ? categories.map((category) => category.id) : []
  );

  const handleToggle = (categoryId: string, event: React.MouseEvent) => {
    setOpenCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="space-y-8">
      <Divider size="sm" />
      <p className=" text-4xl text-center tracking-widest font-thin">MENU</p>
      <Divider size="sm" className="mb-4" />
      <ThemeButton theme={theme} toggleTheme={toggleTheme} />
      {categories?.map(
        (category) =>
          category.status === "Available" && (
            <div
              key={category.id}
              onClick={(event) => handleToggle(category.id, event)}
            >
              <div className="bg-white p-4 rounded-lg shadow-2x dark:bg-gray-800">
                <p className="font-bold text-lg sm:text-2xl text-gray-800 dark:text-white flex justify-between items-center cursor-pointer hover:text-blue-600 transition-all duration-300 pt-2">
                  {category.category_name}
                  <span className="text-gray-500 text-sm">
                    {openCategories.includes(category.id) ? (
                      <FaAngleUp />
                    ) : (
                      <FaAngleDown />
                    )}
                  </span>
                </p>

                <div className="mt-2 flex justify-center flex-wrap  md:justify-start gap-4">
                  {category.Items?.map((item: IItemdata) => (
                    <Collapse
                      in={openCategories.includes(category.id)}
                      key={item.id}
                    >
                      <CustomerSideCard item={item} currency={currency} />
                    </Collapse>
                  ))}
                </div>
              </div>
            </div>
          )
      )}
      <CustomerSideLocation location={location} email={email} contact={contact}/>
    </div>
  );
};

export default CustomerSideBody;
