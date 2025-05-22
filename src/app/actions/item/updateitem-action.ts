"use server";

import { revalidatePath } from "next/cache";

import { IItemdata } from "@components/item/AddItemModal";

import { createClient } from "@/app/utils/supabase/server";

export async function updateItem(
  ItemData: IItemdata,
  categoryId: string,
  file?: File,
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
      jain: ItemData.jain,
      image: imageUrl,
    };
    const { data: UpdatedData, error: UpdateError } = await supabase
      .from("Items")
      .update(ItemSupabaseData)
      .eq("id", ItemData.id)
      .select();

    return UpdatedData?.[0];
  }

  const ItemSupabaseData = {
    category_id: categoryId,
    name: ItemData.name,
    description: ItemData.description,
    price: ItemData.price,
    status: ItemData.status,
    jain: ItemData.jain,
  };
  const { data: UpdatedData, error: UpdateError } = await supabase
    .from("Items")
    .update(ItemSupabaseData)
    .eq("id", ItemData.id)
    .select();

  return UpdatedData?.[0];
}
