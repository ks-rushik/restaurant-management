import React from "react";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { fetchcategoryitemdataQuery } from "@/app/actions/item/categorymenufetchquery";
import { fetchItemdataQuery } from "@/app/actions/item/itemfetchquery";
import ItemPage from "@/app/components/item/ItemPage";
import Navbar from "@/app/components/navbar/Navbar";

const queryClient = new QueryClient();

const page = async ({
  params,
}: {
  params: Promise<{ categoryId: string; menuId: string }>;
}) => {
  const { categoryId, menuId } = await params;

  await queryClient.prefetchQuery(fetchItemdataQuery(categoryId, "", ""));

  await queryClient.prefetchQuery(fetchcategoryitemdataQuery(categoryId));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Navbar />
      <ItemPage />
    </HydrationBoundary>
  );
};

export default page;
