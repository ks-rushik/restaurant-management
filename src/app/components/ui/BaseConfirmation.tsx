import { FC, ReactNode } from "react";

import { Modal, ModalProps, ModalStylesNames } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import clsx from "clsx";

import BaseButton, { IBaseButtonProps } from "./BaseButton";

type IBaseConfirmationProps = ModalProps & {
  classNames?: Partial<Record<ModalStylesNames, string>> | undefined;
} & {
  text: string;
  btnProps?: IBaseButtonProps;
  children: ReactNode;
};
const BaseConfirmation: FC<IBaseConfirmationProps> = (props) => {
  const { text, children, classNames, btnProps } = props;
  const { title, content, header, ...otherElement } = classNames || {};
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Confirm action"
        size={"md"}
        classNames={{
          header: clsx("bg-white dark:bg-gray-700 dark:text-white ", header),
          content: clsx(
            "rounded-2xl dark:bg-gray-700 dark:text-white ",
            content,
          ),
          title: clsx("text-black text-xl font-bold dark:text-white ", title),
          ...otherElement,
        }}
      >
        <div className="flex flex-col">
          {text}
          <BaseButton
            classNames={{ root: "w-1/3 mt-6 " }}
            {...btnProps}
          ></BaseButton>
        </div>
      </Modal>
      <div onClick={open}>{children}</div>
    </>
  );
};
export default BaseConfirmation;
