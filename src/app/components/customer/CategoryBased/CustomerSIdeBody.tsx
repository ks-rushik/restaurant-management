import React, { FC, useEffect, useState } from "react";
import { IItemdata } from "../../item/AddItemModal";
import useShortUrl from "@/app/hooks/useUrl";
import Image from "next/image";
import { Card } from "@mantine/core";
import BaseTextField from "../../ui/BaseInput";
import { IoSearch } from "react-icons/io5";
import BaseButton from "../../ui/BaseButton";
import { changeTheme } from "@/app/helper/changeTheme";
import ThemeButton from "../../ui/ThemeButton";
import CustomerSideCard from "./CustomerSideCard";
import { ICustomerSideBodyProps } from "../CustomerSideBody";
import CustomerSideLocation from "./CustomerSideLocation";

const CustomerSideBody: FC<ICustomerSideBodyProps> = (props) => {
  const { id, categories } = props;
  const [searchValue, setSearchValue] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const { email, phone, address } = categories?.[0].menus?.restaurant_id || {};

  useEffect(() => {
    const initialTheme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    setTheme(initialTheme);
    setMounted(true);
  }, []);

  const handleThemeChange = async () => {
    await changeTheme();
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  const urldata = useShortUrl(id);
  const urlid = urldata?.[0]?.menu_id;
  const currency = categories
    ?.map((item) => item.menus)
    .find((menu) => menu?.id === urlid)?.currency;

  const filteredCategories = categories
    ?.map((category) => {
      const filteredItems = category.Items?.filter((item: IItemdata) =>
        item.name?.toLowerCase().includes(searchValue.toLowerCase())
      );
      return { ...category, filteredItems };
    })
    .filter(
      (category) =>
        category.status === "Available" &&
        category.filteredItems &&
        category.filteredItems.length > 0
    );

  const noMenusFound = filteredCategories?.length === 0;

  return (
    <div className="p-6">
      <span className="flex flex-col sm:flex-row justify-end gap-3 items-stretch sm:items-center mb-4">
        {mounted && (
          <BaseTextField
            value={searchValue}
            placeholder="Search menu..."
            onChange={(e) =>
              setSearchValue((e.target as HTMLInputElement).value)
            }
            leftSection={
              <IoSearch
                size={20}
                className="hover:text-gray-700 dark:hover:text-gray-400"
              />
            }
          />
        )}
        <BaseButton classNames={{ root: "h-[53.5px] text-md font-extrabold" }}>
          Download Menu
        </BaseButton>
      </span>
      {mounted && theme && (
        <ThemeButton theme={theme} onChange={handleThemeChange} />
      )}

      {noMenusFound ? (
        <div className="text-center p-10 text-gray-900 dark:text-gray-300 font-medium text-lg">
          No Menus Found
        </div>
      ) : (
        filteredCategories?.map((category, index) => (
          <div className="" key={category.id}>
            <p className="py-4 text-2xl merriweather  ">
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
                  className="w-full md:w-[400px] h-auto max-h-80 object-cover border-gray-300 shadow-md lg:rounded-xl"
                />
                <CustomerSideCard category={category} currency={currency} />
              </div>
            </Card>
          </div>
        ))
      )}
      <CustomerSideLocation
        location={address!}
        email={email!}
        contact={phone!}
        classNames={{
          root: "bg-gradient-to-tl from-blue-200 via-indigo-200 to-blue-400 dark:bg-gradient-to-tl, dark:from-gray-600 , dark:via-gray-400, dark:to-gray-900",
        }}
      />
    </div>
  );
};

export default CustomerSideBody;
