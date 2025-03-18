"use server";
import { createClient } from "@/app/utils/supabase/server";

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
export default fetchItemdata;
