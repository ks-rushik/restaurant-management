"use client";
import FormField from "@/app/components/forms/FormField";
import BaseButton from "@/app/components/ui/BaseButton";
import BaseInput from "@/app/components/ui/BaseInput";
import BaseSelect from "@/app/components/ui/BaseSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDisclosure } from "@mantine/hooks";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import BaseModal from "@/app/components/ui/BaseModal";
import { FC, useEffect } from "react";
import { IModalData } from "../../type/type";

export type IMenuModalProps = {
  onAddMenu: (data: IModalData) => Promise<void>;
  onEditMenu: (data: IModalData) => Promise<void>;
  selectedMenu?: IModalData | null;
  setSelectedMenu: (menu: IModalData | null) => void;
};

const Addmenu: FC<IMenuModalProps> = ({
  onAddMenu,
  onEditMenu,
  selectedMenu,
  setSelectedMenu,
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  const AddMenuSchema = z.object({
    menu_name: z.string().min(1, "Menu name is required"),
    currency: z.enum(["$", "₹", "€", "¥"], {
      errorMap: () => ({ message: "Currency is required" }),
    }),
    status: z.enum(["Active", "InActive"], {
      errorMap: () => ({ message: "Status is required" }),
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
        status: selectedMenu.status as "Active" | "InActive",
      });
      open();
    } else {
      reset({ menu_name: "", currency: "" as "$" | "₹" | "€" | "¥", status: "" as "Active" | "InActive" });
    }
  }, [selectedMenu, reset]);

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
        title={selectedMenu ? "Edit Menu" : "Add Menu"}
        padding="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            label="Menu Name"
            name="menu_name"
            error={errors.menu_name?.message}
          >
            <BaseInput
              type="text"
              placeholder="Enter menu"
              {...register("menu_name")}
            />
          </FormField>
          <FormField
            label="Currency"
            name="currency"
            error={errors.currency?.message}
          >
            <Controller
              name="currency"
              control={control}
              render={({ field }) => (
                <BaseSelect
                  placeholder="Enter currency"
                  {...field}
                  data={["$", "₹", "€", "¥"]}
                />
              )}
            />
          </FormField>
          <FormField
            label="Status"
            name="status"
            error={errors.status?.message}
          >
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <BaseSelect
                  data={["Active", "InActive"]}
                  placeholder="Enter status"
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
            Submit
          </BaseButton>
        </form>
      </BaseModal>

      <BaseButton
        onClick={() => {
          setSelectedMenu(null)
          open();
        }}
        classNames={{
          root: "h-12 rounded-md",
          inner: "font-bold text-white text-md",
        }}
      >
        Add New Menu
      </BaseButton>
    </>
  );
};
export default Addmenu;
