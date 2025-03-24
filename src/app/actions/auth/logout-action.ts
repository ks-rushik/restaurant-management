'use server'
import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";

const signout = async () => {
  const supabase = await createClient();
  const { error} =await supabase.auth.signOut();
  console.log(error);
  
  redirect("/auth/login");
};

export default signout;