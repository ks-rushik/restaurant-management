import { FC, ReactNode } from "react";

import HeaderCss from "@components/HeaderCss";
import { useDictionary } from "@components/context/Dictionary";

type IMenuHeaderProps = {
  children: ReactNode;
};
const MenuHeader: FC<IMenuHeaderProps> = (props) => {
  const { children } = props;
  const lang = useDictionary();

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
