"use server";

import { IChangePasswordFormData } from "@/app/components/auth/ChangePassword";
import { createClient } from "@/app/utils/supabase/server";

const changepassword = async (formData: IChangePasswordFormData) => {
  if (!formData.password) return { error: "Password cannot be empty" };
  const supabase = await createClient();
  const {
    data: { user },
    error: sessionError,
  } = await supabase.auth.getUser();
  if (sessionError || !user) {
    return { error: "User is not authenticated." };
  }

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email!,
    password: formData.oldpassword,
  });
  if (signInError) {
    return { error: "Old password is incorrect." };
  }
  const { data, error } = await supabase.auth.updateUser({
    password: formData.password,
  });

  if (error) return { error: error.message };
  return { message: "Password updated successfully!" };
};

export default changepassword;
