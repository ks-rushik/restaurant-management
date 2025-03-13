"use server";

import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";

 const updateCategoryOrder = async (categoryId: string, newPosition: number) => {
    console.log(categoryId);
    
    const supabase = await createClient()
         const { error } = await supabase
           .from("categories")
           .update({ position: newPosition })
           .eq("id", categoryId);
    
         if (error) {
           console.error("Error updating category order:", error);
         }

         revalidatePath("/", "layout");
       };

export default updateCategoryOrder;
