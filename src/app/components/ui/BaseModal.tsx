import { Modal, ModalProps, ModalStylesNames } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";

type IBaseModalProps = ModalProps & {
  classNames?: Partial<Record<ModalStylesNames, string>> | undefined;
};

const BaseModal: FC<IBaseModalProps> = (props) => {
  const { classNames, ...other } = props;
  const { title, content,header,close , ...otherElement } = classNames || {};
  return (
    <>
      <Modal
        classNames={{
          close: clsx("text-red " ,close),
          header: clsx("bg-white dark:bg-gray-700 dark:text-white ",header),
          content: clsx("rounded-2xl dark:bg-gray-700 dark:text-white ", content),
          title: clsx("text-black text-xl font-bold dark:text-white ", title),
          ...otherElement,
        }}
        size='32.5rem'
        {...other}
      ></Modal>
    </>
  );
};

export default BaseModal;
