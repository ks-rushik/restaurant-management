import { Collapse, Divider } from "@mantine/core";
import React, { FC, useEffect, useRef, useState } from "react";
import { IItemdata } from "../item/AddItemModal";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import useShortUrl from "../../hooks/useUrl";
import ThemeButton from "../ui/ThemeButton";
import CustomerSideCard from "./CustomerSideCard";
import { changeTheme } from "@/app/helper/changeTheme";
import BaseTextField from "../ui/BaseInput";
import { IoSearch } from "react-icons/io5";
import BaseButton from "../ui/BaseButton";
import Pdf from "../pdf/PdfBody";
import CustomerSideLocation from "./CategoryBased/CustomerSideLocation";

export type Restaurant = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  logo: string;
  created_at: string;
};

export type Menu = {
  id: string;
  menu_name: string;
  currency: string;
  created_at: string;
  restaurant_id: Restaurant;
};

export type Category = {
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

export type ICustomerSideBodyProps = {
  categories: Category[] | null | undefined;
  id: string;
};

const CustomerSideBody: FC<ICustomerSideBodyProps> = ({ categories, id }) => {
  const [theme, setTheme] = useState<"dark" | "light">();
  const [mounted, setMounted] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [openCategories, setOpenCategories] = useState<string[]>(
    categories ? categories.map((c) => c.id) : []
  );

  const pdfRef = useRef<HTMLDivElement>(null);

  const { email, phone, address, logo, name } =
    categories?.[0].menus?.restaurant_id || {};

  const urldata = useShortUrl(id);
  const urlid = urldata?.[0]?.menu_id;
  const currency = categories
    ?.map((item) => item.menus)
    .find((menu) => menu?.id === urlid)?.currency;

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

  const handleToggle = (categoryId: string) => {
    setOpenCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
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

  const handlePrint = () => {
    const pdfSection = document.getElementById("pdf-section");
    const mainContent = document.getElementById("main-content");

    if (pdfSection && mainContent) {
      pdfSection.style.display = "block";
      mainContent.style.display = "none";

      window.print();

      pdfSection.style.display = "none";
      mainContent.style.display = "block";
    }
  };

  return (
    <div className="space-y-8">
      <div className="hidden" id="pdf-section">
        <Pdf
          filteredCategories={filteredCategories}
          currency={currency!}
          logo={logo!}
          name={name!}
          openCategories={[]}
        />
      </div>
      <div id="main-content">
        <Divider size="sm" />
        <p className="text-4xl text-center tracking-widest font-thin my-4">
          MENU
        </p>
        <Divider size="sm" className="mb-4" />
        {mounted && theme && (
          <ThemeButton theme={theme} onChange={handleThemeChange} />
        )}

        <div className="  flex flex-col sm:flex-row justify-end gap-3 items-stretch sm:items-center mb-4">
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

          <BaseButton
            onClick={handlePrint}
            classNames={{ root: "h-[53.5px] text-md font-extrabold" }}
          >
            Download Menu
          </BaseButton>
        </div>

        {noMenusFound ? (
          <div className="text-center text-gray-500 dark:text-gray-300 font-medium text-lg">
            No Menus Found
          </div>
        ) : (
          filteredCategories?.map((category) => (
            <div
              key={category.id}
              onClick={() => handleToggle(category.id)}
              className=""
            >
              <div className="p-4 rounded-lg shadow-2xl dark:bg-gray-800">
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

                <div className="mt-2 flex justify-center flex-wrap md:justify-start gap-4">
                  {category.filteredItems.map((item: IItemdata) => (
                    <Collapse
                      in={openCategories.includes(category.id)}
                      key={item.id}
                    >
                      <CustomerSideCard item={item} currency={currency!} />
                    </Collapse>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}

        <CustomerSideLocation
          location={address!}
          email={email!}
          contact={phone!}
          classNames={{ root: "dark:bg-gray-800 dark:border-gray-800" }}
        />
      </div>
    </div>
  );
};

export default CustomerSideBody;
