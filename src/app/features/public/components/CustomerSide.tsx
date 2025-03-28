"use client";
import CustomerSideHeader from "./CustomerSideHeader";
import useCategoriesItems from "../hook/useCategoriesItems";
import CustomerSideBody from "./CustomerSideBody";
import useShortUrl from "../hook/useUrl";

const CustomerSide = ({ id }: { id: string }) => {
  const menuid = useShortUrl(id);
  const dataId = menuid?.[0].menu_id;

  const { categories } = useCategoriesItems(dataId) || {};

  const profilelogo = categories?.[0]?.menus.restaurant_id.logo;
  const profileName = categories?.[0]?.menus.restaurant_id.name;

  return (
    <div className="flex flex-col lg:flex-row lg:items-start container mx-auto mb-10">
      <div className=" w-full">
        <CustomerSideHeader logo={profilelogo} name={profileName} />
        <CustomerSideBody categories={categories} id={id} />
      </div>
    </div>
  );
};

export default CustomerSide;
