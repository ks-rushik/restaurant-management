"use client";

import { FC, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useDisclosure } from "@mantine/hooks";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { IMessages } from "@/app/[locale]/messages";
import FormField from "@/app/components/forms/FormField";
import BaseButton from "@/app/components/ui/BaseButton";
import BaseInput from "@/app/components/ui/BaseInput";
import BaseModal from "@/app/components/ui/BaseModal";
import BaseSelect from "@/app/components/ui/BaseSelect";
import { Availablity } from "@/app/constants/common";
import { IModalData } from "@/app/type/type";
import validation from "@/app/utils/validation";

export type IMenuModalProps = {
  onAddMenu: (data: IModalData) => Promise<void>;
  onEditMenu: (data: IModalData) => Promise<void>;
  selectedMenu?: IModalData | null;
  setSelectedMenu: (menu: IModalData | null) => void;
  lang?: IMessages;
};

const Addmenu: FC<IMenuModalProps> = ({
  onAddMenu,
  onEditMenu,
  selectedMenu,
  setSelectedMenu,
  lang,
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  const AddMenuSchema = z.object({
    menu_name: z
      .string()
      .nonempty(validation(lang?.menus.menuname!, "required", lang)),
    currency: z.enum(["$", "₹", "€", "¥"], {
      errorMap: () => validation(lang?.menus.currency!, "required", lang),
    }),
    status: z.enum([Availablity.Available, Availablity.NotAvailable], {
      errorMap: () => validation(lang?.menus.status!, "required", lang),
    }),
  });

  type IAddMenuData = z.infer<typeof AddMenuSchema>;

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
    reset,
  } = useForm<IAddMenuData>({
    resolver: zodResolver(AddMenuSchema),
    defaultValues: { menu_name: "", currency: undefined, status: undefined },
  });

  useEffect(() => {
    if (selectedMenu) {
      reset({
        menu_name: selectedMenu.menu_name,
        currency: selectedMenu.currency as "$" | "₹" | "€" | "¥",
        status: selectedMenu.status as keyof typeof Availablity,
      });
      open();
    } else {
      reset({
        menu_name: "",
        currency: "" as "$" | "₹" | "€" | "¥",
        status: "" as keyof typeof Availablity,
      });
    }
  }, [selectedMenu, reset, open]);

  const onSubmit = async (data: IAddMenuData) => {
    if (selectedMenu) {
      const updatedItem = { ...selectedMenu, ...data };
      await onEditMenu(updatedItem);
    } else {
      await onAddMenu(data);
    }
    close();
    setSelectedMenu(null);
    reset({ menu_name: "", currency: undefined, status: undefined });
  };

  const handleClose = () => {
    close();
    setSelectedMenu(null);
    reset({ menu_name: "", currency: undefined, status: undefined });
  };

  return (
    <>
      <BaseModal
        opened={opened}
        onClose={handleClose}
        title={selectedMenu ? lang?.menus.editmenu : lang?.menus.modaltitle}
        padding="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField name="menu_name" error={errors.menu_name?.message}>
            <BaseInput
              type="text"
              label={lang?.menus.menuname}
              forceLabelOnTop
              placeholder={lang?.menus.menunameplaceholder}
              {...register("menu_name")}
            />
          </FormField>
          <FormField name="currency" error={errors.currency?.message}>
            <Controller
              name="currency"
              control={control}
              render={({ field }) => (
                <BaseSelect
                  label={lang?.menus.currency}
                  labelvalue
                  placeholder={lang?.menus.currencyplaceholder}
                  {...field}
                  classNames={{ dropdown: "" }}
                  data={["$", "₹", "€", "¥"]}
                />
              )}
            />
          </FormField>
          <FormField name="status" error={errors.status?.message}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <BaseSelect
                  label={lang?.menus.status}
                  labelvalue
                  data={[
                    {
                      label: lang?.availableStatus.available!,
                      value: Availablity.Available,
                    },
                    {
                      label: lang?.availableStatus.notAvailable!,
                      value: Availablity.NotAvailable,
                    },
                  ]}
                  placeholder={lang?.menus.statusplaceholder}
                  {...field}
                />
              )}
            />
          </FormField>

          <BaseButton
            type="submit"
            loading={isSubmitting}
            classNames={{
              root: "h-12 w-full rounded-xl",
              inner: "font-bold text-white text-sm",
            }}
          >
            {lang?.menus.submitbutton}
          </BaseButton>
        </form>
      </BaseModal>

      <BaseButton
        onClick={() => {
          setSelectedMenu(null);
          open();
        }}
        classNames={{
          root: "h-12 rounded-md",
          inner: "font-bold text-white text-md",
        }}
      >
        {lang?.menus.button}
      </BaseButton>
    </>
  );
};
export default Addmenu;
