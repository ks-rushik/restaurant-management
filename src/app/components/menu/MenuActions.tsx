import { FC } from "react";

import { Loader } from "@mantine/core";
import { BiCategory } from "react-icons/bi";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

import { IMessages } from "@/app/[locale]/messages";
import BaseConfirmation from "@/app/components/ui/BaseConfirmation";
import { IMenudata } from "@/app/type/type";

import TypesOfMenu from "./TypesOfMenu";

type IMenuActionsProps = {
  item: IMenudata;
  handleView: (menu_name: string, id: string) => void;
  handleSelectMenu: (item: IMenudata) => void;
  handleDelete: (
    id: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void;
  loading: string;
  opened: boolean;
  close: () => void;
  lang?: IMessages;
};

const MenuActions: FC<IMenuActionsProps> = (props) => {
  const {
    item,
    handleView,
    handleSelectMenu,
    handleDelete,
    loading,
    opened: confimationopen,
    close: confirmationclose,
    lang,
  } = props;

  return (
    <span className="inline-flex items-center">
      <div
        onClick={() => handleView(item.menu_name!, item.id)}
        className="mr-6 cursor-pointer"
        title="Categories"
      >
        <BiCategory
          size={22}
          className=" hover:text-gray-700 dark:hover:text-gray-400"
        />
      </div>
      <div
        onClick={() => handleSelectMenu(item)}
        className="mr-6 cursor-pointer"
        title="Edit Menu"
      >
        <MdOutlineModeEdit size={22} className="hover:text-yellow-400  " />
      </div>

      <TypesOfMenu item={item} lang={lang} />

      <BaseConfirmation
        opened={confimationopen}
        onClose={confirmationclose}
        btnProps={{
          onClick: (event) => handleDelete(item.id, event),
          children: loading === item.id ? <Loader size={23} /> : "Delete",
        }}
        text="Are you sure you want to delete this item?"
      >
        <RiDeleteBinLine
          size={22}
          className="hover:text-red-500 cursor-pointer "
        />
      </BaseConfirmation>
    </span>
  );
};

export default MenuActions;
