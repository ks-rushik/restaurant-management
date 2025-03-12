"use client";
import CustomBreadcrumbs from "@/app/components/ui/BaseBreadcrumbs";
import { usePathname, useSearchParams } from "next/navigation";
import { FC, ReactNode } from "react";
import MenuActions from "../../menu/components/MenuActions";


type ICategoryHeaderProps = {
  children: ReactNode;
};
const DynamicMenuPage:FC<ICategoryHeaderProps> = (props) => {
    const {children} = props
    const searchParam = useSearchParams()
    const menuname = searchParam.get('name')
  const pathname = usePathname();
  
  const segments = pathname.split("/")[1];

  const breadcrumbItems = [{
        title: segments ,
        href: `/${segments}` 
      }, {
        title: menuname! ,
        href:`#`
      }]

  return (
    <div>
      <CustomBreadcrumbs items={breadcrumbItems} children={undefined} />
     <div className="flex flex-row justify-between p-1 pb-8">
        <h1 className="text-2xl font-bold">Menus</h1>
        {children}
      </div>
    </div>
  );
};
export default DynamicMenuPage;