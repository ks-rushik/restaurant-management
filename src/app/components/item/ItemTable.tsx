import Image from "next/legacy/image";
import { FC, useState } from "react";

import SearchFilter from "@components/SearchFilter";
import SearchInput from "@components/SearchInput";
import { Badge } from "@mantine/core";
import { FaDownLong, FaUpLong } from "react-icons/fa6";
import { LuFilter } from "react-icons/lu";

import { IMessages } from "@/app/[locale]/messages";
import Loader from "@/app/components/ui/BaseLoader";
import BaseTable from "@/app/components/ui/BaseTable";
import { Availablity, Jainoption } from "@/app/constants/common";
import formatDate from "@/app/utils/formatdate";

import BaseSelect from "../ui/BaseSelect";
import { IItemdata } from "./AddItemModal";
import ItemActions from "./ItemActions";
import { IFilter } from "./ItemPage";

type ICategoryTableProps = {
  data: IItemdata[] | undefined | null;
  handleMoveUp: (index: number) => void;
  handleSelectItem: (item: IItemdata) => void;
  handleMoveDown: (index: number) => void;
  handleDelete: (
    id: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void;
  loading: string;
  opened: boolean;
  close: () => void;
  searchData: string;
  setSearchData: (val: string) => void;
  filters: IFilter;
  setFilters: React.Dispatch<React.SetStateAction<IFilter>>;
  lang?: IMessages;
};

const ItemTable: FC<ICategoryTableProps> = (props) => {
  const {
    data,
    handleDelete,
    handleSelectItem,
    handleMoveUp,
    handleMoveDown,
    loading,
    opened,
    close,
    searchData,
    setSearchData,
    filters,
    setFilters,
    lang,
  } = props;
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  return !data ? (
    <Loader />
  ) : (
    <>
      <SearchFilter>
        <SearchInput
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
          placeholder={lang?.items.searchitem}
        />
        <BaseSelect
          value={filters.avaibilityStatus}
          leftSection={<LuFilter size={20} />}
          data={[Availablity.Available, Availablity.NotAvailable, "All"]}
          placeholder={lang?.items.chooseavailibility}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, avaibilityStatus: value || "" }))
          }
        />
        <BaseSelect
          value={filters.jainOption}
          leftSection={<LuFilter size={20} />}
          data={[Jainoption.Jain, Jainoption.NotJain, "All"]}
          placeholder={lang?.items.choosejainoption}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, jainOption: value || "" }))
          }
        />
      </SearchFilter>

      {data.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">No Item found.</p>
      ) : (
        <BaseTable
          classNames={{
            th: "[&:first-child]:w-[60px] ",
            td: "[&:first-child]:w-[60px] ",
          }}
          data={data}
          getKey={(item) => item.id!}
          columns={[
            {
              label: "",
              render: (item) => {
                const index = data!.findIndex(
                  (dataItem) => dataItem.id === item.id,
                );
                return (
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      className="text-gray-500 hover:text-gray-700 disabled:opacity-50 dark:text-white dark:hover:text-gray-500"
                    >
                      <FaUpLong />
                    </button>
                    <button
                      onClick={() => handleMoveDown(index)}
                      disabled={index === data!.length - 1}
                      className="text-gray-500 hover:text-gray-700 disabled:opacity-50 dark:text-white dark:hover:text-gray-500"
                    >
                      <FaDownLong />
                    </button>
                  </div>
                );
              },
            },
            {
              label: lang?.items.IMAGE!,
              render: (item) =>
                item.image && (
                  <Image
                    src={item.image as unknown as string}
                    width={70}
                    height={70}
                    alt={item.name || "Item image"}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                ),
            },
            {
              label: lang?.items.ITEMNAME!,
              render: (item) => (
                <>
                  {item.name}
                  {item.jain === Jainoption.Jain && (
                    <Badge
                      classNames={{
                        root: "bg-primary-main text-sm h-6 opacity-90 ml-2",
                      }}
                      title="Jain"
                    >
                      J
                    </Badge>
                  )}
                </>
              ),
            },

            {
              label: lang?.items.DESCRIPTION!,
              render: (item) => (
                <span
                  className={`cursor-pointer ${
                    expandedRow === item.id
                      ? ""
                      : "truncate block max-w-[200px]"
                  }`}
                  onClick={() =>
                    setExpandedRow(expandedRow === item.id ? null : item.id!)
                  }
                >
                  {item.description}
                </span>
              ),
            },
            {
              label: lang?.items.PRICE!,
              render: (item) =>
                ` ${item.category?.menu?.currency || ""} ${item.price}`,
            },
            {
              label: lang?.items.AVAILABILITY!,
              render: (item) =>
                item.status === Availablity.NotAvailable ? (
                  <p className="text-red-500">{lang?.availableStatus.notAvailable}</p>
                ) : (
                  <p className="text-green-600">{lang?.availableStatus.available}</p>
                ),
            },

            {
              label: lang?.items.CREATEDAT!,
              render: (item) => formatDate(item.created_at!),
            },

            {
              label: "",
              render: (item) => (
                <ItemActions
                  item={item}
                  handleDelete={handleDelete}
                  handleSelectItem={handleSelectItem}
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

export default ItemTable;
