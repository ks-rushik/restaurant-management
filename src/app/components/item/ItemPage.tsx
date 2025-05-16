"use client";

import { usePathname } from "next/navigation";
import React, { FC, useEffect, useState } from "react";

import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import { IMessages } from "@/app/[locale]/messages";
import { item } from "@/app/actions/item/additem-action";
import deleteitem from "@/app/actions/item/deleteitem-action";
import { fetchItemdataQuery } from "@/app/actions/item/itemfetchquery";
import { updateItem } from "@/app/actions/item/updateitem-action";

import AddItemModal, { IItemdata } from "./AddItemModal";
import ItemHeader from "./ItemHeader";
import ItemTable from "./ItemTable";

export type IFilter = {
  avaibilityStatus: string;
  jainOption: string;
};

const ItemPage = ({ lang }: { lang: IMessages }) => {
  const pathname = usePathname();
  const categoryId = pathname.split("/")[5];
  const [Item, setItem] = useState<IItemdata[]>();
  const [searchData, setSearchData] = useState("");
  const [debouncedSearch] = useDebounce(searchData, 500);
  const [filters, setFilters] = useState<IFilter>({
    avaibilityStatus: "",
    jainOption: "",
  });

  const [selectedItem, setSelectedItem] = useState<IItemdata | null>(null);
  const [loading, setLoading] = useState("");
  const [opened, { close }] = useDisclosure(false);
  const { data } = useQuery(
    fetchItemdataQuery(categoryId, debouncedSearch, filters),
  );

  useEffect(() => {
    if (data) {
      setItem(
        data.map((item) => ({
          ...item,
          position: item.position || 0,
        })),
      );
    }
  }, [data]);

  const handleAddItem = async (newItem: IItemdata, file?: File) => {
    const addedItem = await item(newItem, categoryId, file);
    if (addedItem)
      setItem((prev) => (prev ? [...prev, addedItem] : [addedItem]));
    notifications.show({
      message: `${newItem.name} added to item`,
      color: "green",
    });
  };

  const handleDelete = async (id: string) => {
    setItem((prev) => prev?.filter((item) => item.id !== id));
    setLoading(id);
    await deleteitem(id);
    setLoading("");
    notifications.show({ message: "Category deleted", color: "green" });
  };

  const handleEditItem = async (updateditem: IItemdata, file?: File) => {
    await updateItem(updateditem, categoryId, file);
    notifications.show({ message: "Category updated", color: "green" });
  };

  const handleSelectedItem = (item: IItemdata) => {
    const modaldata: IItemdata = {
      id: item.id || "",
      name: item.name || "",
      status: item.status || "",
      description: item.description || "",
      price: item.price || "",
      image: item.image,
      jain: item.jain,
    };
    setSelectedItem(modaldata);
  };

  return (
    <div className="items-center px-4 pb-10 sm:px-12 md:px-16 lg:px-20 xl:px-32">
      <ItemHeader lang={lang}>
        <AddItemModal
          lang={lang}
          onAddItem={handleAddItem}
          onEditItem={handleEditItem}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </ItemHeader>
      <ItemTable
        lang={lang}
        data={Item}
        handleSelectItem={handleSelectedItem}
        handleDelete={handleDelete}
        loading={loading}
        opened={opened}
        close={close}
        searchData={searchData}
        setSearchData={setSearchData}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
};

export default ItemPage;
