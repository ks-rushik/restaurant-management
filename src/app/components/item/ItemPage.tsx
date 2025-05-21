"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

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

const ItemPage = () => {
  const pathname = usePathname();
  const categoryId = pathname.split("/")[5];
  const [itemdata, setItemdata] = useState<IItemdata[]>();
  const [searchData, setSearchData] = useState("");
  const [debouncedSearch] = useDebounce(searchData, 500);
  const [filters, setFilters] = useState<IFilter>({
    avaibilityStatus: "",
    jainOption: "",
  });

  const [selectedItem, setSelectedItem] = useState<IItemdata | null>(null);
  const [loading, setLoading] = useState("");
  const [opened, { close }] = useDisclosure(false);

  const {
    data: alldata,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    fetchItemdataQuery(categoryId, debouncedSearch, filters),
  );
  const paginationProps = {
    fetchNextPage,
    hasNextPage,
  };
  const data = alldata?.pages.flat();

  useEffect(() => {
    if (data) {
      setItemdata(
        data.map((item) => ({
          ...item,
          position: item.position || 0,
        })),
      );
    }
  }, [alldata]);

  const handleAddItem = async (newItem: IItemdata, file?: File) => {
    const addedItem = await item(newItem, categoryId, file);
    if (addedItem)
      setItemdata((prev) => (prev ? [...prev, addedItem] : [addedItem]));
    notifications.show({
      message: `${newItem.name} added to item`,
      color: "green",
    });
  };

  const handleDelete = async (id: string) => {
    setLoading(id);
    const { error } = await deleteitem(id);
    setLoading("");
    if (error) return;
    const filterdata = itemdata?.filter((item) => item.id !== id);
    setItemdata(filterdata);
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
      <ItemHeader>
        <AddItemModal
          onAddItem={handleAddItem}
          onEditItem={handleEditItem}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </ItemHeader>
      <ItemTable
        pagination={paginationProps}
        data={itemdata}
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
