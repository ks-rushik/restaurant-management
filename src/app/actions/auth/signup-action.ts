"use server";

import { revalidatePath } from "next/cache";

import { handleSupabaseError } from "@/app/utils/signuperror";
import { createClient } from "@/app/utils/supabase/server";

export type signUpProps = {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
};

export async function signUp(formData: signUpProps) {
  const supabase = await createClient();

  if (formData.password !== formData.confirmpassword) {
    return { error: "Passwords do not match." };
  }

  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    return handleSupabaseError(error);
  }

  revalidatePath("/", "layout");
  return {
    message:
      "User registered successfully. Please check your email to confirm your account.",
  };
}
