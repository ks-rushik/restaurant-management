"use client";
import { MouseEvent, useEffect, useState } from "react";
import Addmenu from "./AddMenuModal";
import { IMenudata, IModalData } from "../../features/menu/types/type";
import { menu } from "../../features/menu/actions/addmenu-action";
import useMenuItem from "../../features/menu/hook/useMenuItem";
import deletemenu from "../../features/menu/actions/deletemenu-action";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { updateMenu } from "../../features/menu/actions/updatemenu-action";
import { notifications } from "@mantine/notifications";
import MenuHeader from "./MenuHeader";
import MenuTable from "./MenuTable";

const menupage = () => {
  const [MenuItem, setMenuItem] = useState<IMenudata[]>();
  const [selectedMenu, setSelectedMenu] = useState<IModalData | null>(null);
  const [opened, { close }] = useDisclosure(false);
  const [loading, setLoading] = useState("");
  const router = useRouter();
  const data = useMenuItem();
  useEffect(() => {
    if (data) {
      setMenuItem(data);
    }
  }, [data]);

  const handleAddMenu = async (newItem: IModalData) => {
    const addedItem = await menu(newItem);
    notifications.show({message:`${newItem.menu_name} added to menus`})
    if (addedItem)
      setMenuItem((prev) => (prev ? [...prev, addedItem] : [addedItem]));
  };

  const handleEditMenu = async (updatedmenu: IModalData) => {
    await updateMenu(updatedmenu);
    notifications.show({ message: "Menu updated" });
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

  const handleView = (menu_name: string ,id:string) => {
    router.push(`/menu/${id}?name=${menu_name}`);
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
    <div className="items-center px-4 sm:px-12 md:px-16 lg:px-20 xl:px-32">
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
      />
    </div>
  );
};

export default menupage;
