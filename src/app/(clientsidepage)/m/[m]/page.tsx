import { notFound } from "next/navigation";
import React from "react";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { getCategoryItemQuery } from "@/app/actions/customer/getCategoryItemQuery";
import { getUrlDataQuery } from "@/app/actions/customer/getUrlDataQuery";
import CustomerSide from "@/app/components/customer/ItemBased/CustomerSide";

const queryClient = new QueryClient();

const page = async ({ params }: { params: Promise<{ m: string }> }) => {
  const { m } = await params;
  const data = await queryClient.fetchQuery(getUrlDataQuery(m));

  const menuId = data?.[0]?.menu_id;

  if (!menuId || !params) {
    return notFound();
  }

  await queryClient.prefetchQuery(getCategoryItemQuery(menuId));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CustomerSide id={m} />
    </HydrationBoundary>
  );
};

export default page;
