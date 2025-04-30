"use server";
import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";

const deleteitem = async (id: string) => {
  console.log("deleted id", id);

  const supabase = await createClient();
  const { error } = await supabase.from("Items").delete().eq("id", id);

  revalidatePath("/", "layout");
  return;
};

export default deleteitem;
