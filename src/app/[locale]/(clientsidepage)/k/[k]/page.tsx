import { notFound } from "next/navigation";
import React from "react";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { getCategoryItemQuery } from "@/app/actions/customer/getCategoryItemQuery";
import { getUrlDataQuery } from "@/app/actions/customer/getUrlDataQuery";
import CustomerSide from "@/app/components/customer/CategoryBased/CustomerSide";

const queryClient = new QueryClient();

const page = async ({ params }: { params: Promise<{ k: string }> }) => {
  const { k } = await params;

  const data = await queryClient.fetchQuery(getUrlDataQuery(k));

  const menuId = data?.[0]?.menu_id;

  if (!menuId || !params) {
    return notFound();
  }

  await queryClient.prefetchQuery(getCategoryItemQuery(menuId));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CustomerSide id={k} />
    </HydrationBoundary>
  );
};

export default page;
