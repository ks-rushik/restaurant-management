"use server";

import { PAGE_SIZE } from "@/app/actions/menu/menufetchquery";
import { ICategorydata } from "@/app/components/category/AddCategoryModal";
import { createClient } from "@/app/utils/supabase/server";

const fetchCategorydata = async (
  pageParam: number,
  menuId: string,
  search?: string,
  status?: string,
): Promise<ICategorydata[]> => {
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

  query = query.range(pageParam * PAGE_SIZE, (pageParam + 1) * PAGE_SIZE - 1);

  const { data, error } = await query;

  if (error) throw error;

  return data;
};

export default fetchCategorydata;
