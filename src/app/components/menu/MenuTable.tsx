import { FC } from "react";

import FilteredData from "@components/FilterData";
import SearchFilter from "@components/SearchFilter";
import SearchFilterWrapper from "@components/SearchFilter";
import SearchInput from "@components/SearchInput";
import { useDictionary } from "@components/context/Dictionary";
import BaseButton from "@components/ui/BaseButton";
import BaseModal from "@components/ui/BaseModal";
import { useDisclosure } from "@mantine/hooks";
import { CiFilter } from "react-icons/ci";

import Loader from "@/app/components/ui/BaseLoader";
import BaseTable from "@/app/components/ui/BaseTable";
import { Availablity } from "@/app/constants/common";
import { IMenudata } from "@/app/type/type";
import formatDate from "@/app/utils/formatdate";

import MenuActions from "./MenuActions";
import ModalFilter from "./ModalFilter";

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
  opened: ModalOpen,
  close: ModalClose,
  searchData,
  setSearchData,
  filterStatus,
  setFilterStatus,
}) => {
  const lang = useDictionary();
  const [opened, { open, close }] = useDisclosure(false);

  return !data ? (
    <Loader />
  ) : (
    <>
      <SearchFilterWrapper>
        <SearchInput
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
          placeholder={lang?.menus.searchmenu}
        />
        <div className="hidden sm:flex flex-row">
          <FilteredData
            value={filterStatus}
            data={[Availablity.Available, Availablity.NotAvailable, "All"]}
            placeholder={lang?.items.chooseavailibility}
            onChange={(value) => setFilterStatus(value || "")}
          />
        </div>
        <BaseModal opened={opened} onClose={close} title={"Filter data"}>
          <ModalFilter
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            close={close}
          />
        </BaseModal>

        <BaseButton
          className="sm:hidden  px-4  h-[54px] font-normal text-lg w-36 rounded-lg"
          leftSection={<CiFilter size={24} />}
          onClick={() => {
            open();
          }}
        >
          {lang.items.filters}
        </BaseButton>
      </SearchFilterWrapper>
     

      {data.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">No menus found.</p>
      ) : (
        <BaseTable
          data={data}
          getKey={(item) => item.id}
          columns={[
            {
              label: lang?.menus.MENUNAME!,
              render: (item) => `${item.menu_name} (${item.currency})`,
            },
            {
              label: lang?.menus.AVAILABILITY!,
              render: (item) =>
                item.status === Availablity.NotAvailable ? (
                  <p className="text-red-500">
                    {lang?.availableStatus.notAvailable}
                  </p>
                ) : (
                  <p className="text-green-600">
                    {lang?.availableStatus.available}
                  </p>
                ),
            },
            {
              label: lang?.menus.CREATEDAT!,
              render: (item) => formatDate(item.created_at),
            },
            {
              label: lang?.menus.UPDATEDAT!,
              render: (item) => formatDate(item.updated_at),
            },
            {
              label: "",
              render: (item) => (
                <MenuActions
                  lang={lang}
                  item={item}
                  handleView={handleView}
                  handleSelectMenu={handleSelectMenu}
                  handleDelete={handleDelete}
                  loading={loading}
                  opened={ModalOpen}
                  close={ModalClose}
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
