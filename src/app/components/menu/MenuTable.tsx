import { FC } from "react";

import FilteredData from "@components/FilterData";
import SearchFilter from "@components/SearchFilter";
import SearchInput from "@components/SearchInput";

import Loader from "@/app/components/ui/BaseLoader";
import BaseTable from "@/app/components/ui/BaseTable";
import { Availablity } from "@/app/constants/common";
import { IMenudata } from "@/app/type/type";
import formatDate from "@/app/utils/formatdate";

import MenuActions from "./MenuActions";

type IMenuTableProps = {
  data: IMenudata[] | undefined | null;
  handleView: (menu_name: string, id: string) => void;
  handleSelectMenu: (item: IMenudata) => void;
  handleDelete: (
    id: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void;
  loading: string;
  opened: boolean;
  close: () => void;
  searchData: string;
  setSearchData: (val: string) => void;
  filterStatus: string;
  setFilterStatus: (val: string) => void;
};

const MenuTable: FC<IMenuTableProps> = ({
  data,
  handleView,
  handleSelectMenu,
  handleDelete,
  loading,
  opened,
  close,
  searchData,
  setSearchData,
  filterStatus,
  setFilterStatus,
}) => {
  return !data ? (
    <Loader />
  ) : (
    <>
      <SearchFilter>
        <SearchInput
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
          placeholder="Search menu..."
        />
        <FilteredData
          value={filterStatus}
          data={[Availablity.Available, Availablity.NotAvailable, "All"]}
          placeholder="Choose availability"
          onChange={(value) => setFilterStatus(value || "")}
        />
      </SearchFilter>

      {data.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">No menus found.</p>
      ) : (
        <BaseTable
          data={data}
          getKey={(item) => item.id}
          columns={[
            {
              label: "MENU NAME",
              render: (item) => `${item.menu_name} (${item.currency})`,
            },
            {
              label: "AVAILABILITY",
              render: (item) =>
                item.status === Availablity.NotAvailable ? (
                  <p className="text-red-500">{Availablity.NotAvailable}</p>
                ) : (
                  <p className="text-green-600">{Availablity.Available}</p>
                ),
            },
            {
              label: "CREATED AT",
              render: (item) => formatDate(item.created_at),
            },
            {
              label: "UPDATED AT",
              render: (item) => formatDate(item.updated_at),
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
      )}
    </>
  );
};

export default MenuTable;
