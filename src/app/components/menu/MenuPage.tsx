"use client";

import { useRouter } from "next/navigation";
import { FC, MouseEvent, useEffect, useState } from "react";

import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import { IMessages } from "@/app/[locale]/messages";
import { menu } from "@/app/actions/menu/addmenu-action";
import deletemenu from "@/app/actions/menu/deletemenu-action";
import { fetchMenudataQuery } from "@/app/actions/menu/menufetchquery";
import { updateMenu } from "@/app/actions/menu/updatemenu-action";
import { IMenudata, IModalData } from "@/app/type/type";

import Addmenu from "./AddMenuModal";
import MenuHeader from "./MenuHeader";
import MenuTable from "./MenuTable";

export type ILanguageProps = {
  lang?: IMessages;
};

const Menupage: FC<ILanguageProps> = () => {
  const [menuItem, setMenuItem] = useState<IMenudata[]>();
  const [selectedMenu, setSelectedMenu] = useState<IModalData | null>(null);
  const [opened, { close }] = useDisclosure(false);
  const [loading, setLoading] = useState("");
  const [searchData, setSearchData] = useState("");
  const [debouncedSearch] = useDebounce(searchData, 500);
  const [filterStatus, setFilterStatus] = useState<string>("");
  const router = useRouter();
  const {
    data: alldata,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(fetchMenudataQuery(debouncedSearch, filterStatus));
  const paginationProps = {
    fetchNextPage,
    hasNextPage,
  };

  const data = alldata?.pages.flat();

  useEffect(() => {
    if (data) {
      setMenuItem(data);
    }
  }, [alldata]);

  const handleAddMenu = async (newItem: IModalData) => {
    const addedItem = await menu(newItem); 
    if (addedItem)
      setMenuItem((prev) => (prev ? [...prev, addedItem] : [addedItem]));
    notifications.show({
      message: `${newItem.menu_name} added to menus`,
      color: "green",
    });
  };

  const handleEditMenu = async (updatedmenu: IModalData) => {
    await updateMenu(updatedmenu);
    notifications.show({ message: "Menu updated", color: "green" });
  };

  const handleDelete = async (
    id: string,
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    event.stopPropagation();
    setLoading(id);
    const { error } = await deletemenu(id);
    setLoading("");
    if (error) return;
    const filterdata = menuItem?.filter((item) => item.id !== id);
    setMenuItem(filterdata);
  };

  const handleView = (menu_name: string, id: string) => {
    router.push(`/menu/${id}`);
  };

  const handleSelectMenu = (item: IMenudata) => {
    const modaldata: IModalData = {
      id: item.id || "",
      menu_name: item.menu_name || "",
      currency: item.currency || "",
      status: item.status || "",
    };
    setSelectedMenu(modaldata);
  };

  return (
    <div className="items-center px-4 pb-10 sm:px-12 md:px-16 lg:px-20 xl:px-32">
      <MenuHeader>
        <Addmenu
          onAddMenu={handleAddMenu}
          onEditMenu={handleEditMenu}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
      </MenuHeader>
      <MenuTable
        data={menuItem}
        handleView={handleView}
        pagination={paginationProps}
        handleSelectMenu={handleSelectMenu}
        handleDelete={handleDelete}
        loading={loading}
        opened={opened}
        close={close}
        searchData={searchData}
        setSearchData={setSearchData}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />
    </div>
  );
};

export default Menupage;
