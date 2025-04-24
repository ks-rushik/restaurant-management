"use client";
import React, { FC, SetStateAction } from "react";
import BaseTextField from "../ui/BaseInput";
import BaseButton from "../ui/BaseButton";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../forms/FormField";
import changepassword from "@/app/actions/auth/changepassword-action";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { useRouter } from "next/navigation";
import BaseModal from "../ui/BaseModal";

const ChanegPasswordSchema = z
  .object({
    oldpassword: z.string().min(1, "Old password required"),
    password: z
      .string()
      .min(8, { message: "At least 8 characters long" })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
      .regex(/[0-9]/, { message: "Contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character.",
      }),
    confirmpassword: z
      .string()
      .min(8, { message: "At least 8 characters long" }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords don't match",
    path: ["confirmpassword"],
  });
export type IChangePasswordFormData = z.infer<typeof ChanegPasswordSchema>;

type IChangePasswordProps = {
  modalopened: boolean;
  setModalOpened: (value: SetStateAction<boolean>) => void;
};

const ChangePassword: FC<IChangePasswordProps> = (props) => {
  const { modalopened, setModalOpened } = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IChangePasswordFormData>({
    resolver: zodResolver(ChanegPasswordSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: IChangePasswordFormData) => {
    const { message, error } = await changepassword(data);
    {
      error && notifications.show({ message: error, color: "red" });
    }
    {
      message && notifications.show({ message: message, color: "green" });
    }
    if (message) {
      setModalOpened(false);
      reset({ oldpassword: "", password: "", confirmpassword: "" });
    }

    {
      message &&
        modals.openConfirmModal({
          title: "Confirmation",
          overlayProps: {
            opacity: 1.8,
          },
          children: <p>Do you want to login again or stay here?</p>,
          labels: { confirm: "Go to Login", cancel: "Stay Login" },
          confirmProps: { color: "blue" },
          onConfirm: () => {
            router.push("/auth/login");
          },
        });
    }
  };
  const handleClose = () => {
    setModalOpened(false);
    reset({ oldpassword: "", password: "", confirmpassword: "" });
  };

  return (
    <BaseModal
      opened={modalopened}
      size={"md"}
      onClose={handleClose}
      title="Change Password"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        
      >
        <FormField name="oldpassword" error={errors.password?.message}>
          <BaseTextField
            {...register("oldpassword")}
            label="Old Password"
            type="password"
            name="oldpassword"
            forceLabelOnTop
          />
        </FormField>
        <FormField name="password" error={errors.password?.message}>
          <BaseTextField
            {...register("password")}
            label="Password"
            type="password"
            name="password"
            forceLabelOnTop
          />
        </FormField>
        <FormField
          name="confirmpassword"
          error={errors.confirmpassword?.message}
        >
          <BaseTextField
            type="password"
            label="Confirm Password"
            forceLabelOnTop
            {...register("confirmpassword")}
          />
        </FormField>
        <BaseButton
          type="submit"
          loading={isSubmitting}
          classNames={{ root: "w-full h-12 mt-4" }}
        >
          {isSubmitting ? "Updating..." : "Change Password"}
        </BaseButton>
      </form>
    </BaseModal>
  );
};

export default ChangePassword;
