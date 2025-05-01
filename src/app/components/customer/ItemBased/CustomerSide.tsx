"use client";

import { notFound } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import { getCategoryItemQuery } from "@/app/actions/customer/getCategoryItemQuery";
import { getUrlDataQuery } from "@/app/actions/customer/getUrlDataQuery";

import CustomerSideBody from "./CustomerSideBody";
import CustomerSideHeader from "./CustomerSideHeader";

const CustomerSide = ({ id }: { id: string }) => {
  const menuid = useQuery(getUrlDataQuery(id));

  if (id?.length !== 6) {
    return notFound();
  }
  const dataId = menuid.data?.[0].menu_id;

  const { data } = useQuery(getCategoryItemQuery(dataId));
  const categories = data?.categories;

  const NotavailableItem = categories?.[0].menus.status;

  const profilelogo = categories?.[0]?.menus.restaurant_id.logo;
  const profileName = categories?.[0]?.menus.restaurant_id.name;

  return (
    <>
      {NotavailableItem === "Not Available" ? (
        <div className="flex flex-col items-center justify-center p-96 space-y-4">
          <div className="flex justify-center items-center  text-3xl font-bold text-red-600 ">
            Menu is not available now
          </div>
          <div className="text-lg text-red-600 font-normal">
            Unfortunately, now menu is not available. To see menu change the
            status from not available to available.
          </div>
        </div>
      ) : (
        <div className="container px-4 mx-auto  mb-10">
          <CustomerSideHeader logo={profilelogo} name={profileName} />
          <CustomerSideBody categories={categories} id={id} />
        </div>
      )}
    </>
  );
};

export default CustomerSide;
