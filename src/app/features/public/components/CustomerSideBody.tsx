import { Badge, Card, Collapse, Divider, Menu, Text } from "@mantine/core";
import React, { FC, useState, useEffect } from "react";
import useMenuItem from "../../menu/hook/useMenuItem";
import { IItemdata } from "../../item/components/AddItemModal";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import Image from "next/image";
import background from "../../../images/background.jpg";
import useShortUrl from "../hook/useUrl";

type ICustomerSideBodyProps = {
  categories: any[] | null | undefined;
  id: string;
};

const CustomerSideBody: FC<ICustomerSideBodyProps> = ({ categories, id }) => {
  const data = useMenuItem();
  const urldata = useShortUrl(id);
  const urlid = urldata?.[0].menu_id;

  const matchedItem = data?.find((item) => item.id === urlid);

  const currency = matchedItem?.currency;

  const [openCategories, setOpenCategories] = useState<string[]>(
    categories ? categories.map((category) => category.id) : []
  );

  const handleToggle = (categoryId: string) => {
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

      {categories?.map((category) => (
        <div key={category.id} onClick={() => handleToggle(category.id)}>
          <div className="bg-white p-4 rounded-lg shadow-lg">
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

            <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-4">
              {category.Items?.map((item: IItemdata) => (
                <Collapse
                  in={openCategories.includes(category.id)}
                  key={item.id}
                >
                  <Card shadow="sm" className="h-full flex flex-col w-60">
                    <Image
                      src={background}
                      layout="responsive"
                      alt="Website Logo"
                      className="w-full h-40 object-cover"
                      priority
                    />
                    <div className="flex flex-row justify-between  pt-2">
                      <Text className="font-light text-md">{item.name}</Text>
                      <Text className="text-black font-semibold ">
                        {currency}
                        {item.price}
                      </Text>
                    </div>

                    <Menu trigger="hover">
                      <Menu.Target>
                        <Text
                          className="text-sm text-gray-500  font-mono line-clamp-2 mt-3"
                          onClick={(e) => e.preventDefault()}
                        >
                          {item.description}
                        </Text>
                      </Menu.Target>
                      <Menu.Dropdown className="max-w-60">
                        <Text className="text-sm text-gray-500 px-2 font-mono ">
                          {item.description}
                        </Text>
                      </Menu.Dropdown>
                    </Menu>

                    {item.status === "InActive" && (
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
