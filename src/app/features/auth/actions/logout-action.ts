'use server'
import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const signout = async () => {
  const supabase = await createClient();
  const { error} =await supabase.auth.signOut({scope:'local'});
  console.log(error);
  
   revalidatePath('/', 'layout')
  redirect("/auth/login");
};

export default signout;