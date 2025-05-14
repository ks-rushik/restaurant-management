import { FC, ReactNode } from "react";

import HeaderCss from "@components/HeaderCss";

import { IMessages } from "@/app/[locale]/messages";

type IMenuHeaderProps = {
  children: ReactNode;
  lang?: IMessages;
};
const MenuHeader: FC<IMenuHeaderProps> = (props) => {
  const { children, lang } = props;

  const item = [{ title: "Menu", href: "/menu", active: true }];

  return (
    <>
      <HeaderCss headertitle={lang?.menus.title!} item={item}>
        {children}
      </HeaderCss>
    </>
  );
};

export default MenuHeader;
