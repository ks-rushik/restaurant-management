import { Badge, Card, Collapse, Divider, Menu, Text } from "@mantine/core";
import React, { FC, useState, useEffect } from "react";
import useMenuItem from "../../menu/hook/useMenuItem";
import { IItemdata } from "../../../components/item/AddItemModal";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import Image from "next/image";
import useShortUrl from "../hook/useUrl";
import { IMenudata } from "../../menu/types/type";

type ICustomerSideBodyProps = {
  categories: any[] | null | undefined;
  id: string;
};

const CustomerSideBody: FC<ICustomerSideBodyProps> = ({ categories, id }) => {
  const urldata = useShortUrl(id);
  const urlid = urldata?.[0].menu_id;

  const currency = categories
    ?.map((item) => item.menus)
    .find((menu) => menu?.id === urlid)?.currency;

  const [openCategories, setOpenCategories] = useState<string[]>(
    categories ? categories.map((category) => category.id) : []
  );
  const [mounted, setMounted] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = (categoryId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    setOpenCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  const toggleDescription = (itemId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setExpandedDescriptions((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };
  console.log(categories, "images");

  return (
    <div className="space-y-8">
      <Divider size="sm" />
      <p className=" text-4xl text-center tracking-widest font-thin">MENU</p>
      <Divider size="sm" className="mb-4" />

      {categories?.map((category) => (
        <div key={category.id} onClick={(event) => handleToggle(category.id ,event)}>
          <div className="bg-white p-4 rounded-lg shadow-2xl">
            <p className="font-bold text-lg sm:text-2xl text-gray-800 flex justify-between items-center cursor-pointer hover:text-blue-600 transition-all duration-300">
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
                  <Card shadow="sm" className="h-full flex flex-col w-60">
                    <Image
                      src={
                        typeof item.image === "string"
                          ? item.image
                          : URL.createObjectURL(item.image as Blob)
                      }
                      width={20}
                      height={20}
                      layout="responsive"
                      alt="Website Logo"
                      className="w-full max-h-44 min-h-56 object-cover"
                      priority
                    />
                    <div className="flex flex-row justify-between  pt-2">
                      <Text className=" font-semibold text-base sm:text-xl ">
                        {item.name}
                      </Text>
                      <Text className="font-bold text-lg sm:text-xl ">
                        {currency}
                        {item.price}
                      </Text>
                    </div>

                    <Text
                      className="text-sm text-gray-500 font-mono mt-3 cursor-pointer"
                      onClick={(e) => toggleDescription(item.id!, e)}
                    >
                      {expandedDescriptions[item.id!]
                        ? item.description
                        : `${item.description?.substring(0, 50)}...`}
                    </Text>

                    {mounted && item.status === "InActive" && (
                      <Badge
                        color="red"
                        variant="filled"
                        className="absolute top-4 right-4 px-2 py-1 text-sm  rounded-sm"
                      >
                        NOT AVAILABLE
                      </Badge>
                    )}
                  </Card>
                </Collapse>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerSideBody;
