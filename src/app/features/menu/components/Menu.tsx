"use client";
import { MouseEvent, useEffect, useState } from "react";
import Addmenu from "./Addmenu";
import { IMenudata, IModalData } from "../types/type";
import { Box, Center, Loader, LoadingOverlay, Table } from "@mantine/core";
import BaseButton from "@/app/components/ui/BaseButton";
import { menu } from "../actions/addmenu-action";
import BaseTable from "@/app/components/ui/BaseTable";
import useMenuItem from "../hook/useMenuItem";
import deletemenu from "../actions/deletemenu-action";
import { useRouter } from "next/navigation";
import BaseConfirmation from "@/app/components/ui/BaseConfirmation";
import { useDisclosure } from "@mantine/hooks";
import { updateMenu } from "../actions/updatemenu-action";
import { BiCategory } from "react-icons/bi";
import { notifications } from "@mantine/notifications";
import { MdOutlineModeEdit } from "react-icons/md";
import CustomBreadcrumbs from "@/app/components/ui/BaseBreadcrumbs";
import { CgMenuBoxed } from "react-icons/cg";

const menupage = () => {
  const [MenuItem, setMenuItem] = useState<IMenudata[]>();
  const [selectedMenu, setSelectedMenu] = useState<IModalData | null>(null);
  const [opened, { close }] = useDisclosure(false);
  const [visible, { toggle }] = useDisclosure(true);
  const [loading, setLoading] = useState("");
  const router = useRouter();
  const data = useMenuItem();
  console.log(data);
  useEffect(() => {
    if (data) {
      setMenuItem(data);
    }
  }, [data]);

  const handleAddMenu = async (newItem: IModalData) => {
    const addedItem = await menu(newItem);
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

  const handleView = (menu_name: string) => {
    router.push(`/menu/${menu_name}`);
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

  const item = [{ title: "Menus", icon: <CgMenuBoxed />, href: "/menu" }];

  return (
    <div className="bg-[#f9eed164] h-screen ">
      <CustomBreadcrumbs items={item} children={undefined}></CustomBreadcrumbs>
      <div className="flex flex-row justify-between pt-10 px-2 pb-8">
        <h1 className="text-2xl  font-bold">Menus</h1>
        <Addmenu
          onAddMenu={handleAddMenu}
          onEditMenu={handleEditMenu}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
      </div>
      {!MenuItem ? (
        <Center>
          <Loader color="blue" type="dots" />
        </Center>
      ) : MenuItem?.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">
          No menus available. Click "Add New Menu" to create one.
        </p>
      ) : (
        <div className="flex justify-self-center w-11/12">
          <BaseTable highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>MENU NAME</Table.Th>
                <Table.Th>AVAILABILITY</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {MenuItem?.map((item) => (
                <Table.Tr key={item.id}>
                  <Table.Td>
                    {item.menu_name} ({item.currency})
                  </Table.Td>
                  <Table.Td>{item.status}</Table.Td>
                  <Table.Td>
                    <div onClick={() => handleView(item.menu_name!)}>
                      <BiCategory size={28} color="#527ad1" />
                    </div>
                  </Table.Td>
                  <Table.Td>
                    <div onClick={() => handleSelectMenu(item)}>
                      <MdOutlineModeEdit size={28} color="#f2cc50" />
                    </div>
                  </Table.Td>
                  <Table.Td>
                    <BaseConfirmation
                      intent="danger"
                      opened={opened}
                      onClose={close}
                      text="Are you sure you want to delete this item?"
                    >
                      <BaseButton
                        intent="danger"
                        onClick={(event) => handleDelete(item.id, event)}
                        classNames={{ root: "w-1/3 mt-6" }}
                      >
                        {loading === item.id ? <Loader size={23} /> : "Delete"}
                      </BaseButton>
                    </BaseConfirmation>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </BaseTable>
        </div>
      )}
    </div>
  );
};

export default menupage;
