import fetchMenudata from "@/app/features/menu/actions/menu-fetch";
import fetchCategoryItemData from "@/app/features/public/actions/getCategoryItem";
import getMenuData from "@/app/features/public/actions/getMenuData";
import { getProfileData } from "@/app/features/public/actions/getProfileData";
import CustomerSide from "@/app/components/customer/CustomerSide";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient();

const page = async ({ params }: { params: Promise<{ m: string }> }) => {
  const { m } = await params;
  await queryClient.prefetchQuery({
    queryKey: ["url"],
    queryFn: () => getMenuData(m),
  });
  const data: { menu_id: any }[] | undefined = queryClient.getQueryData([
    "url",
  ]);
  const menuId = data?.[0].menu_id;

  await queryClient.prefetchQuery({
    queryKey: ["CategoryItems"],
    queryFn: () => fetchCategoryItemData(menuId),
  });

  await queryClient.prefetchQuery({
    queryKey: ["ProfileDetails"],
    queryFn: () => getProfileData(),
   
  });
  await queryClient.prefetchQuery({
    queryKey: ["menu"],
    queryFn: () => fetchMenudata(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CustomerSide id={m} />
    </HydrationBoundary>
  );
};

export default page;
