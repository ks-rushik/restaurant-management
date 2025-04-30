import { Badge, Card, Text } from "@mantine/core";
import Image from "next/legacy/image";
import React, { FC } from "react";
import { IItemdata } from "../../../item/AddItemModal";

type IPdfSideCard = {
  item: IItemdata;
  currency: string;
};

const PdfSideCard: FC<IPdfSideCard> = (props) => {
  const { item, currency } = props;

  return (
    <Card
      shadow="sm"
      className="w-60 dark:bg-gray-600 page-break-inside-avoid"
      style={{ pageBreakInside: "avoid" }}
    >
      <div className="relative overflow-hidden bg-cover bg-no-repeat">
        <Image
          src={
            typeof item.image === "string"
              ? item.image
              : URL.createObjectURL(item.image as Blob)
          }
          width={500}
          height={500}
          alt="Item Image"
          className="w-full max-h-44 min-h-56 object-cover "
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

      <Text
        className="text-sm text-gray-500 font-mono mt-3 dark:text-white"
        style={{ maxHeight: "20em", pageBreakInside: "avoid" }}
      >
        {item.description}
      </Text>

      {item.status === "Not Available" && (
        <Badge
          color="red"
          variant="filled"
          className="absolute top-4 right-4  rounded-sm"
        
        >
          NOT AVAILABLE
        </Badge>
      )}
    </Card>
  );
};

export default PdfSideCard;
