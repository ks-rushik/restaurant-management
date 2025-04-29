import React, { FC, useEffect, useState } from "react";
import { ICustomerSideBodyProps } from "../CustomerSideBody";
import { IItemdata } from "../../item/AddItemModal";
import useShortUrl from "@/app/hooks/useUrl";
import Image from "next/image";
import { Badge, Card } from "@mantine/core";
import BaseTextField from "../../ui/BaseInput";
import { IoSearch } from "react-icons/io5";
import BaseButton from "../../ui/BaseButton";
import { changeTheme } from "@/app/helper/changeTheme";
import ThemeButton from "../../ui/ThemeButton";

const CustomerSideBody: FC<ICustomerSideBodyProps> = (props) => {
  const { id, categories } = props;
  const [expandedDescriptions, setExpandedDescriptions] = useState<
    Record<string, boolean>
  >({});
  const [searchValue, setSearchValue] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

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
  

  console.log(categories, "categories");

  const { logo, name } = categories?.[0]?.menus?.restaurant_id;
  const urldata = useShortUrl(id);
  const urlid = urldata?.[0]?.menu_id;
  const currency = categories
    ?.map((item) => item.menus)
    .find((menu) => menu?.id === urlid)?.currency;
  console.log(logo, name);

  const toggleDescription = (itemId: string, event: React.MouseEvent) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

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
      <span className="flex justify-end gap-3  items-center">
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
        <div className="text-center h-screen text-gray-900 dark:text-gray-300 font-medium text-lg">
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
                root: "rounded-xl bg-gradient-to-tl from-blue-200 via-indigo-200 to-blue-400 shadow-lg",
              }}
            >
              <div
                className={` ${
                  index % 2 === 0
                    ? "flex flex-row items-center"
                    : "flex flex-row-reverse items-center"
                }`}
              >
                <Image
                  src={category.image}
                  width={400}
                  height={400}
                  alt="Category Image"
                  className="h-80 border-gray-300 shadow-md rounded-xl"
                />

                <div className="px-8">
                  {category.filteredItems.map((item: IItemdata) => (
                    // item and description
                    <div
                      key={item.id}
                      className={`flex flex-col pb-4 ${
                        item.status === "Not Available" && " opacity-50"
                      }`}
                    >
                      {/* name and price */}
                      <div>
                        <div className="flex flex-row justify-between items-start">
                          <div className="flex flex-row gap-2 items-center">
                            <div className="merriweather-2 text-xl">
                              {item.name}
                            </div>
                            {mounted && item.status === "Not Available" && (
                              <Badge color="red">{item.status}</Badge>
                            )}
                          </div>

                          <div className="roboto-mono text-xl">
                            {currency}
                            {item.price}
                          </div>
                        </div>

                        {/* description */}
                        <div
                          className={`w-2/3 text-gray-800 text-base merriweather-roboto cursor-pointer transition-all duration-300 ${
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
              </div>
            </Card>
          </div>
        ))
      )}
    </div>
  );
};

export default CustomerSideBody;
