import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { getDictionary } from "@/app/[locale]/messages";
import { fetchMenudataQuery } from "@/app/actions/menu/menufetchquery";
import DictionaryProvider from "@/app/components/context/Dictionary";
import Menu from "@/app/components/menu/MenuPage";

const queryClient = new QueryClient();

const Menupage = async ({
  params,
}: Readonly<{
  params: { locale: "en" | "hd" | "sp" };
}>) => {
  await queryClient.prefetchQuery(fetchMenudataQuery("", ""));

  const locale = (await params).locale;
  const dictionary = await getDictionary(locale);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DictionaryProvider value={dictionary}>
        <Menu />
      </DictionaryProvider>
    </HydrationBoundary>
  );
};

export default Menupage;
