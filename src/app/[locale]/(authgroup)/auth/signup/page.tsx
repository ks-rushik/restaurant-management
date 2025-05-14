import SignUpForm from "@components/auth/SignUpForm";

import { getDictionary } from "@/app/[locale]/messages";

const LoginPage = async ({
  params,
}: Readonly<{
  params: Promise<{ locale: "en" | "hd" | "sp" }>;
}>) => {
  const locale = (await params).locale;
  const dictionary = await getDictionary(locale);
  return <SignUpForm lang={dictionary} />;
};

export default LoginPage;
