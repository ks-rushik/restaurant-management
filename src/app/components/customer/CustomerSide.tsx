"use client";
import useCategoriesItems from "../../features/public/hook/useCategoriesItems";
import CustomerSideBody from "./CustomerSideBody";
import useShortUrl from "../../features/public/hook/useUrl";
import CustomerSideHeader from "./CustomerSideHeader";

const CustomerSide = ({ id }: { id: string }) => {
  const menuid = useShortUrl(id);
  const dataId = menuid?.[0].menu_id;

  const { categories } = useCategoriesItems(dataId) || {};

  const profilelogo = categories?.[0]?.menus.restaurant_id.logo;
  const profileName = categories?.[0]?.menus.restaurant_id.name;

  return (
    <div className="container px-6 mx-auto  mb-10">
      <CustomerSideHeader logo={profilelogo} name={profileName} />
      <CustomerSideBody categories={categories} id={id} />
    </div>
  );
};

export default CustomerSide;
