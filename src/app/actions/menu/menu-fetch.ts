"use server";
import { createClient } from "@/app/utils/supabase/server";

const fetchMenudata = async (search: string, status: string) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;
  let query = supabase
    .from("menus")
    .select("*")
    .eq("restaurant_id", userId!)
    .order("created_at", { ascending: true });

  if (search) {
    query = query.ilike("menu_name", `%${search}%`);
  }

  if (status === "Available" || status === "Not Available") {
    query = query.eq("status", status);
  }

  const { data } = await query;
  
  return data;
};

export default fetchMenudata;