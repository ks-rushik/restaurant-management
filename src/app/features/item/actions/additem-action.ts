"use server";

import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { IItemdata } from "../../../components/item/AddItemModal";

export async function item(
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

    const { data: maxPositionData } = await supabase
      .from("Items")
      .select("position")
      .eq("category_id", categoryId)
      .order("position", { ascending: false })
      .limit(1)
      .single();

    const newPosition = maxPositionData
      ? (maxPositionData.position || 0) + 1
      : 1;

    const ItemSupabaseData = {
      category_id: categoryId,
      name: ItemData.name,
      description: ItemData.description,
      price: ItemData.price,
      status: ItemData.status,
      position: newPosition,
      image: imageUrl,
    };
    const { data: UpdatedData, error: UpdateError } = await supabase
      .from("Items")
      .insert(ItemSupabaseData)
      .eq("id", ItemData.id)
      .select();
    revalidatePath("/", "page");

    return UpdatedData?.[0];
  }

  const { data: maxPositionData } = await supabase
    .from("Items")
    .select("position")
    .eq("category_id", categoryId)
    .order("position", { ascending: false })
    .limit(1)
    .single();

  const newPosition = maxPositionData ? (maxPositionData.position || 0) + 1 : 1;

  const ItemSupabaseData = {
    category_id: categoryId,
    name: ItemData.name,
    price: ItemData.price,
    status: ItemData.status,
    description: ItemData.description,
    position: newPosition,
  };

  const { data: InsertData, error } = await supabase
    .from("Items")
    .insert(ItemSupabaseData)
    .select();

  if (error) {
    console.log(error);
  }

  revalidatePath("/", "layout");

  return InsertData?.[0];
}
