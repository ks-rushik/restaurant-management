"use server";
import { createClient } from "@/app/utils/supabase/server";

const fetchCategorydata = async (
  menuId: string,
  search: string,
  status: string
) => {
  const supabase = await createClient();

  let query = supabase
    .from("category")
    .select("*")
    .eq("menu_id", menuId)
    .order("position", { ascending: true });

  if (search) {
    query = query.ilike("category_name", `%${search}%`);
  }

  if (status === "Available" || status === "Not Available") {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data;
};

export default fetchCategorydata;
