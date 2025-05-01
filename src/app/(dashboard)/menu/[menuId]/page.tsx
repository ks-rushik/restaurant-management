import React from "react";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { fetchCategorydataQuery } from "@/app/actions/category/categoryfetchquery";
import { fetchMenudataQuery } from "@/app/actions/menu/menufetchquery";
import CategoryPage from "@/app/components/category/CategoryPage";
import Navbar from "@/app/components/navbar/Navbar";

const queryClient = new QueryClient();

const page = async ({ params }: { params: Promise<{ menuId: string }> }) => {
  const { menuId } = await params;

  await queryClient.prefetchQuery(fetchCategorydataQuery(menuId, "", ""));
  await queryClient.prefetchQuery(fetchMenudataQuery("", ""));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Navbar />
      <CategoryPage />
    </HydrationBoundary>
  );
};

export default page;
