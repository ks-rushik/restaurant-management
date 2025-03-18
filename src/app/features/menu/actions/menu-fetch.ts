"use server";
import { createClient } from "@/app/utils/supabase/server";

const fetchMenudata = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;

  const { data } = await supabase
    .from("menus")
    .select("*")
    .eq("restaurant_id", userId!)
    .order("created_at", { ascending: true });

  return data;
};

export default fetchMenudata;
