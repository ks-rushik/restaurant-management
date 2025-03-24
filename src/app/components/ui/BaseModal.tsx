import { Modal, ModalProps, ModalStylesNames } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";

type IBaseModalProps = ModalProps & {
  classNames?: Partial<Record<ModalStylesNames, string>> | undefined;
};

const BaseModal: FC<IBaseModalProps> = (props) => {
  const { classNames, ...other } = props;
  const { title, content, ...otherElement } = classNames || {};
  return (
    <>
      <Modal
        classNames={{
          content: clsx("rounded-2xl ", content),
          title: clsx("text-black text-xl font-bold", title),
          ...otherElement,
        }}
        size='32.5rem'
        {...other}
      ></Modal>
    </>
  );
};

export default BaseModal;
