"use server";

import { createClient } from "@/app/utils/supabase/server";

import { PAGE_SIZE } from "@/app/actions/menu/menufetchquery";

const fetchMenudata = async (
  search?: string,
  status?: string,
  pageParam: number = 0,
) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;
  let query = supabase
    .from("menus")
    .select("*")
    .eq("restaurant_id", userId!)
    .order("created_at", { ascending: true })
    .range(pageParam * PAGE_SIZE, (pageParam + 1) * PAGE_SIZE - 1);

  if (search) {
    query = query.ilike("menu_name", `%${search}%`);
  }

  if (status === "Available" || status === "Not Available") {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default fetchMenudata;
