"use server";

import { createClient } from "@/app/utils/supabase/server";
import { IModalData } from "../../features/menu/types/type";
import { revalidatePath } from "next/cache";

export async function updateMenu(MenuData: IModalData) {
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

  const { data: UpdatedData } = await supabase
    .from("menus")
    .update(menudata)
    .eq("id", MenuData.id!)
    .select();

  revalidatePath("/menu", "page");

  return UpdatedData?.[0];
}