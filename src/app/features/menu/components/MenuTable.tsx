import BaseTable from "@/app/components/ui/BaseTable";
import { IMenudata } from "../types/type";
import MenuActions from "./MenuActions";
import { FC } from "react";

type IMenuTableProps = {
  data: IMenudata[] | undefined | null;
  handleView: (menu_name: string) => void;
  handleSelectMenu: (item: IMenudata) => void;
  handleDelete: (
    id: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  loading: string;
  opened: boolean;
  close: () => void;
};

const IndianTime = new Intl.DateTimeFormat("en-IN", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

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
  
  return  data?.length === 0 ? (
    <p className="text-center text-gray-500 mt-4">
      No menus available. Click "Add New Menu" to create one.
    </p>
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
          render: (item) => {
            const date = new Date(item.created_at);
            return IndianTime.format(date);
          },
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
