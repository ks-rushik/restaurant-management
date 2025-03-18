'use server'
import { createClient } from "@/app/utils/supabase/server";

const fetchCategoryItemData = async (id: string) => {
  const supabase = await createClient();
  const { data: categories } = await supabase
  .from("category")
  .select("*, \"Items\"(*)") 
  .eq("menu_id", id);

 console.log(categories ,"this is data");
 
  return { categories };
};
export default fetchCategoryItemData;
