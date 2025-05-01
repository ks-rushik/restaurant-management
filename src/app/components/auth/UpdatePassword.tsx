"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Title } from "@mantine/core";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { updatePassword } from "@/app/actions/auth/updatepassword-action";
import FormField from "@/app/components/forms/FormField";
import FormGroup from "@/app/components/forms/FormGroup";
import BaseButton from "@/app/components/ui/BaseButton";
import BaseInput from "@/app/components/ui/BaseInput";
import { ErrorMessages } from "@/app/utils/authvalidation";

const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: ErrorMessages.passwordLength })
      .regex(/[a-zA-Z]/, { message: ErrorMessages.letterRequired })
      .regex(/[0-9]/, { message: ErrorMessages.numberRequired })
      .regex(/[^a-zA-Z0-9]/, {
        message: ErrorMessages.specialCharRequired,
      }),
    confirmpassword: z
      .string()
      .min(8, { message: ErrorMessages.passwordLength }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: ErrorMessages.passwordMismatch,
    path: ["confirmpassword"],
  });
export type IResetPasswordData = z.infer<typeof ResetPasswordSchema>;

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPasswordData>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit = (data: IResetPasswordData) => {
    console.log("SignUp Data:", data);
    return updatePassword(data.password);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Title order={2} ta="center" mt="lg" mb={50}>
            Reset password
          </Title>
          <FormField
            label="Password"
            name="password"
            error={errors.password?.message}
            required={true}
          >
            <BaseInput
              {...register("password")}
              type="password"
              placeholder="Enter your password..."
              name="password"
            />
          </FormField>

          <FormField
            label="Confirm Password"
            name="confirmpassword"
            error={errors.confirmpassword?.message}
            required={true}
          >
            <BaseInput
              type="password"
              {...register("confirmpassword")}
              placeholder="Enter your password..."
            />
          </FormField>

          <BaseButton
            type="submit"
            intent="primary"
            classNames={{
              root: "mb-2 w-full py-2 rounded-md",
            }}
          >
            Submit
          </BaseButton>
        </FormGroup>
      </form>
    </>
  );
};

export default ResetPassword;
