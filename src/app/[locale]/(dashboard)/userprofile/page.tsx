import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { fetchprofiledataQuery } from "@/app/actions/userprofile/userprofile-fetch-query";
import UserProfileForm from "@/app/components/userprofile/UserProfile";

import { getDictionary } from "../../messages";

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
      <UserProfileForm lang={dictionary} />
    </HydrationBoundary>
  );
};

export default UserProfilePage;
