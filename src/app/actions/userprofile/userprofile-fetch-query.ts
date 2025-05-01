import { getUserProfile } from "./userprofile-fetch";

export const fetchprofiledataQuery = () => ({
  queryKey: ["userProfile"],
  queryFn: () => getUserProfile(),
});
