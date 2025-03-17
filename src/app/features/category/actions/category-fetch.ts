"use server";
import { createClient } from "@/app/utils/supabase/server";
const fetchCategorydata = async (menuId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("category")
    .select("*")
    .eq("menu_id", menuId)
    .order("position", { ascending: true }); 
  if (error) throw error;
  return data;
};
export default fetchCategorydata;