"use client";
import { MouseEvent, useEffect, useState } from "react";
import Addmenu from "./AddMenuModal";
import { IMenudata, IModalData } from "../../type/type";
import { menu } from "../../actions/menu/addmenu-action";
import useMenuItem from "../../hooks/useMenuItem";
import deletemenu from "../../actions/menu/deletemenu-action";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { updateMenu } from "../../actions/menu/updatemenu-action";
import { notifications } from "@mantine/notifications";
import MenuHeader from "./MenuHeader";
import MenuTable from "./MenuTable";
import { useDebounce } from "use-debounce";

const Menupage = () => {
  const [MenuItem, setMenuItem] = useState<IMenudata[]>();
  const [selectedMenu, setSelectedMenu] = useState<IModalData | null>(null);
  const [opened, { close }] = useDisclosure(false);
  const [loading, setLoading] = useState("");
  const [searchData, setSearchData] = useState("");
  const [debouncedSearch] = useDebounce(searchData, 500);
  const [filterStatus, setFilterStatus] = useState<string>("");
  const router = useRouter();
  const data = useMenuItem(debouncedSearch, filterStatus);
  useEffect(() => {
    if (data) {
      setMenuItem(data);
    }
  }, [data]);

  const handleAddMenu = async (newItem: IModalData) => {
    const addedItem = await menu(newItem);
    notifications.show({
      message: `${newItem.menu_name} added to menus`,
      color: "green",
    });
    if (addedItem)
      setMenuItem((prev) => (prev ? [...prev, addedItem] : [addedItem]));
  };

  const handleEditMenu = async (updatedmenu: IModalData) => {
    await updateMenu(updatedmenu);
    notifications.show({ message: "Menu updated", color: "green" });
  };

  const handleDelete = async (
    id: string,
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.stopPropagation();
    setMenuItem((prev) => prev?.filter((item) => item.id !== id));
    setLoading(id);
    await deletemenu(id);
    setLoading("");
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
        data={MenuItem}
        handleView={handleView}
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
