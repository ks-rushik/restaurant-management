import CategoryPage from '@/app/components/category/CategoryPage';
import fetchCategorydata from '@/app/actions/category/category-fetch';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react'

export const queryClient = new QueryClient();

const page = async({params}:{params:Promise<{menuId:string}>}) => {
  const {menuId} = await params;
  
    await queryClient.prefetchQuery({
        queryKey:['category'],
        queryFn:() => fetchCategorydata(menuId)
    })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
         <CategoryPage/>
    </HydrationBoundary>
   
  )
}

export default page
