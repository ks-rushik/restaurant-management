"use server";

import { ICategorydata } from "@/app/components/category/AddCategoryModal";
import { createClient } from "@/app/utils/supabase/server";
import { PAGE_SIZE } from "@/app/actions/menu/menufetchquery";

const fetchCategorydata = async (
  pageParam: number,
  menuId: string,
  search?: string,
  status?: string,
):Promise<ICategorydata[]> => {
  const supabase = await createClient();

  let query = supabase
    .from("category")
    .select("*")
    .eq("menu_id", menuId)
    .order("position", { ascending: true })
    .range(pageParam * PAGE_SIZE, (pageParam + 1) * PAGE_SIZE - 1);
    

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
