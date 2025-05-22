"use server";

import { PAGE_SIZE } from "@/app/actions/menu/menufetchquery";
import { IMenudata } from "@/app/type/type";
import { createClient } from "@/app/utils/supabase/server";

const fetchMenudata = async (
  pageParam: number,
  search?: string,
  status?: string,
): Promise<{ data: IMenudata[]; count: number | null }> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;

  let query = supabase
    .from("menus")
    .select("*", { count: "exact" })
    .eq("restaurant_id", userId!)
    .order("created_at", { ascending: true });

  if (search) {
    query = query.ilike("menu_name", `%${search}%`);
  }

  if (status === "Available" || status === "Not Available") {
    query = query.eq("status", status);
  }

  query = query.range(pageParam * PAGE_SIZE, (pageParam + 1) * PAGE_SIZE - 1);

  const { data, error, count } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return { data, count };
};

export default fetchMenudata;
