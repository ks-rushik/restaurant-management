"use server";

import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { ICategorydata } from "../components/AddCategoryModal";

export async function updateCategory(CategoryData: ICategorydata) {
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

  const { data: UpdatedData } = await supabase
    .from("category")
    .update(categorydata)
    .eq("id", CategoryData.id!)
    .select();

  console.log(UpdatedData,CategoryData.id);
  

  revalidatePath("/", "page");

  return UpdatedData?.[0];
}