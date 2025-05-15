"use client";

import Link from "next/link";
import { FC } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { IMessages } from "@/app/[locale]/messages";
import FormGroup from "@/app/components/forms/AuthFormGroup";
import FormField from "@/app/components/forms/FormField";
import BaseButton from "@/app/components/ui/BaseButton";
import BaseInput from "@/app/components/ui/BaseInput";
import { ErrorMessages } from "@/app/utils/authvalidation";

import { signUp } from "../../actions/auth/signup-action";
import LanguageSelectorWrapper from "../LanguageSelectorWrapper";
import LanguageSelector from "./LanguageSelector";

export type ISignUpFormProps = {
  lang?: IMessages;
};

const SignUpForm: FC<ISignUpFormProps> = (props) => {
  const { lang } = props;

  const SignUpSchema = z
    .object({
      name: z.string().min(4, { message: lang?.authvalidation.nameMinLength }),
      email: z
        .string()
        .nonempty(lang?.authvalidation.required)
        .email(lang?.authvalidation.email),
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

  type ISignUpFormData = z.infer<typeof SignUpSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ISignUpFormData>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data: ISignUpFormData) => {
    const { message, error } = await signUp(data);

    {
      error && notifications.show({ message: error, color: "red" });
    }
    {
      message && notifications.show({ message: message, color: "green" });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <LanguageSelectorWrapper>
            <LanguageSelector />
          </LanguageSelectorWrapper>
          <h2 className="text-3xl font-bold mb-8">{lang?.signup.title}</h2>
          <FormField
            label={lang?.signup.name}
            name="name"
            error={errors.name?.message}
            required={true}
          >
            <BaseInput
              {...register("name")}
              type="text"
              placeholder={lang?.signup.nameplaceholder}
              name="name"
            />
          </FormField>
          <FormField
            label={lang?.signup.email}
            name="email"
            error={errors.email?.message}
            required={true}
          >
            <BaseInput
              {...register("email")}
              type="email"
              placeholder={lang?.signup.emailplaceholder}
              name="email"
            />
          </FormField>
          <FormField
            label={lang?.signup.password}
            name="password"
            error={errors.password?.message}
            required={true}
          >
            <BaseInput
              {...register("password")}
              type="password"
              placeholder={lang?.signup.passwordplaceholder}
              name="password"
            />
          </FormField>
          <FormField
            label={lang?.signup.confirmpassword}
            name="confirmpassword"
            error={errors.confirmpassword?.message}
            required={true}
          >
            <BaseInput
              type="password"
              {...register("confirmpassword")}
              placeholder={lang?.signup.passwordplaceholder}
            />
          </FormField>
          <BaseButton
            type="submit"
            classNames={{
              root: "mb-2 w-full py-2 rounded-md h-12",
              inner: "font-bold text-white text-sm",
            }}
            loading={isSubmitting}
          >
            {lang?.signup.signupbutton}
          </BaseButton>
          <div className="flex gap-2 justify-end mb-4 mt-6 text-[#737373] text-md  font-medium">
            <span> {lang?.signup.alreadyaccount}</span>
            <Link
              href="/auth/login"
              className="text-[#171717] font-bold  hover:underline"
            >
              {lang?.signup.login}
            </Link>
          </div>
        </FormGroup>
      </form>
    </>
  );
};

export default SignUpForm;
