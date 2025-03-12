import { BiCategory } from "react-icons/bi";
import { MdOutlineModeEdit } from "react-icons/md";
import BaseConfirmation from "@/app/components/ui/BaseConfirmation";
import BaseButton from "@/app/components/ui/BaseButton";
import { Loader } from "@mantine/core";
import { IMenudata } from "../types/type";
import { FC } from "react";

type IMenuActionsProps = {
  item: IMenudata;
  handleView: (menu_name: string , id:string) => void;
  handleSelectMenu: (item: IMenudata) => void;
  handleDelete: (
    id: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  loading: string;
  opened: boolean;
  close: () => void;
};

const MenuActions: FC<IMenuActionsProps> = (props) => {
  const {
    item,
    handleView,
    handleSelectMenu,
    handleDelete,
    loading,
    opened,
    close,
  } = props;
  return (
    <span className="inline-flex items-center">
      <div
        onClick={() => handleView(item.menu_name!,item.id)}
        className="mr-6 cursor-pointer"
      >
        <BiCategory size={22} />
      </div>
      <div
        onClick={() => handleSelectMenu(item)}
        className="mr-6 cursor-pointer"
      >
        <MdOutlineModeEdit size={22} color="#f2cc50" />
      </div>
      <BaseConfirmation
        opened={opened}
        onClose={close}
        text="Are you sure you want to delete this item?"
      >
        <BaseButton
          intent="danger"
          onClick={(event) => handleDelete(item.id, event)}
          classNames={{ root: "w-1/3 mt-6" }}
        >
          {loading === item.id ? <Loader size={23} /> : "Delete"}
        </BaseButton>
      </BaseConfirmation>
    </span>
  );
};

export default MenuActions;
