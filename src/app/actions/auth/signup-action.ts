"use server";

import { revalidatePath } from "next/cache";
import { ISignUpFormData } from "@components/auth/SignUpForm";
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

  if (data?.user && data.user.identities?.length === 0) {
    return {
      error:
        "This email is already associated with an account. Please log in or use another email.",
    };
  }

  if (error) {
    console.log("Signup error:", error.message);
    let errorMessage = "Unexpected error. Please try again later.";
    if (error.message.toLowerCase().includes("rate limit")) {
      errorMessage = "Too many attempts. Please try again later.";
    }
    return { error: errorMessage };
  }

  revalidatePath("/", "layout");
  return { message: "User registered successfully. Please check your email to confirm your account." };
}
