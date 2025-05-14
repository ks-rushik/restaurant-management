"use client";

import Link from "next/link";
import { FC } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Text, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { IMessages } from "@/app/[locale]/messages";
import FormGroup from "@/app/components/forms/AuthFormGroup";
import FormField from "@/app/components/forms/FormField";
import BaseButton from "@/app/components/ui/BaseButton";
import BaseInput from "@/app/components/ui/BaseInput";
import { ErrorMessages } from "@/app/utils/authvalidation";

import { resetPassword } from "../../actions/auth/resetpassword-action";
import LanguageSelectorWrapper from "../LanguageSelectorWrapper";
import LanguageSelector from "./LanguageSelector";

export type IResetPasswordFormProps = {
  lang?: IMessages;
};

const ResetPasswordForm: FC<IResetPasswordFormProps> = (props) => {
  const { lang } = props;
  const resetPasswordSchema = z.object({
    email: z
      .string()
      .nonempty(lang?.authvalidation.required)
      .email(lang?.authvalidation.email),
  });

  type IResetPasswordData = z.infer<typeof resetPasswordSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: IResetPasswordData) => {
    const { message } = await resetPassword(data.email);
    notifications.show({ message: message });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <FormGroup>
          <LanguageSelectorWrapper>
            <LanguageSelector />
          </LanguageSelectorWrapper>
          <Title order={2} ta="center" mt="lg" mb={50}>
            {lang?.forgotpassword.title}
          </Title>
          <Text size="md" className="pt-2 pr-2 pb-8">
            {lang?.forgotpassword.description}
          </Text>

          <FormField
            label={lang?.forgotpassword.email}
            name="email"
            error={errors.email?.message}
            required={true}
          >
            <BaseInput
              {...register("email")}
              type="email"
              name="email"
              placeholder={lang?.forgotpassword.emailplaceholder}
            />
          </FormField>
          <div className="flex flex-col sm:flex-row sm:justify-between  text-md mb-4 text-center sm:text-left">
            <BaseButton
              type="submit"
              classNames={{
                root: "mb-2 w-full py-2 rounded-md md:w-1/2 h-12 sm:w-1/3",
                inner: "font-bold text-white text-sm",
              }}
              loading={isSubmitting}
            >
              {lang?.forgotpassword.enteremail}
            </BaseButton>

            <Link
              href="/auth/login"
              className="mt-3  sm:justify-start opacity-50"
            >
              {lang?.forgotpassword.backtologin}
            </Link>
          </div>
        </FormGroup>
      </form>
    </>
  );
};

export default ResetPasswordForm;
