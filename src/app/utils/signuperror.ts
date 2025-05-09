import { AuthError } from "@supabase/supabase-js";

export function handleSupabaseError(error: AuthError | null): {
  error: string;
} {
  if (error?.code === "user_already_exists") {
    return {
      error:
        "This email is already associated with an account. Please log in or use another email.",
    };
  }

  if (error?.code === "over_email_send_rate_limit") {
    return {
      error: "Too many attempts. Please try again later.",
    };
  }

  if (error?.code === "email_address_invalid") {
    return {
      error: "There was an issue with the email address.",
    };
  }

  return { error: "Unexpected error. Please try again later." };
}
