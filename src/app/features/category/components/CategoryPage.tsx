"use client";
import React, { useEffect, useState } from "react";
import CategoryHeader from "./CategoryHeader";
import AddCategoryModal, { ICategorydata } from "./AddCategoryModal";
import CategoryTable from "./CategoryTable";
import useCategoryItem from "../hook/useCategoryItem";
import { usePathname, useRouter } from "next/navigation";
import categories from "../actions/addcategory-action";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import deletecategory from "../actions/deletecategory-action";
import { updateCategory } from "../actions/updatecategory-action";
import updateCategoryOrder from "../actions/updataPosition-action";

function CategoryPage() {
  const [CategoryItem, setCategoryItem] = useState<ICategorydata[]>();
  const [selectedCategory, setSelectedCategory] =
    useState<ICategorydata | null>(null);
  const [loading, setLoading] = useState("");
  const [opened, { close }] = useDisclosure(false);
  const router = useRouter();
  const pathname = usePathname();
  const menuId = pathname.split("/")[2];
  const data = useCategoryItem(menuId);

  useEffect(() => {
    if (data) {
      setCategoryItem(data);
    }
  }, [data]);

  const handleMoveUp = async (index: number) => {
    console.log(index, "this is inde");
    console.log(CategoryItem![0] , "this is categories");
    
    if (index === 0) return;
    const updatedCategories = [...CategoryItem!];
    console.log(updatedCategories , " this is updatecategories");
    
    [updatedCategories[index - 1], updatedCategories[index]] = [
      updatedCategories[index],
      updatedCategories[index - 1],
    ];

    await updateCategoryOrder(updatedCategories[index].id!, index - 1);
    await updateCategoryOrder(updatedCategories[index - 1].id!, index);
    setCategoryItem(updatedCategories);
  };

  const handleMoveDown = async (index: number) => {
    if (index === CategoryItem!.length - 1) return;
    const updatedCategories = [...CategoryItem!];
    [updatedCategories[index], updatedCategories[index + 1]] = [
      updatedCategories[index + 1],
      updatedCategories[index],
    ];
    setCategoryItem(updatedCategories);
  };

  const handleView = (category_name: string) => {
    router.push(`/menu/${category_name}`);
  };
  const handleAddCategory = async (newItem: ICategorydata) => {
    const addedItem = await categories(newItem, menuId);
    if (addedItem)
      setCategoryItem((prev) => (prev ? [...prev, addedItem] : [addedItem]));
      notifications.show({
      message: `${newItem.category_name} added to category`,
    });
  };

  const handleEditCategory = async (updatedmenu: ICategorydata) => {
    await updateCategory(updatedmenu ,menuId);
    notifications.show({ message: "Category updated" });
  };

  const handleDelete = async (id: string) => {
    setCategoryItem((prev) => prev?.filter((item) => item.id !== id));
    setLoading(id);
    await deletecategory(id);
    setLoading("");
    notifications.show({message: "Category deleted"})

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
      />
    </div>
  );
}

export default CategoryPage;

