"use server";

import { createClient } from "@/app/utils/supabase/server";
import { IModalData } from "@/app/type/type";
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


    // menu page endpoint:
    // type MenuItem = {
    //   menu_name: string;
    //   currency: string;
    //   status: string;
    //   restaurant_id:string
    // };
    
    // const Menus = async (items: MenuItem[]) => {
    //   try {
    //     const { data, error } = await supabase.from('menus').insert(items);
    //     console.log(data)
    //   } catch (err) {
    //     console.error('Unexpected error:', err);
    //     return { success: false, error: 'Unexpected error occurred' };
    //   }
    // };
    // const newItems = [
    //   {
    //     menu_name: 'Burger',
    //     currency: '$',
    //     status: 'active',
    //     restaurant_id: userId!
    //   },
    //   {
    //     menu_name: 'Pizza',
    //     currency: '₹',
    //     status: 'inactive',
    //     restaurant_id:userId!
    //   },
    // ];
    
    // Menus(newItems)

  revalidatePath("/menu", "page");

  return InsertData?.[0];
}
