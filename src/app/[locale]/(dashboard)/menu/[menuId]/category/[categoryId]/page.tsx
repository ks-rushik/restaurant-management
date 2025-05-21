import React from "react";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { IMessages, getDictionary } from "@/app/[locale]/messages";
import { fetchcategoryitemdataQuery } from "@/app/actions/item/categorymenufetchquery";
import { fetchItemdataQuery } from "@/app/actions/item/itemfetchquery";
import DictionaryProvider from "@/app/components/context/Dictionary";
import ItemPage from "@/app/components/item/ItemPage";

const queryClient = new QueryClient();

const page = async ({
  params,
}: {
  params: Promise<{
    categoryId: string;
    locale: "en" | "hd" | "sp";
  }>;
}) => {
  const { categoryId } = await params;

  await queryClient.prefetchInfiniteQuery(fetchItemdataQuery(categoryId, ""));

  await queryClient.prefetchQuery(fetchcategoryitemdataQuery(categoryId)); // prefetch menu and category name for breadcrumb
  const locale = (await params).locale;
  const dictionary: IMessages = await getDictionary(locale);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DictionaryProvider value={dictionary}>
        <ItemPage />
      </DictionaryProvider>
    </HydrationBoundary>
  );
};

export default page;
