"use server";

import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { ICategorydata } from "../components/AddCategoryModal";

const categories = async (CategoryData: ICategorydata, menuId: string) => {
  const supabase = await createClient();

  const { data: maxPositionData } = await supabase
    .from("category")
    .select("position")
    .eq("menu_id", menuId)
    .order("position", { ascending: false })
    .limit(1)
    .single();

  const newPosition = maxPositionData ? (maxPositionData.position || 0) + 1 : 1;

  const categorydata = {
    menu_id: menuId,
    category_name: CategoryData.category_name,
    status: CategoryData.status,
    position: newPosition,
  };

  const { data: InsertData, error } = await supabase
    .from("category")
    .insert(categorydata)
    .select();

  if (error) {
    console.log(error);
  }

  revalidatePath("/", "layout");

  return InsertData?.[0];
};

export default categories;