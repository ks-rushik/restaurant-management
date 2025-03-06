"use client";
import FormField from "@/app/components/forms/FormField";
import BaseButton from "@/app/components/ui/BaseButton";
import BaseInput from "@/app/components/ui/BaseInput";
import BaseSelect from "@/app/components/ui/BaseSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Database } from "../../../../../database.types";
import { menu } from "../actions/addmenu-action";

export type IMenudata = Database["public"]["Tables"]["menus"]["Row"];

const addmenu = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const Addmenuschema = z.object({
    menu_name: z.string().min(1, "Menu name is required"),
    currency: z.string({ required_error: "currency is required" }),
    status: z.string({ required_error: "status is required" }),
  });

  type IAddmenudata = z.infer<typeof Addmenuschema>;

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IAddmenudata>({
    resolver: zodResolver(Addmenuschema),
  });

  const onSubmit = (data: IAddmenudata) => {
    menu(data)
    console.log(data);
  };

  return (
    <>
      <Modal opened={opened} onClose={close}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            label="Menu name"
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
            label="status"
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
          <BaseButton type="submit" onClick={close}>Submit</BaseButton>
        </form>
      </Modal>
      <BaseButton
        type="submit"
        onClick={open}
        classNames={{
          root: "h-12 rouded-md",
          inner: "font-bold text-white text-md",
        }}
      >
        Add new menu
      </BaseButton>
    </>
  );
};
export default addmenu;
