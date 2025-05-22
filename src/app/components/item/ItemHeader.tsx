"use client";

import { notFound, usePathname } from "next/navigation";
import { FC, ReactNode } from "react";

import { useDictionary } from "@components/context/Dictionary";
import { useQuery } from "@tanstack/react-query";

import { fetchcategoryitemdataQuery } from "@/app/actions/item/categorymenufetchquery";

import HeaderCss from "../HeaderCss";

type ICategoryHeaderProps = {
  children: ReactNode;
};

const ItemHeader: FC<ICategoryHeaderProps> = ({ children }) => {
  const pathname = usePathname();
  const segments = pathname.split("/")[2];
  const menuId = pathname.split("/")[3];
  const categoryId = pathname.split("/")[5];
  const { data: items } = useQuery(fetchcategoryitemdataQuery(categoryId));
  const lang = useDictionary();

  const itemname = items?.[0].category_name;
  const categoryname = items?.[0].menus?.menu_name;

  if (!itemname) {
    return notFound();
  }

  const breadcrumbItems = [
    {
      title: segments[0].toUpperCase() + segments?.slice(1),
      href: `/${segments}`,
    },
    {
      title: categoryname?.[0].toUpperCase() + categoryname?.slice(1),
      href: `/menu/${menuId}`,
    },
    {
      title: itemname?.[0].toUpperCase() + itemname?.slice(1),
      href: `#`,
      active: true,
    },
  ];

  return (
    <>
      <HeaderCss item={breadcrumbItems} headertitle={lang?.items.title!}>
        {children}
      </HeaderCss>
    </>
  );
};

export default ItemHeader;
