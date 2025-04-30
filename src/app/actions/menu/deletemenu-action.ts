'use server'
import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";

const deletemenu = async (id: string) => {
  const supabase = await createClient();
  const { error } = await supabase.from("menus").delete().eq("id", id);
  if(error){
    return {error}
  }

  revalidatePath("/menu", "page");
  return ;
};

export default deletemenu;
