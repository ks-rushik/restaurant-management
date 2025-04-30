"use server";

import { ICategorydata } from "@/app/components/category/AddCategoryModal";
import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateCategory(CategoryData: ICategorydata , menuId : string) {
  const supabase = await createClient();

  const categorydata = {
    menu_id: menuId,
    category_name: CategoryData.category_name,
    status:CategoryData.status
  };

  const { data: UpdatedData } = await supabase
    .from("category")
    .update(categorydata)
    .eq("id", CategoryData.id!)
    .select();
  
  revalidatePath("/", "page");

  return UpdatedData?.[0];
}