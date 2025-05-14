import { FC } from "react";

import { Loader } from "@mantine/core";
import { BiCategory } from "react-icons/bi";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

import BaseConfirmation from "@/app/components/ui/BaseConfirmation";

import { ICategorydata } from "./AddCategoryModal";

type IMenuActionsProps = {
  item: ICategorydata;
  handleView: (id: string) => void;
  handleSelectCategory: (item: ICategorydata) => void;
  handleDelete: (
    id: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void;
  loading: string;
  opened: boolean;
  close: () => void;
};

const CategoryActions: FC<IMenuActionsProps> = (props) => {
  const {
    item,
    handleView,
    handleSelectCategory,
    handleDelete,
    loading,
    opened,
    close,
  } = props;
  return (
    <span className="inline-flex items-center">
      <div onClick={() => handleView(item.id!)} title="Items">
        <BiCategory
          size={22}
          className="mr-6 cursor-pointer hover:text-gray-700  dark:hover:text-gray-400 "
        />
      </div>
      <div
        onClick={() => handleSelectCategory(item)}
        className="mr-6 cursor-pointer"
        title="Edit Category"
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
