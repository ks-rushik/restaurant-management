"use server";

import { revalidatePath } from "next/cache";
import { ISignUpFormData } from "../../components/auth/SignUpForm";
import { createClient } from "@/app/utils/supabase/server";

export async function signUp(formData: ISignUpFormData) {
  const supabase = await createClient();

  if (formData.password !== formData.confirmpassword) {
    return { error: "Passwords do not match." };
  }

  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    let errorMessage
    if (error.message.toLowerCase().includes("rate limit")) {
      errorMessage = "Too many attempts. Please try again later.";
    } else if (error.message === "User already registered") {
     errorMessage =
        "This email is already associated with an account.Please log in or use another email";
    }
    return { error: errorMessage };
  }

  revalidatePath("/", "layout");
  return { message: "User registered successfully." };
}
