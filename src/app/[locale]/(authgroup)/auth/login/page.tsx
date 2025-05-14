import { getDictionary } from "@/app/[locale]/messages";

import LoginForm from "@components/auth/LoginForm";

const LoginPage = async ({
  params,
}: Readonly<{
  params: Promise<{ locale: "en" | "hd" | "sp" }>;
}>) => {
  const locale = (await params).locale;
  const dictionary = await getDictionary(locale);

  return <LoginForm lang={dictionary} />;
};

export default LoginPage;
