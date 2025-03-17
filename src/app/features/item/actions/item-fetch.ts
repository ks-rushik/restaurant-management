"use server";
import { createClient } from "@/app/utils/supabase/server";
import { fetchMenus } from "./sample-action";

const fetchItemdata = async (categoryId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("Items")
    .select("*, category:category_id(menu:menu_id!inner(currency))")
    .eq("category_id", categoryId)
    .order("position", { ascending: true });

  if (error) throw error;
  return data;
};

fetchMenus();
export default fetchItemdata;
