"use server";
import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";

export async function submitUserForm(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;

  if (!userId) throw new Error("User not authenticated");

  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;
  const logoFile = formData.get("logo") as File | null;

  let logoUrl: string | null = null;

  if (logoFile && logoFile.size > 0) {
    const fileName = `${logoFile.name}`;
    const { error } = await supabase.storage
      .from("logo")
      .upload(fileName, logoFile, { upsert: true });

    if (error) {
      throw new Error(`Failed to upload logo: ${error.message}`);
    }
    const { data } = supabase.storage.from("logo").getPublicUrl(fileName);
    logoUrl = data.publicUrl;
  }

  const { data:UserData ,error } = await supabase
    .from("user_profile")
    .upsert([
      {
        id: userId, 
        name,
        phone,
        address,
        logo: logoUrl,
      },
    ]);

  if (error) {
    redirect("/error");
  }

  return UserData
}