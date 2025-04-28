import { Badge, Card, Text } from "@mantine/core";
import Image from "next/image";
import React, { FC } from "react";
import { IItemdata } from "../item/AddItemModal";

type IPdfSideCard = {
  item: IItemdata;
  currency: string;
};

const PdfSideCard: FC<IPdfSideCard> = (props) => {
  const { item, currency } = props;

  return (
    <Card
      shadow="sm"
      className="h-full flex flex-col w-60 dark:bg-gray-600 no-page-break relative" 
    >
      <div className=" max-w-xs overflow-hidden bg-cover bg-no-repeat ">
        <Image
          src={
            typeof item.image === "string"
              ? item.image
              : URL.createObjectURL(item.image as Blob)
          }
          width={500}
          height={500}
          alt="Website Logo"
          className="w-full max-h-44 min-h-56 object-cover transition no-page-break duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-black/30"
          priority
        />
      </div>
      <div className="flex flex-row justify-between pt-2 dark:text-white">
        <Text className="font-semibold text-base sm:text-xl">{item.name}</Text>
        <Text className="font-bold text-base sm:text-xl dark:text-white">
          {currency}
          {item.price}
        </Text>
      </div>

      <Text className="text-sm text-gray-500 font-mono mt-3 cursor-pointer dark:text-white">
        {item.description}
      </Text>

      {item.status === "Not Available" && (
        <Badge
          color="red"
          variant="filled"
          classNames={{
            root: "absolute top-4 right-4 flex items-center rounded-sm",
          }}
          style={{
            top: "1rem", // Adjust top position to suit your needs
          }}
        >
          NOT AVAILABLE
        </Badge>
      )}
    </Card>
  );
};

export default PdfSideCard;
