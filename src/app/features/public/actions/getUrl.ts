'use server'
import { createClient } from "@/app/utils/supabase/server";
const fetchshortUrl = async (menuId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("url")
    .select("*")
    .eq("menu_id", menuId)
    .single()
  if (error) throw error;

  return data;
};
export default fetchshortUrl;
