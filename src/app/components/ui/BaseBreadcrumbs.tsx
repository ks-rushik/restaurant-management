import {
    Breadcrumbs,
    Anchor,
    BreadcrumbsStylesNames,
    BreadcrumbsProps,
  } from "@mantine/core";
  import clsx from "clsx";
  import { FC, ReactNode } from "react";
  
  type IBreadcrumbItem = {
    icon?: ReactNode;
    title: string;
    href: string;
  };
  
  type IBreadcrumbsProps = {
    items: IBreadcrumbItem[];
    separator?: string;
    separatorMargin?: string;
  } & BreadcrumbsProps & {
      classNames?: Partial<Record<BreadcrumbsStylesNames, string>> | undefined;
    };
  
  const CustomBreadcrumbs: FC<IBreadcrumbsProps> = (props) => {
    const {
      items,
      separator = "/",
      separatorMargin = "md",
      classNames,
      ...other
    } = props;
    const { root, breadcrumb, ...otherelement } = classNames || {};
  
    return (
      <Breadcrumbs
        separator={separator}
        separatorMargin={separatorMargin}
        classNames={{
          root: clsx("pl-12 pt-8", root),
          breadcrumb: clsx(
            "font-md font-bold text-black hover:text-blue-400",
            breadcrumb
          ),
          ...otherelement,
        }}
        {...other}
      >
        {items.map((item, index) => (
          <Anchor href={item.href} key={index}>
            <span className="inline-flex items-center">
              {item.icon && <span className="pr-1">{item.icon}</span>}
              <span>{item.title}</span>
            </span>
          </Anchor>
        ))}
      </Breadcrumbs>
    );
  };
  
  export default CustomBreadcrumbs;
  