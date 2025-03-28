"use client";
import useCategoriesItems from "../../hooks/useCategoriesItems";
import CustomerSideBody from "./CustomerSideBody";
import useShortUrl from "../../hooks/useUrl";
import CustomerSideHeader from "./CustomerSideHeader";

const CustomerSide = ({ id }: { id: string }) => {
  const menuid = useShortUrl(id);
  const dataId = menuid?.[0].menu_id;

  const { categories ,userEmail } = useCategoriesItems(dataId) || {};
  console.log(userEmail);
  

  const profilelogo = categories?.[0]?.menus.restaurant_id.logo;
  const profileName = categories?.[0]?.menus.restaurant_id.name;

  return (
    <div className="container px-4 mx-auto  mb-10">
      <CustomerSideHeader logo={profilelogo} name={profileName} />
      <CustomerSideBody categories={categories} id={id} />
    </div>
  );
};

export default CustomerSide;
