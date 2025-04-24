"use server";
import { cookies } from "next/headers";
export const changeTheme = async () => {
  const cookieStore = await cookies();
  const previousTheme = cookieStore.get("theme");
  if (!previousTheme) {
    cookieStore.set("theme", "dark");
    return;
  }
  if (previousTheme.value === "light") {
    cookieStore.set("theme", "dark");
    return;
  }
  if (previousTheme.value === "dark") {
    cookieStore.set("theme", "light");
    return;
  }
};