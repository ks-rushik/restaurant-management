"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/app/utils/supabase/server";

const deleteitem = async (id: string) => {
  const supabase = await createClient();
  const { error } = await supabase.from("Items").delete().eq("id", id);

  revalidatePath("/", "layout");
  return;
};

export default deleteitem;
