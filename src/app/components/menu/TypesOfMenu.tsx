import Image from "next/image";
import React, { FC, useState } from "react";

import BaseModal from "@components/ui/BaseModal";
import { notifications } from "@mantine/notifications";
import { RiShareLine } from "react-icons/ri";

import { IMessages } from "@/app/[locale]/messages";
import { Availablity } from "@/app/constants/common";
import categorymenu from "@/app/images/category-based-menu.png";
import itemmenu from "@/app/images/item-based-menu.png";
import { IMenudata } from "@/app/type/type";

import ShareMenu from "./ShareMenu";

type ITypesOfMenuProps = {
  item: IMenudata;
  lang?: IMessages;
};

const TypesOfMenu: FC<ITypesOfMenuProps> = (props) => {
  const { item, lang } = props;
  const [shareModalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    if (item.status !== Availablity.NotAvailable) {
      setModalOpen(true);
    }
    if (item.status === Availablity.NotAvailable)
      notifications.show({
        message: `${item.menu_name} is not active to share this menu active the status`,
      });
  };

  return (
    <>
      <button title="Share Menu">
        <RiShareLine
          size={22}
          onClick={handleClick}
          className=" hover:text-blue-500"
        />
      </button>
      <BaseModal
        opened={shareModalOpen}
        onClose={() => setModalOpen(false)}
        title={lang?.sharemenu.title}
        centered
      >
        <div className="flex justify-around py-10 gap-4">
          <div className="flex flex-col justify-center items-center ">
            <Image
              src={itemmenu}
              width={300}
              height={300}
              alt="Item-menu"
              className="h-56 pb-4"
            />
            <ShareMenu item={item} lang={lang} keyword="m" />
          </div>

          <div className="flex flex-col justify-center items-center ">
            <Image
              src={categorymenu}
              width={300}
              height={300}
              alt="Category-menu"
              className="h-56 pb-4"
            />
            <ShareMenu item={item} lang={lang} keyword="k" />
          </div>
        </div>
      </BaseModal>
    </>
  );
};

export default TypesOfMenu;
