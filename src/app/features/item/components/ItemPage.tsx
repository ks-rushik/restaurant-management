"use client";
import React, { useState } from "react";
import ItemHeader from "./ItemHeader";
import ItemTable from "./ItemTable";
import AddItemModal, { IItemdata } from "./AddItemModal";
import { notifications } from "@mantine/notifications";
import { item } from "../actions/additem-action";
import { usePathname, useSearchParams } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { updateItemOrder } from "../actions/updateposition-action";
import deleteitem from "../actions/deleteitem-action";
const ItemPage = () => {
  const pathname = usePathname();
  const searchParam = useSearchParams();
  const categoryname = searchParam.get("name")!;
  const categoryId = pathname.split("/")[3];
  console.log(categoryId, categoryname, "item[page]");

  const [Item, setItem] = useState<IItemdata[]>();
  const [loading, setLoading] = useState("");
  const [opened, { close }] = useDisclosure(false);

  const handleAddItem = async (newItem: IItemdata) => {
    const addedItem = await item(newItem, categoryId);
    if (addedItem)
      setItem((prev) => (prev ? [...prev, addedItem] : [addedItem]));
    notifications.show({
      message: `${newItem.name} added to item`,
    });
  };

    const handleMoveUp = async (index: number) => {
      if (!Item || index === 0) return;
  
      const newMenuItem = [...Item];
      [newMenuItem[index - 1].position, newMenuItem[index].position] = [
        newMenuItem[index].position,
        newMenuItem[index - 1].position,
      ];
      [newMenuItem[index - 1], newMenuItem[index]] = [
        newMenuItem[index],
        newMenuItem[index - 1],
      ];
  
      setItem(newMenuItem);
  
      await updateItemOrder({
        id: newMenuItem[index].id!,
        position: newMenuItem[index].position!,
      });
      await updateItemOrder({
        id: newMenuItem[index - 1].id!,
        position: newMenuItem[index - 1].position!,
      });
    };
  
    const handleMoveDown = async (index: number) => {
      if (!Item || index === Item.length - 1) return;
  
      const newMenuItem = [...Item];
      [newMenuItem[index + 1].position, newMenuItem[index].position] = [
        newMenuItem[index].position,
        newMenuItem[index + 1].position,
      ];
      [newMenuItem[index + 1], newMenuItem[index]] = [
        newMenuItem[index],
        newMenuItem[index + 1],
      ];
  
      setItem(newMenuItem);
  
      await updateItemOrder({
        id: newMenuItem[index].id!,
        position: newMenuItem[index].position!,
      });
      await updateItemOrder({
        id: newMenuItem[index + 1].id!,
        position: newMenuItem[index + 1].position!,
      });
    };

    const handleDelete = async (id:string) => {
        setItem((prev) => prev?.filter((item) => item.id !== id));
        setLoading(id);
        await deleteitem(id);
        setLoading("");
        notifications.show({ message: "Category deleted" });
    }

  return (
    <div className="items-center px-4 sm:px-12 md:px-16 lg:px-20 xl:px-32">
      <ItemHeader>
        <AddItemModal onAddItem={handleAddItem} />
      </ItemHeader>
      <ItemTable
        data={Item}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleDelete={handleDelete}
        loading={loading}
        opened={opened}
        close={close}
      />
    </div>
  );
};

export default ItemPage;
