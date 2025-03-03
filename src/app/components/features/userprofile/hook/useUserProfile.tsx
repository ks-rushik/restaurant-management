import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../actions/userprofile-fetch";

export function useUserProfile() {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    staleTime: 1000 * 60 * 5,   
  });
}
