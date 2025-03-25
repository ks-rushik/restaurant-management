"use client";
import CustomBreadcrumbs from "@/app/components/ui/BaseBreadcrumbs";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { FC, ReactNode } from "react";

type ICategoryHeaderProps = {
  children: ReactNode;
};
const CategoryHeader: FC<ICategoryHeaderProps> = (props) => {
  const { children } = props;
  const searchParam = useSearchParams();
  const menuname = searchParam.get("name")!;
  const pathname = usePathname();

  const segments = pathname.split("/")[1];    
  if(!menuname){
    redirect('/not-found')
  }

  const breadcrumbItems = [
    {
      title: segments[0].toUpperCase() + segments.slice(1),
      href: `/${segments}`,
    },
    {
      title: menuname[0].toUpperCase() + menuname?.slice(1),
      href: `#`,
    },
  ];

  return (
    <div>
      <div className="flex flex-row justify-between pt-8 pl-1">
        <h1 className="text-2xl font-bold">Categories</h1>
        {children}
      </div>
      <CustomBreadcrumbs items={breadcrumbItems} children={undefined} />
    </div>
  );
};
export default CategoryHeader;
