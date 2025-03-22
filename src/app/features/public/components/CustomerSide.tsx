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
    <div className="container px-11 mx-auto  mb-10">
      <CustomerSideHeader logo={profilelogo} name={profileName} />
      <CustomerSideBody categories={categories} id={id} />
    </div>
  );
};

export default CustomerSide;
