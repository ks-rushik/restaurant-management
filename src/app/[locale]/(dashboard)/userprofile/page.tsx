import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { getDictionary } from "@/app/[locale]/messages";
import { fetchprofiledataQuery } from "@/app/actions/userprofile/userprofile-fetch-query";
import DictionaryProvider from "@/app/components/context/Dictionary";
import UserProfileForm from "@/app/components/userprofile/UserProfile";

const UserProfilePage = async ({
  params,
}: Readonly<{
  params: Promise<{ locale: "en" | "hd" | "sp" }>;
}>) => {
  const locale = (await params).locale;
  const dictionary = await getDictionary(locale);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(fetchprofiledataQuery());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DictionaryProvider value={dictionary}>
        <UserProfileForm />
      </DictionaryProvider>
    </HydrationBoundary>
  );
};

export default UserProfilePage;
