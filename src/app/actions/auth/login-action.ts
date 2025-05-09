"use server";

import { revalidatePath } from "next/cache";

import { ILoginFormData } from "@components/auth/LoginForm";

import { createClient } from "@/app/utils/supabase/server";

export async function login(formData: ILoginFormData) {
  const supabase = await createClient();

  const data = {
    email: formData.email,
    password: formData.password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return error;
  }

  revalidatePath("/", "layout");
}
