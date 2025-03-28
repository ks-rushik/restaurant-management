import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../actions/userprofile/userprofile-fetch";

export function useUserProfile() {
  const query = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    staleTime: 1000 * 60 * 5,
  });
  return query;
}
