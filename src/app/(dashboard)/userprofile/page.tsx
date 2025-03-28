import { getUserProfile } from "@/app/actions/userprofile/userprofile-fetch";
import UserProfileForm from "@/app/components/userprofile/UserProfile";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const UserProfilePage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserProfileForm />
    </HydrationBoundary>
  );
};

export default UserProfilePage;
