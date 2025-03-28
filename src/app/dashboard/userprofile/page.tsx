import { getUserProfile } from "@/app/components/features/userprofile/actions/userprofile-fetch";
import UserProfileForm from "@/app/components/features/userprofile/components/UserProfile";
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
