"use client";
import React, { useEffect, useState } from "react";
import CategoryHeader from "./CategoryHeader";
import AddCategoryModal, { ICategorydata } from "./AddCategoryModal";
import CategoryTable from "./CategoryTable";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { updateCategoryOrder } from "@/app/actions/category/updatePosition-action";
import categories from "@/app/actions/category/addcategory-action";
import { updateCategory } from "@/app/actions/category/updatecategory-action";
import deletecategory from "@/app/actions/category/deletecategory-action";
import useCategoryItem from "@/app/hooks/useCategoryItem";
import { useDebounce } from "use-debounce";

function CategoryPage() {
  const [CategoryItem, setCategoryItem] = useState<ICategorydata[]>();
  const [selectedCategory, setSelectedCategory] =
    useState<ICategorydata | null>(null);
  const [loading, setLoading] = useState("");
  const [opened, { close }] = useDisclosure(false);
  const [searchData, setSearchData] = useState("");
  const [debouncedSearch] = useDebounce(searchData, 500); 
  const [filterStatus, setFilterStatus] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParam = useSearchParams();
  const menuname = searchParam.get("name")!;
  const menuId = pathname.split("/")[2];
  const data = useCategoryItem(menuId, debouncedSearch, filterStatus);

  useEffect(() => {
    if (data) {
      setCategoryItem(
        data.map((item) => ({
          ...item,
          position: item.position || 0,
        }))
      );
    }
  }, [data]);

  const handleMoveUp = async (index: number) => {
    if (!CategoryItem || index === 0) return;

    const newCategoryItem = [...CategoryItem];
    [newCategoryItem[index - 1].position, newCategoryItem[index].position] = [
      newCategoryItem[index].position,
      newCategoryItem[index - 1].position,
    ];
    [newCategoryItem[index - 1], newCategoryItem[index]] = [
      newCategoryItem[index],
      newCategoryItem[index - 1],
    ];

    setCategoryItem(newCategoryItem);

    await updateCategoryOrder({
      id: newCategoryItem[index].id!,
      position: newCategoryItem[index].position!,
    });
    await updateCategoryOrder({
      id: newCategoryItem[index - 1].id!,
      position: newCategoryItem[index - 1].position!,
    });
  };

  const handleMoveDown = async (index: number) => {
    if (!CategoryItem || index === CategoryItem.length - 1) return;

    const newCategoryItem = [...CategoryItem];
    [newCategoryItem[index + 1].position, newCategoryItem[index].position] = [
      newCategoryItem[index].position,
      newCategoryItem[index + 1].position,
    ];
    [newCategoryItem[index + 1], newCategoryItem[index]] = [
      newCategoryItem[index],
      newCategoryItem[index + 1],
    ];

    setCategoryItem(newCategoryItem);

    await updateCategoryOrder({
      id: newCategoryItem[index].id!,
      position: newCategoryItem[index].position!,
    });
    await updateCategoryOrder({
      id: newCategoryItem[index + 1].id!,
      position: newCategoryItem[index + 1].position!,
    });
  };

  const handleView = (category_id: string) => {
    router.push(`/menu/${menuId}/category/${category_id}`);
  };

  const handleAddCategory = async (newItem: ICategorydata) => {
    const addedItem = await categories(newItem, menuId);
    if (addedItem)
      setCategoryItem((prev) => (prev ? [...prev, addedItem] : [addedItem]));
    notifications.show({
      message: `${newItem.category_name} added to category`,
      color: "green",
    });
  };

  const handleEditCategory = async (updatedmenu: ICategorydata) => {
    await updateCategory(updatedmenu, menuId);
    notifications.show({ message: "Category updated", color: "green" });
  };

  const handleDelete = async (id: string) => {
    setCategoryItem((prev) => prev?.filter((item) => item.id !== id));
    setLoading(id);
    await deletecategory(id);
    setLoading("");
    notifications.show({ message: "Category deleted", color: "green" });
  };
  const handleSelectCategory = (item: ICategorydata) => {
    const modaldata: ICategorydata = {
      id: item.id || "",
      category_name: item.category_name || "",
      status: item.status || "",
    };
    setSelectedCategory(modaldata);
  };

  return (
    <div className="items-center px-4 sm:px-12 md:px-16 lg:px-20 xl:px-32">
      <CategoryHeader>
        <AddCategoryModal
          onAddCategory={handleAddCategory}
          onEditCategory={handleEditCategory}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </CategoryHeader>

      <CategoryTable
        data={CategoryItem}
        handleView={handleView}
        handleSelectCategory={handleSelectCategory}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleDelete={handleDelete}
        loading={loading}
        opened={opened}
        close={close}
        searchData={searchData}
        setSearchData={setSearchData}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />
    </div>
  );
}

export default CategoryPage;
