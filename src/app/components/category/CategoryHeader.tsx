"use client";

import { notFound, usePathname } from "next/navigation";
import { FC, ReactNode } from "react";

import HeaderCss from "@components/HeaderCss";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { IMessages } from "@/app/[locale]/messages";
import { fetchMenudataQuery } from "@/app/actions/menu/menufetchquery";

type ICategoryHeaderProps = {
  children: ReactNode;
  lang?: IMessages;
};
const CategoryHeader: FC<ICategoryHeaderProps> = (props) => {
  const { children, lang } = props;
  const pathname = usePathname();
  const segments = pathname.split("/")[2];
  const { data } = useInfiniteQuery(fetchMenudataQuery("", ""));
  const menuId = pathname.split("/")[3];

  const menu = data?.pages.flat().find((menu) => menu.id === menuId)?.menu_name;
  if (menu === undefined) {
    return notFound();
  }

  const breadcrumbItems = [
    {
      title: segments[0].toUpperCase() + segments.slice(1),
      href: `/${segments}`,
    },
    {
      title: menu?.[0].toUpperCase()! + menu?.slice(1),
      href: `#`,
      active: true,
    },
  ];

  return (
    <>
      <HeaderCss headertitle={lang?.categories.title!} item={breadcrumbItems}>
        {children}
      </HeaderCss>
    </>
  );
};
export default CategoryHeader;
