import React, { FC, useState } from "react";
import BaseModal from "@components/ui/BaseModal";
import { IMenudata } from "@/app/type/type";
import { RiShareLine } from "react-icons/ri";
import ShareMenu from "./ShareMenu";
import CategoryBasedMenu from "./CategoryBasedMenu";
import itemmenu from '@/app/images/item-based-menu.png'
import categorymenu from "@/app/images/category-based-menu.png";
import Image from "next/image";

type ITypesOfMenuProps = {
  item: IMenudata;
};

const TypesOfMenu: FC<ITypesOfMenuProps> = (props) => {
  const { item } = props;
  const [shareModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          if (item.status !== "Not Available") {
          } else {
          }
        }}
        title="Share Menu"
      >
        <RiShareLine
          size={22}
          onClick={() => setModalOpen(true)}
          className="mr-6 hover:text-blue-500"
        />
      </button>
      <BaseModal
        opened={shareModalOpen}
        onClose={() => setModalOpen(false)}
        title="Share Menu Link"
        centered
      >
        <div className="flex justify-around py-10 gap-4">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src={itemmenu} width={300} height={300} alt="Item-menu" className="h-56" />
            <ShareMenu item={item} />
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src={categorymenu}
              width={300}
              height={300}
              alt="Category-menu"
              className="h-56"
            />
            <CategoryBasedMenu item={item} />
          </div>
        </div>
      </BaseModal>
    </>
  );
};

export default TypesOfMenu;
