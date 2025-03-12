"use server";

import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { ICategorydata } from "../components/AddCategoryModal";

const categories = async (CategoryData: ICategorydata) => {
  const supabase = await createClient();

  const { data: menuData } = await supabase
    .from("menus")
    .select("id")
    .limit(1)
    .single();
  const categorydata = {
    menu_id: menuData?.id,
    category_name: CategoryData.category_name,
  };

  const { data: InsertData, error } = await supabase
    .from("category")
    .insert(categorydata)
    .select();

  if (error) {
    console.log(error);
  }
  console.log(InsertData);
  

  revalidatePath("/", "layout");

  return InsertData?.[0];
};

export default categories;
