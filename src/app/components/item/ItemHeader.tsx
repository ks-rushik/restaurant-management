"use client";
import useItemData from "@/app/hooks/useItemData";
import { usePathname, notFound, redirect } from "next/navigation";
import { FC, ReactNode } from "react";
import HeaderCss from "../HeaderCss";

type ICategoryHeaderProps = {
  children: ReactNode;
};

const ItemHeader: FC<ICategoryHeaderProps> = ({ children }) => {
  const pathname = usePathname();
  const segments = pathname.split("/")[1];
  const menuId = pathname.split("/")[2];
  const categoryId = pathname.split("/")[4];
  const items = useItemData(categoryId);
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
      active:true
    },
  ];

  return (
    <>
      <HeaderCss item={breadcrumbItems} headertitle="Items">{children}</HeaderCss>
    </>
  );
};

export default ItemHeader;
