import { useQuery } from "@tanstack/react-query";
import { getProfileData } from "../../../actions/customer/getProfileData";

const useProfileData = () => {
  const { data } = useQuery({
    queryKey: ["ProfileDetails"],
    queryFn: () =>  getProfileData(),
    staleTime:1000 * 60
  });
 
  return data;
};

export default useProfileData;