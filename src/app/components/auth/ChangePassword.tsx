"use client";

import { useRouter } from "next/navigation";
import React, { FC, SetStateAction } from "react";

import FormField from "@components/forms/FormField";
import BaseButton from "@components/ui/BaseButton";
import BaseTextField from "@components/ui/BaseInput";
import BaseModal from "@components/ui/BaseModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { IMessages } from "@/app/[locale]/messages";
import changepassword from "@/app/actions/auth/changepassword-action";
import { ErrorMessages } from "@/app/utils/authvalidation";

type IChangePasswordProps = {
  modalopened: boolean;
  setModalOpened: (value: SetStateAction<boolean>) => void;
  lang?: IMessages;
};

const ChangePassword: FC<IChangePasswordProps> = (props) => {
  const { modalopened, setModalOpened, lang } = props;
  const ChanegPasswordSchema = z
    .object({
      oldpassword: z.string().min(1, "Old password required"),
      password: z
        .string()
        .min(8, { message: lang?.authvalidation.passwordLength })
        .regex(/[a-zA-Z]/, { message: lang?.authvalidation.letterRequired })
        .regex(/[0-9]/, { message: lang?.authvalidation.numberRequired })
        .regex(/[^a-zA-Z0-9]/, {
          message: lang?.authvalidation.specialCharRequired,
        }),
      confirmpassword: z
        .string()
        .min(8, { message: lang?.authvalidation.passwordLength }),
    })
    .refine((data) => data.password === data.confirmpassword, {
      message: lang?.authvalidation.passwordMismatch,
      path: ["confirmpassword"],
    });
  type IChangePasswordFormData = z.infer<typeof ChanegPasswordSchema>;

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
    }
    reset({ oldpassword: "", password: "", confirmpassword: "" });
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

  return (
    <BaseModal
      opened={modalopened}
      size={"md"}
      onClose={() => setModalOpened(false)}
      title={lang?.changepassword.title}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 pt-4 max-w-sm"
      >
        <FormField
          label={lang?.changepassword.oldpassword}
          name="oldpassword"
          error={errors.password?.message}
          required={true}
          size="md"
        >
          <BaseTextField
            {...register("oldpassword")}
            type="password"
            name="oldpassword"
            placeholder={lang?.changepassword.oldpasswordplaceholder}
          />
        </FormField>
        <FormField
          label={lang?.changepassword.password}
          name="password"
          error={errors.password?.message}
          required={true}
        >
          <BaseTextField
            {...register("password")}
            type="password"
            placeholder={lang?.changepassword.passwordplaceholder}
            name="password"
          />
        </FormField>
        <FormField
          label={lang?.changepassword.confirmpassword}
          name="confirmpassword"
          error={errors.confirmpassword?.message}
          required={true}
        >
          <BaseTextField
            type="password"
            {...register("confirmpassword")}
            placeholder={lang?.changepassword.passwordplaceholder}
          />
        </FormField>
        <BaseButton type="submit" loading={isSubmitting}>
          {isSubmitting ? "Updating..." : lang?.changepassword.title}
        </BaseButton>
      </form>
    </BaseModal>
  );
};

export default ChangePassword;
