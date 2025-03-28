"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ISignUpFormData } from "../../components/auth/SignUpForm";
import { createClient } from "@/app/utils/supabase/server";

export async function signUp(formData: ISignUpFormData) {
  const supabase = await createClient();

  const Objdata = {
    email: formData.email,
    password: formData.password,
    name: formData.name,
    confirmpassword: formData.confirmpassword,
  };

  const { error } = await supabase.auth.signUp(Objdata);

  if (error) {
    redirect("/auth/error");
  }

  revalidatePath("/", "layout");
  return { message: "User Register successfully" };
}
