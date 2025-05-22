import Image from "next/legacy/image";
import { FC, useState } from "react";

import SearchFilter from "@components/SearchFilter";
import SearchInput from "@components/SearchInput";
import { useDictionary } from "@components/context/Dictionary";
import { DraggableLocation } from "@hello-pangea/dnd";
import { Badge } from "@mantine/core";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { FaDownLong, FaUpLong } from "react-icons/fa6";
import { LuFilter } from "react-icons/lu";

import { IMessages } from "@/app/[locale]/messages";
import updateOrder from "@/app/actions/order/update-order";
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
  handleSelectItem: (item: IItemdata) => void;
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
  pagination: {
    fetchNextPage: (
      options?: FetchNextPageOptions,
    ) => Promise<
      InfiniteQueryObserverResult<
        InfiniteData<{ data: IItemdata[]; count: number | null }, unknown>,
        Error
      >
    >;
    hasNextPage: boolean;
  };
};

const ItemTable: FC<ICategoryTableProps> = (props) => {
  const {
    data,
    handleDelete,
    handleSelectItem,
    loading,
    opened,
    pagination,
    close,
    searchData,
    setSearchData,
    filters,
    setFilters,
  } = props;
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const lang = useDictionary();

  const handledrag = async (state: IItemdata[]) => {
    const isNotChange = state.every((item, index) => item.position === index);
    if (isNotChange) return;
    await updateOrder(state, "Items");
  };
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
            th: "[&:first-child]:!min-w-[70px] [&:first-child]:!w-[70px]",
            td: "[&:first-child]:!min-w-[70px] [&:first-child]:!w-[70px]",
          }}
          pagination={pagination}
          DragOn={handledrag}
          data={data}
          getKey={(item) => item.id!}
          drag
          columns={[
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
