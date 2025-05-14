"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/app/utils/supabase/server";

export type loginProps = {
  email: string;
  password: string;
};

export async function login(formData: loginProps) {
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
