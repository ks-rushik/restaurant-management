import React, { FC, useState } from "react";
import BaseModal from "../ui/BaseModal";
import BaseButton from "../ui/BaseButton";
import { IMenudata } from "@/app/type/type";
import { RiShareLine } from "react-icons/ri";

type ITypesOfMenuProps = {
  item: IMenudata;
};

const TypesOfMenu: FC<ITypesOfMenuProps> = (props) => {
  const { item } = props;
  const [shareModalOpen, setShareModalOpen] = useState(false);
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
        <RiShareLine size={22} onClick={() => setShareModalOpen(true)} className="mr-6 hover:text-blue-500" />
      </button>
      <BaseModal
        opened={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        title="Share Menu Link"
        centered
      >
        <div className="flex justify-around py-10">
          <BaseButton>Item Based Menu</BaseButton>
          <BaseButton>Category Based Menu</BaseButton>
        </div>
      </BaseModal>
    </>
  );
};

export default TypesOfMenu;
