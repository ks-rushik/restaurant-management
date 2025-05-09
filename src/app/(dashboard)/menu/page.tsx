import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { fetchMenudataQuery } from "@/app/actions/menu/menufetchquery";
import Menu from "@/app/components/menu/MenuPage";
import Navbar from "@/app/components/navbar/Navbar";

const queryClient = new QueryClient();
const Menupage = async () => {
  await queryClient.prefetchQuery(fetchMenudataQuery("", ""));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Navbar />
      <Menu />
    </HydrationBoundary>
  );
};
export default Menupage;
