"use server";

import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { IItemdata } from "../components/AddItemModal";

export async function updateItem(
  ItemData: IItemdata,
  categoryId: string,
  file?: File
) {
  const supabase = await createClient();

  if (file && file.size > 0) {
    const fileName = `${file.name}`;
    const { error } = await supabase.storage
      .from("item")
      .upload(fileName, file, { upsert: true });

    if (error) {
      throw new Error(`Failed to upload logo: ${error.message}`);
    }
    const { data } = supabase.storage.from("item").getPublicUrl(fileName);
    const imageUrl = data.publicUrl;

    const ItemSupabaseData = {
      category_id: categoryId,
      name: ItemData.name,
      description: ItemData.description,
      price: ItemData.price,
      status: ItemData.status,
      image: imageUrl,
    };
    const { data: UpdatedData, error: UpdateError } = await supabase
      .from("Items")
      .update(ItemSupabaseData)
      .eq("id", ItemData.id)
      .select();
    revalidatePath("/", "page");

    return UpdatedData?.[0];
  }

  const ItemSupabaseData = {
    category_id: categoryId,
    name: ItemData.name,
    description: ItemData.description,
    price: ItemData.price,
    status: ItemData.status,
  };
  const { data: UpdatedData, error: UpdateError } = await supabase
    .from("Items")
    .update(ItemSupabaseData)
    .eq("id", ItemData.id)
    .select();
  revalidatePath("/", "page");

  return UpdatedData?.[0];
}
