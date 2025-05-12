import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { fetchprofiledataQuery } from "@/app/actions/userprofile/userprofile-fetch-query";
import Navbar from "@/app/components/navbar/Navbar";
import UserProfileForm from "@/app/components/userprofile/UserProfile";

const UserProfilePage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(fetchprofiledataQuery());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserProfileForm />
    </HydrationBoundary>
  );
};

export default UserProfilePage;
