"use server";
import { createClient } from "@/app/utils/supabase/server";

const fetchCategoryItemData = async (id: string) => {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("category")
    .select('*,menus(*,restaurant_id(*)),  "Items"(*)')
    .eq("menu_id", id)
    .order("position", { ascending: true });

  return { categories };
};
export default fetchCategoryItemData;
