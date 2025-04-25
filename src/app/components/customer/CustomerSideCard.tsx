import { Badge, Card, Text } from "@mantine/core";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { IItemdata } from "../item/AddItemModal";

type ICustomerSideCard = {
  item: IItemdata;
  currency: string;
};

const CustomerSideCard: FC<ICustomerSideCard> = (props) => {
  const { item, currency } = props;
  const [expandedDescriptions, setExpandedDescriptions] = useState<
    Record<string, boolean>
  >({});
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // expand description of item
  const toggleDescription = (itemId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // on click description stop to collapsive
    setExpandedDescriptions((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  return (
    <Card shadow="sm" className="h-full flex flex-col w-60 dark:bg-gray-600">
      <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
        <Image
          src={
            typeof item.image === "string"
              ? item.image
              : URL.createObjectURL(item.image as Blob)
          }
          width={800}
          height={600}
          alt="Website Logo"
          className="w-full max-h-44 min-h-56 object-cover transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-black/30"
          priority
        />
      </div>
      <div className="flex flex-row justify-between  pt-2 dark:text-white">
        <Text className=" font-semibold text-base sm:text-xl">{item.name}</Text>
        <Text className="font-bold text-base sm:text-xl dark:text-white">
          {currency}
          {item.price}
        </Text>
      </div>

      <Text
        className="text-sm text-gray-500 font-mono mt-3 cursor-pointer dark:text-white"
        onClick={(e) => toggleDescription(item.id!, e)}
      >
        {expandedDescriptions[item.id!]
          ? item.description
          : `${item.description?.substring(0, 50)}...`}
      </Text>

      {mounted && item.status === "Not Available" && (
        <Badge
          color="red"
          variant="filled"
          className="absolute top-4 right-4 px-2 py-1 text-sm  rounded-sm"
        >
          NOT AVAILABLE
        </Badge>
      )}
    </Card>
  );
};

export default CustomerSideCard;
