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
    let errorMessage;
    if (error.message === "email rate limit exceeded") {
      errorMessage = "Email rate limit exceeded. Please try again later";
    } else {
      errorMessage = "This email is already associated with an account. Please use a different email or log in.";
    }
    console.log(error.message);

    return { error: errorMessage };
  }

  revalidatePath("/", "layout");
  return { message: "User registered successfully" };
}
