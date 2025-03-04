"use server";
import { createClient } from "@/app/utils/supabase/server";

export async function getUserProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("user_profile")
    .select()
    .eq("id", user.id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}
