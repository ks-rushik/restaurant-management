'use server'
import { createClient } from "@/app/utils/supabase/server"

const getMenuData = async(Id: string) => {
   const supabase = await createClient() ;
   const { data, error } = await supabase
    .from("url")
    .select("menu_id")
    .eq("short_url", Id)

  if (error) throw error;

  return data;
}

export default getMenuData
