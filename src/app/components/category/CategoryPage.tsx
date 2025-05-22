"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";

import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import categories from "@/app/actions/category/addcategory-action";
import { fetchCategorydataQuery } from "@/app/actions/category/categoryfetchquery";
import deletecategory from "@/app/actions/category/deletecategory-action";
import { updateCategory } from "@/app/actions/category/updatecategory-action";

import AddCategoryModal, { ICategorydata } from "./AddCategoryModal";
import CategoryHeader from "./CategoryHeader";
import CategoryTable from "./CategoryTable";

const CategoryPage = () => {
  const queryClient = useQueryClient();
  const [categoryItem, setCategoryItem] = useState<ICategorydata[]>();
  const [selectedCategory, setSelectedCategory] =
    useState<ICategorydata | null>(null);
  const [loading, setLoading] = useState("");
  const [opened, { close }] = useDisclosure(false);
  const [searchData, setSearchData] = useState("");
  const [debouncedSearch] = useDebounce(searchData, 500);
  const [filterStatus, setFilterStatus] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();
  const menuId = pathname.split("/")[3];

  const {
    data: flatData,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    fetchCategorydataQuery(menuId, debouncedSearch, filterStatus),
  );
  const paginationProps = {
    fetchNextPage,
    hasNextPage,
  };

  const data = flatData?.pages.flatMap((page) => page.data) ?? [];

  useEffect(() => {
    if (data) {
      setCategoryItem(
        data.map((item) => ({
          ...item,
          position: item.position || 0,
        })),
      );
    }
  }, [flatData]);

  const handleView = (category_id: string) => {
    router.push(`/menu/${menuId}/category/${category_id}`);
  };

  const handleAddCategory = async (newItem: ICategorydata, file?: File) => {
    await categories(newItem, menuId, file);
    queryClient.invalidateQueries({ queryKey: ["category"] });
    notifications.show({
      message: `${newItem.category_name} added to category`,
      color: "green",
    });
  };

  const handleEditCategory = async (
    updatedmenu: ICategorydata,
    file?: File,
  ) => {
    await updateCategory(updatedmenu, menuId, file);
    queryClient.invalidateQueries({ queryKey: ["category"] });
    notifications.show({ message: "Category updated", color: "green" });
  };

  const handleDelete = async (id: string) => {
    setLoading(id);
    const { error } = await deletecategory(id);
    setLoading("");
    if (error) return;
    queryClient.invalidateQueries({ queryKey: ["category"] });
    notifications.show({ message: "Category deleted", color: "green" });
  };
  const handleSelectCategory = (item: ICategorydata) => {
    const modaldata: ICategorydata = {
      id: item.id || "",
      category_name: item.category_name || "",
      status: item.status || "",
      image: item.image ?? undefined,
    };
    setSelectedCategory(modaldata);
  };

  return (
    <div className="items-center px-4 pb-10 sm:px-12 md:px-16 lg:px-20 xl:px-32">
      <CategoryHeader>
        <AddCategoryModal
          onAddCategory={handleAddCategory}
          onEditCategory={handleEditCategory}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </CategoryHeader>

      <CategoryTable
        data={categoryItem}
        handleView={handleView}
        handleSelectCategory={handleSelectCategory}
        handleDelete={handleDelete}
        loading={loading}
        opened={opened}
        close={close}
        searchData={searchData}
        setSearchData={setSearchData}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        pagination={paginationProps}
      />
    </div>
  );
};

export default CategoryPage;
