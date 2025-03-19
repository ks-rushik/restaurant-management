"use client";
import CustomerSideHeader from "./CustomerSideHeader";
import useCategoriesItems from "../hook/useCategoriesItems";
import CustomerSideBody from "./CustomerSideBody";


const CustomerSide = ({ id }: { id: string }) => {
  const { categories } = useCategoriesItems(id) || {};

  return (
    <div className="flex flex-col lg:flex-row lg:items-start container mx-auto mb-10">
      <div className=" w-full">
        <CustomerSideHeader />
        <CustomerSideBody categories={categories} id={id} />
      </div>
    </div>
  );
};

export default CustomerSide;
