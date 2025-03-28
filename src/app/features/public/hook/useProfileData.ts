import { useQuery } from "@tanstack/react-query";
import { getProfileData } from "../actions/getProfileData";

const useProfileData = () => {
  const { data } = useQuery({
    queryKey: ["ProfileDetails"],
    queryFn: () =>  getProfileData(),
    staleTime:1000 * 60
  });
 
  return data;
};

export default useProfileData;