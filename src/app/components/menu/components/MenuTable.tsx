import BaseTable from "@/app/components/ui/BaseTable";
import { IMenudata } from "../../../features/menu/types/type";
import MenuActions from "./MenuActions";
import { FC } from "react";
import Loader from "@/app/components/ui/BaseLoader";
import ShareMenu from "./ShareMenu";
import formatDate from "@/app/utils/formatdate";

type IMenuTableProps = {
  data: IMenudata[] | undefined | null;
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


const MenuTable: FC<IMenuTableProps> = (props) => {
  const {
    data,
    handleView,
    handleSelectMenu,
    handleDelete,
    loading,
    opened,
    close,
  } = props;
  
  return !data ? (
    <Loader></Loader>
  ) : data?.length === 0 ? (
   <Loader></Loader>
  ) : (
    <BaseTable
      highlightOnHover
      data={data!}
      getKey={(item) => item.id}
      columns={[
        {
          label: "MENU NAME",
          render: (item) => `${item.menu_name} (${item.currency})`,
        },
        {
          label: "AVAILABILITY",
          render: (item) => item.status,
        },
        {
          label: "CREATED AT",
          render: (item) => formatDate(item.created_at)
        },
        {
          label: "",
          render: (item) => (
            <MenuActions
              item={item}
              handleView={handleView}
              handleSelectMenu={handleSelectMenu}
              handleDelete={handleDelete}
              loading={loading}
              opened={opened}
              close={close}
            />
          ),
        },
      ]}
    />
  );
};

export default MenuTable;
