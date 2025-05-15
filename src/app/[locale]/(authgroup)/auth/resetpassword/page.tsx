import { getDictionary } from "@/app/[locale]/messages";
import ResetPasswordForm from "@components/auth/ResetPassword";

const ResetPasswordPage = async ({
  params,
}: {
  params: Promise<{ locale: "en" | "hd" | "sp" }>;
}) => {
  const locale = (await params).locale;
  const dictionary = await getDictionary(locale);

  return <ResetPasswordForm lang={dictionary} />;
};

export default ResetPasswordPage;
