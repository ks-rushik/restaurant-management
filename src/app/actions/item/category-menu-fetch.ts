"use server";

import { createClient } from "@/app/utils/supabase/server";

const getItemData = async (id: string) => {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("category")
    .select("*, menus(*), Items(*)")
    .eq("id", id)
    .order("position", { ascending: true });

  return categories;
};

export default getItemData;
