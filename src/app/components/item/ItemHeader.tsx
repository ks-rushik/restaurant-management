"use client";
import CustomBreadcrumbs from "@/app/components/ui/BaseBreadcrumbs";
import useCategoriesItems from "@/app/hooks/useCategoriesItems";
import useItem from "@/app/hooks/useItem";
import { notFound, redirect, usePathname,  useSearchParams } from "next/navigation";
import { FC, ReactNode } from "react";

type ICategoryHeaderProps = {
  children: ReactNode;
};
const ItemHeader: FC<ICategoryHeaderProps> = (props) => {
  const { children } = props;
  const pathname = usePathname();
  const segments = pathname.split("/")[1];
  const menuId = pathname.split('/')[2];
  const itemId = pathname.split('/')[3]
  const {categories} = useCategoriesItems(menuId) || {}

  const itemname = categories?.find((item) => item.id === itemId)?.category_name;
  if(!itemname){
    return notFound()
  }
  const categoryname = categories?.find((item) => item.id === itemId)?.menus.menu_name;

  const breadcrumbItems = [
    {
      title: segments[0].toUpperCase() + segments?.slice(1),
      href: `/${segments}`,
    },
    {
        title: categoryname?.[0].toUpperCase() + categoryname?.slice(1),
        href:`/menu/${menuId}`
    },
    {
      title: itemname?.[0].toUpperCase() + itemname?.slice(1),
      href: `#`,
    },
  ];

  return (
    <div>
      <div className="flex flex-row justify-between pt-8 pl-1">
        <h1 className="text-2xl font-bold">Items</h1>
        {children}
      </div>
      <CustomBreadcrumbs items={breadcrumbItems} separatorMargin="xs" children={undefined} />
    </div>
  );
};
export default ItemHeader;
