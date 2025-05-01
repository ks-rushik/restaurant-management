import Image from "next/image";
import React, { FC, useState } from "react";

import CustomerSideLocation from "@components/customer/CustomerSideLocation";
import { ICustomerSideBodyProps } from "@components/customer/ItemBased/CustomerSideBody";
import { IItemdata } from "@components/item/AddItemModal";
import BaseButton from "@components/ui/BaseButton";
import BaseTextField from "@components/ui/BaseInput";
import ThemeButton from "@components/ui/ThemeButton";
import { Card } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { IoSearch } from "react-icons/io5";

import { getUrlDataQuery } from "@/app/actions/customer/getUrlDataQuery";
import { useThemeToggle } from "@/app/hook/useThemetoggle";

import CustomerSideCard from "./CustomerSideCard";
import PdfBody from "./Pdf/PdfBody";

const CustomerSideBody: FC<ICustomerSideBodyProps> = (props) => {
  const { id, categories } = props;
  const [searchValue, setSearchValue] = useState("");

  const { email, phone, address } = categories?.[0].menus?.restaurant_id || {};
  const { theme, toggleTheme, mounted } = useThemeToggle();

  const urldata = useQuery(getUrlDataQuery(id));
  const urlid = urldata.data?.[0].menu_id;
  const currency = categories
    ?.map((item) => item.menus)
    .find((menu) => menu?.id === urlid)?.currency;

  const filteredCategories = categories
    ?.map((category) => {
      const filteredItems = category.Items?.filter((item: IItemdata) =>
        item.name?.toLowerCase().includes(searchValue.toLowerCase()),
      );
      return { ...category, filteredItems };
    })
    .filter(
      (category) =>
        category.status === "Available" &&
        category.filteredItems &&
        category.filteredItems.length > 0,
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
    <div>
      <div className="hidden" id="pdf-section">
        <PdfBody categories={categories} currency={currency!} />
      </div>
      <div className="p-6" id="main-content">
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
          <BaseButton
            classNames={{ root: "h-[53.5px] text-md font-extrabold" }}
            onClick={handlePrint}
          >
            Download Menu
          </BaseButton>
        </span>
        {mounted && theme && (
          <ThemeButton theme={theme} onChange={toggleTheme} />
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
                  root: "rounded-xl bg-gradient-to-tl from-blue-200 via-indigo-200 to-blue-400 dark:bg-gradient-to-tl, dark:from-gray-600 , dark:via-gray-400, dark:to-gray-900 shadow-lg page-break-inside-avoid",
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
            root: "my-10 bg-gradient-to-tl from-blue-200 via-indigo-200 to-blue-400 dark:bg-gradient-to-tl, dark:from-gray-600 , dark:via-gray-400, dark:to-gray-900",
          }}
        />
      </div>
    </div>
  );
};

export default CustomerSideBody;
