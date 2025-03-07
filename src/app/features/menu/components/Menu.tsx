"use client";
import { MouseEvent, useEffect, useState } from "react";
import Addmenu from "./Addmenu";
import { IMenudata, IModalData } from "../types/type";
import {  Center, Loader, Table } from "@mantine/core";
import BaseButton from "@/app/components/ui/BaseButton";
import { menu } from "../actions/addmenu-action";
import BaseTable from "@/app/components/ui/BaseTable";
import useMenuItem from "../hook/useMenuItem";
import deletemenu from "../actions/deletemenu-action";
import { useRouter } from "next/navigation";
import BaseConfirmation from "@/app/components/ui/BaseConfirmation";
import { useDisclosure } from "@mantine/hooks";

const menupage = () => {
  const [MenuItem, setMenuItem] = useState<IMenudata[]>();
  const [opened, { open, close }] = useDisclosure(false);
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
    if (addedItem) setMenuItem((prev) => prev?[...prev, addedItem] : [addedItem]);
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

  return (
    <div className="bg-[#fcf4e05e]">
      <div className="flex flex-row justify-between mt-10 px-2 mb-8">
        <h1 className="text-2xl  font-bold">Menus</h1>
        <Addmenu onAddMenu={handleAddMenu} />
      </div>
      {!MenuItem ? <Center><Loader color="indigo" /></Center> : 
      MenuItem?.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">
          No menus available. Click "Add New Menu" to create one.
        </p>
      ) : (
        <BaseTable highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>MENU NAME</Table.Th>
              <Table.Th>AVAILABILITY</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {MenuItem?.map((item) => (
              <Table.Tr key={item.id} onClick={() => handleView(item.menu_name!)}>
                <Table.Td>
                  {item.menu_name}({item.currency})
                </Table.Td>
                <Table.Td>{item.status}</Table.Td>
                <Table.Td>
                  <BaseButton
                    className="h-12 w-1/4"
                    classNames={{ inner: "font-sm text-white" }}
                    onClick={() => handleView(item.menu_name!)}
                  >
                    View
                  </BaseButton>
                </Table.Td>
                <Table.Td>
                  <BaseConfirmation
                    confirmationbutton="Delete"
                    opened={opened}
                    onClose={close}
                    className="h-12 w-1/4"
                    text="Are you sure want to delete item?"
                  >
                    <BaseButton
                      onClick={(event) => handleDelete(item.id, event)}
                      classNames={{ root: "w-1/3 mt-6 " }}
                    >
                      {loading === item.id ? <Loader size={23} /> : "Delete"}
                    </BaseButton>
                  </BaseConfirmation>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </BaseTable>
      )}
    
    </div>
  );
};

export default menupage;
