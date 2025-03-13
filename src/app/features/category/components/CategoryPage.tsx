"use client";
import React, { useEffect, useState } from "react";
import CategoryHeader from "./CategoryHeader";
import AddCategoryModal, { ICategorydata } from "./AddCategoryModal";
import CategoryTable from "./CategoryTable";
import useCategoryItem from "../hook/useCategoryItem";
import { useRouter } from "next/navigation";
import categories from "../actions/addcategory-action";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import deletecategory from "../actions/deletecategory-action";
import { updateCategory } from "../actions/updatecategory-action";

function CategoryPage() {
  const [CategoryItem, setCategoryItem] = useState<ICategorydata[]>();
  const [selectedCategory, setSelectedCategory] =
    useState<ICategorydata | null>(null);
  const [loading, setLoading] = useState("");
  const [opened, { close }] = useDisclosure(false);
  const router = useRouter();
  const data = useCategoryItem();
  console.log(data);
  
  useEffect(() =>{
    if(data){
      setCategoryItem(data)
    }
  },[data])

  const handleView = (category_name: string) => {
    router.push(`/menu/${category_name}`);
  };
  const handleAddCategory = async (newItem: ICategorydata) => {
    const addedItem = await categories(newItem);
    if (addedItem)
      setCategoryItem((prev) => (prev ? [...prev, addedItem] : [addedItem]));
    notifications.show({ message: `${newItem.category_name} added to category` });
  };

  const handleEditCategory = async (updatedmenu: ICategorydata) => {
    await updateCategory(updatedmenu);
    console.log(updatedmenu,"categorypage");
    
    notifications.show({ message: "Category updated" });
  };

  const handleDelete = async (id: string) => {
    setCategoryItem((prev) => prev?.filter((item) => item.id !== id));
    await deletecategory(id);
  };
  const handleSelectCategory = (item: ICategorydata) => {
    const modaldata: ICategorydata = {
      id: item.id || "",
      category_name: item.category_name || "",
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
        handleDelete={handleDelete}
        loading={loading}
        opened={opened}
        close={close}
      />
    </div>
  );
}

export default CategoryPage;
