"use server";

import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { IItemdata } from "../components/AddItemModal";

export async function updateItem(ItemData: IItemdata , categoryId : string) {
  const supabase = await createClient();

  const ItemSupabaseData = {
    category_id: categoryId,
    name: ItemData.name,
    description: ItemData.description,
    price: ItemData.price,
    status:ItemData.status
  };

  const { data: UpdatedData , error} = await supabase
    .from("Items")
    .update(ItemSupabaseData)
    .eq("id", ItemData.id)
    .select();
  
  revalidatePath("/", "page");

  return UpdatedData?.[0];
}