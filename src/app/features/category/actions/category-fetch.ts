"use server";
import { createClient } from "@/app/utils/supabase/server";

const fetchCategorydata = async () => {
  const supabase = await createClient();
  const { data: menuData } = await supabase
  .from("menus")
  .select("id")
  .limit(1)  
  .single();

  const { data } = await supabase
    .from("category")
    .select("menu_id(*)")
    .eq("menu_id", menuData?.id)
    .order("created_at", { ascending: true });

  return data;
};

export default fetchCategorydata;