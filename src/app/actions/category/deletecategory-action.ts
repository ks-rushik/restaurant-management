"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/app/utils/supabase/server";

const deletecategory = async (id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("category").delete().eq("id", id);

  revalidatePath("/", "layout");
  return;
};

export default deletecategory;
