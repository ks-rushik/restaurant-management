"use server";
import { createClient } from "@/app/utils/supabase/server";

const fetchCategorydata = async (menuId : string) => {
  const supabase = await createClient();  
  const { data ,error } = await supabase
    .from("category")
    .select("*")
    .eq("menu_id", menuId)
    .order("create_at", { ascending: true } );
  
  return data;
};

export default fetchCategorydata;