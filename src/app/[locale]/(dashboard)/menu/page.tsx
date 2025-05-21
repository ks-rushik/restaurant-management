import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { fetchMenudataQuery } from "@/app/actions/menu/menufetchquery";
import Menu from "@/app/components/menu/MenuPage";

import { getDictionary } from "../../messages";

const queryClient = new QueryClient();

const Menupage = async ({
  params,
}: Readonly<{
  params: { locale: "en" | "hd" | "sp" };
}>) => {
  await queryClient.prefetchInfiniteQuery(fetchMenudataQuery("", ""));

  const locale = (await params).locale;
  const dictionary = await getDictionary(locale);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Menu lang={dictionary} />
    </HydrationBoundary>
  );
};

export default Menupage;
