"use server";

import { createClient } from "@/app/utils/supabase/server";

export async function updateItemOrder({ id, position }: { id: string; position: number }) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("Items")
    .update({ position })
    .eq("id", id);

  if (error) throw new Error("Failed to update category position: " + error.message);
  return { success: true };
}