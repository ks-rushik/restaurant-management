"use server";

import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function resetPassword(email: string ) {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:3000/auth/updatepassword",
  });

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/auth/login");
}