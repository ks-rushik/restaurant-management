'use server'
import { createClient } from "@/app/utils/supabase/server";

 export async function fetchMenus() {
    const supabase =  await createClient()

    const { data, error } = await supabase
        .from('menus')
        .select(`
            id, menu_name, currency, status,
            category ( id, category_name, status, 
                Items ( id, name, price, status )
            )
        `);

    if (error) {
        console.error("Error fetching menus:", error);
    } else {
        console.log("Menus Data:", data);
    }
}

