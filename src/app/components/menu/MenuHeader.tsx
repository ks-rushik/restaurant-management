import { FC, ReactNode } from "react";
import HeaderCss from "@components/HeaderCss";

type IMenuHeaderProps = {
  children: ReactNode;
};
const MenuHeader: FC<IMenuHeaderProps> = (props) => {
  const { children } = props;
  const item = [{ title: "Menu", href: "/menu", active: true }];
  return (
    <>
      <HeaderCss headertitle="Menus" item={item}>
        {children}
      </HeaderCss>
    </>
  );
};

export default MenuHeader;
