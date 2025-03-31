"use client";
import React, { useEffect, useState } from "react";
import ItemHeader from "./ItemHeader";
import ItemTable from "./ItemTable";
import AddItemModal, { IItemdata } from "./AddItemModal";
import { notifications } from "@mantine/notifications";
import { item } from "../../actions/item/additem-action";
import { usePathname } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { updateItemOrder } from "../../actions/item/updateposition-action";
import deleteitem from "../../actions/item/deleteitem-action";
import useItem from "../../hooks/useItem";
import { updateItem } from "../../actions/item/updateitem-action";
const ItemPage = () => {
  const pathname = usePathname();
  const categoryId = pathname.split("/")[4];
  const data = useItem(categoryId);
  const [Item, setItem] = useState<IItemdata[]>();
  const [selectedItem, setSelectedItem] = useState<IItemdata | null>(null);
  const [loading, setLoading] = useState("");
  const [opened, { close }] = useDisclosure(false);

  useEffect(() => {
    if (data) {
      setItem(
        data.map((item) => ({
          ...item,
          position: item.position || 0,
        }))
      );
    }
  }, [data]);  

  const handleAddItem = async (newItem: IItemdata , file?:File) => {
    const addedItem = await item(newItem, categoryId ,file);
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

  const handleDelete = async (id: string) => {
    setItem((prev) => prev?.filter((item) => item.id !== id));
    setLoading(id);
    await deleteitem(id);
    setLoading("");
    notifications.show({ message: "Category deleted" });
  };

  const handleEditItem = async (updateditem: IItemdata,file?: File) => {    
    await updateItem(updateditem, categoryId,file);
    notifications.show({ message: "Category updated" });
  };

  const handleSelectedItem = (item: IItemdata) => {
    
    const modaldata: IItemdata = {
      id: item.id || "",
      name: item.name || "",
      status: item.status || "",
      description: item.description || "",
      price: item.price || "",
      image: item.image
    };
    setSelectedItem(modaldata);
    
  };

  return (
    <div className="items-center px-4 sm:px-12 md:px-16 lg:px-20 xl:px-32">
      <ItemHeader>
        <AddItemModal
          onAddItem={handleAddItem}
          onEditItem={handleEditItem}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </ItemHeader>
      <ItemTable
        data={Item}
        handleMoveUp={handleMoveUp}
        handleSelectItem={handleSelectedItem}
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
