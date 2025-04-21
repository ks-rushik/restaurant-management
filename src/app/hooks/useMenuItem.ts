import { useQuery } from "@tanstack/react-query";
import fetchMenudata from "../actions/menu/menu-fetch";

const useMenuItem = () => {
  const { data } = useQuery({
    queryKey: ["menu"],
    queryFn: fetchMenudata,
    staleTime: 60 * 1000
  });

  return data;
};

export default useMenuItem;
