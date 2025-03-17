"use server";

import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { IItemdata } from "../components/AddItemModal";

export async function item(ItemData: IItemdata , categoryId: string) {
  const supabase = await createClient();


  const { data: maxPositionData } = await supabase
    .from("Items")
    .select("position")
    .eq("category_id", categoryId)
    .order("position", { ascending: false })
    .limit(1)
    .single();

  const newPosition = maxPositionData ? (maxPositionData.position || 0) + 1 : 1;

  const ItemSupabaseData = {
    category_id: categoryId ,
    name: ItemData.name, 
    price: ItemData.price,
    status:ItemData.status,
    description: ItemData.description,
    position: ItemData.position
  };

  const { data: InsertData  , error} = await supabase
    .from("Items")
    .insert(ItemSupabaseData)
    .select();
 
   if(error) {
    console.log(error);
    
   }

  revalidatePath("/", "layout");

  return InsertData?.[0];
}
