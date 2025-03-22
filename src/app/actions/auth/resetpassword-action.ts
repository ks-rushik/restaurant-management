"use server";

import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function resetPassword(email: string ) {
  const supabase = await createClient();

  const { data , error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    redirect("/auth/error");
  }
 console.log(error);
 
  revalidatePath("/", "layout");
  return{ message: "link sent to this email"}
}