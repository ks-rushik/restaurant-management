"use server";

import { createClient } from "@/app/utils/supabase/server";
import { IModalData } from "../../features/menu/types/type";
import { revalidatePath } from "next/cache";

export async function menu(MenuData: IModalData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;
  
  const menudata = {
    restaurant_id: userId,
    menu_name: MenuData.menu_name,
    currency: MenuData.currency,
    status: MenuData.status,
  };

  const { data: InsertData } = await supabase
    .from("menus")
    .insert(menudata)
    .select();

  revalidatePath("/menu", "page");

  return InsertData?.[0];
}
