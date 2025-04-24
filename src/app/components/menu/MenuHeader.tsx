import { FC, ReactNode } from "react";
import HeaderCss from "../HeaderCss";

type IMenuHeaderProps = {
  children: ReactNode;
};
const MenuHeader: FC<IMenuHeaderProps> = (props) => {
  const { children } = props;
  const item = [{ title: "Menu", href: "/menu" }];
  return (
    <>
      <HeaderCss headertitle="Menus" item={item}>
        {children}
      </HeaderCss>
    </>
  );
};

export default MenuHeader;
