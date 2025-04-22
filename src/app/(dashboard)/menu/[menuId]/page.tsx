import CategoryPage from "@/app/components/category/CategoryPage";
import fetchCategorydata from "@/app/actions/category/category-fetch";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import fetchMenudata from "@/app/actions/menu/menu-fetch";
import Navbar from "@/app/components/navbar/Navbar";

const queryClient = new QueryClient();

const page = async ({ params }: { params: Promise<{ menuId: string }> }) => {
  const { menuId } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["category" , menuId ,'' ,''],
    queryFn: () => fetchCategorydata(menuId ,"" ,""),
  });
  await queryClient.prefetchQuery({
    queryKey: ["menu", "", "Available"],
    queryFn: () => fetchMenudata("" ,'Available'),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Navbar />
      <CategoryPage />
    </HydrationBoundary>
  );
};

export default page;
