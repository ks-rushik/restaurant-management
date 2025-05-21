"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/app/utils/supabase/server";

const deletemenu = async (id: string) => {
  const supabase = await createClient();
  const { error } = await supabase.from("menus").delete().eq("id", id);

  return { error };
};

export default deletemenu;
