"use server";

import { createClient } from "@/app/utils/supabase/server";
export type IModalData = {
    currency: string;
    id?: string;
    menu_name: string;
    status: string;
}

export async function menu(MenuData:IModalData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;
  console.log("this is userId", userId);

  const menudata = {
    restaurant_id: userId,
    menu_name: MenuData.menu_name,
    currency: MenuData.currency,
    status: MenuData.status,
  };

  const { error: insertError, data: InsertData } = await supabase
    .from("menus")
    .insert(menudata)
    .select();

  if (insertError) {
    console.log(insertError);
  }

  return InsertData?.[0];
}
