import CustomerSide from "@/app/features/public/components/CustomerSide";
import React from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import fetchCategoryItemData from "../features/public/actions/getCategoryItem";
import { getProfileData } from "../features/public/actions/getProfileData";
import fetchMenudata from "../features/menu/actions/menu-fetch";
type SearchParams = Promise<{ id: string }>;
const queryClient = new QueryClient();
const PublicPage = async (props: { searchParams: SearchParams }) => {
  const { id } = await props.searchParams;
  await queryClient.prefetchQuery({
    queryKey: ["CategoryItems"],
    queryFn: () => fetchCategoryItemData(id),
  });
  await queryClient.prefetchQuery({
    queryKey:['ProfileDetails'],
    queryFn:() => getProfileData(),
    staleTime: 60 * 1000
  })
  await queryClient.prefetchQuery({
    queryKey:['menu'],
    queryFn:() => fetchMenudata()
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CustomerSide id={id} />
    </HydrationBoundary>
  );
};

export default PublicPage;
