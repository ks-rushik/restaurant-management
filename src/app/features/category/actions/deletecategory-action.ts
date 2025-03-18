'use server'
import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";

const deletecategory = async (id: string) => {
    console.log("deleted id" ,id);
    
  const supabase = await createClient();
  const { data, error } = await supabase.from("category").delete().eq("id", id);
  if(error){
    console.log(error);
  }
  console.log('item deleted',data);
  
  revalidatePath("/", "layout");
  return ;
};

export default deletecategory;
