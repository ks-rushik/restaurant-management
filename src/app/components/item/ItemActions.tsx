import { FC } from "react";

import { Loader } from "@mantine/core";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

import BaseConfirmation from "@/app/components/ui/BaseConfirmation";

import { IItemdata } from "./AddItemModal";

type IMenuActionsProps = {
  item: IItemdata;
  handleDelete: (
    id: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void;
  handleSelectItem: (item: IItemdata) => void;
  loading: string;
  opened: boolean;
  close: () => void;
};

const CategoryActions: FC<IMenuActionsProps> = (props) => {
  const { item, handleDelete, handleSelectItem, loading, opened, close } =
    props;
  return (
    <span className="inline-flex items-center">
      <div
        onClick={() => handleSelectItem(item)}
        className="mr-6 cursor-pointer"
        title="Edit Item"
      >
        <MdOutlineModeEdit size={22} className="hover:text-yellow-500 " />
      </div>
      <BaseConfirmation
        opened={opened}
        onClose={close}
        btnProps={{
          onClick: (event) => handleDelete(item.id ?? "", event),
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

export default CategoryActions;
