"use server";
import { createClient } from "@/app/utils/supabase/server";

const fetchItemdata = async (
  categoryId: string,
  search: string,
  status: string
) => {
  const supabase = await createClient();
  let query = supabase
    .from("Items")
    .select("*, category:category_id(menu:menu_id!inner(currency))")
    .eq("category_id", categoryId)
    .order("position", { ascending: true });

    if (search) {
      query = query.ilike("name", `%${search}%`);
    }
  
    if (status === "Available" || status === "Not Available") {
      query = query.eq("status", status);
    }
  
    const { data, error } = await query;
  
    if (error) throw error;
  
  return data;
};
export default fetchItemdata;
