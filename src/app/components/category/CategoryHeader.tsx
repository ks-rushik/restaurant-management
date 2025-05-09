"use client";

import { notFound, usePathname } from "next/navigation";
import { FC, ReactNode } from "react";

import HeaderCss from "@components/HeaderCss";
import { useQuery } from "@tanstack/react-query";

import { fetchMenudataQuery } from "@/app/actions/menu/menufetchquery";

type ICategoryHeaderProps = {
  children: ReactNode;
};
const CategoryHeader: FC<ICategoryHeaderProps> = (props) => {
  const { children } = props;
  const pathname = usePathname();
  const segments = pathname.split("/")[1];
  const { data } = useQuery(fetchMenudataQuery("", ""));
  const menuId = pathname.split("/")[2];
  const menu = data?.find((menu) => menu.id === menuId)?.menu_name;
  if (menu === undefined) {
    return notFound();
  }

  const breadcrumbItems = [
    {
      title: segments[0].toUpperCase() + segments.slice(1),
      href: `/${segments}`,
    },
    {
      title: menu?.[0].toUpperCase() + menu?.slice(1),
      href: `#`,
      active: true,
    },
  ];

  return (
    <>
      <HeaderCss headertitle="Categories" item={breadcrumbItems}>
        {children}
      </HeaderCss>
    </>
  );
};
export default CategoryHeader;
