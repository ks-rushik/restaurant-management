import { BiCategory } from "react-icons/bi";
import { MdOutlineModeEdit } from "react-icons/md";
import BaseConfirmation from "@/app/components/ui/BaseConfirmation";
import BaseButton from "@/app/components/ui/BaseButton";
import { Loader } from "@mantine/core";
import { FC } from "react";
import { ICategorydata } from "./AddCategoryModal";

type IMenuActionsProps = {
  item: ICategorydata;
  handleView: (category_name: string) => void;
  handleSelectCategory: (item: ICategorydata) => void;
  handleDelete: (
    id: string,
    event: React.MouseEvent<HTMLButtonElement>
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
      <div
        onClick={() => handleView(item.category_name!)}
        className="mr-6 cursor-pointer"
      >
        <BiCategory size={22} />
      </div>
      <div
        onClick={() => handleSelectCategory(item)}
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
          onClick={(event) => handleDelete(item.id!, event)}
          classNames={{ root: "w-1/3 mt-6" }}
        >
          {loading === item.id ? <Loader size={23} /> : "Delete"}
        </BaseButton>
      </BaseConfirmation>
    </span>
  );
};

export default CategoryActions;
