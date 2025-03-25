import CategoryPage from '@/app/components/category/CategoryPage';
import fetchCategorydata from '@/app/actions/category/category-fetch';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react'
import fetchMenudata from '@/app/actions/menu/menu-fetch';

export const queryClient = new QueryClient();

const page = async({params}:{params:Promise<{menuId:string}>}) => {
  const {menuId} = await params;
  
    await queryClient.prefetchQuery({
        queryKey:['category'],
        queryFn:() => fetchCategorydata(menuId)
    })
    await queryClient.prefetchQuery({
      queryKey:['menu'],
      queryFn: () => fetchMenudata()
    })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
         <CategoryPage/>
    </HydrationBoundary>
   
  )
}

export default page
