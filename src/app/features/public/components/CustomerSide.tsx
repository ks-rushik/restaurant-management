"use client";
import CustomerSideHeader from "./CustomerSideHeader";
import useCategoriesItems from "../hook/useCategoriesItems";

import CustomerSideBody from "./CustomerSideBody";

const CustomerSide = ({ id }: { id: string }) => {
  const { categories } = useCategoriesItems(id) || {};


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 px-4 sm:px-12 md:px-16 lg:px-20 xl:px-32 py-6">
      <CustomerSideHeader />
      <CustomerSideBody categories={categories} id={id}/>
    </div>
  );
};
export default CustomerSide;
