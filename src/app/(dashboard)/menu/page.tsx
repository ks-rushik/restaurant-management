import fetchMenudata from "@/app/features/menu/actions/menu-fetch";
import Menu from "@/app/components/menu/MenuPage";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export const queryClient = new QueryClient();
const Menupage = async () => {
  await queryClient.prefetchQuery({
    queryKey: ["menu"],
    queryFn: fetchMenudata,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Menu />
    </HydrationBoundary>
  );
};
export default Menupage;
