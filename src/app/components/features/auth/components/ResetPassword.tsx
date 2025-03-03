"use client";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormGroup from "@/app/components/forms/FormGroup";
import FormField from "@/app/components/forms/FormField";
import BaseInput from "@/app/components/ui/BaseInput";
import BaseButton from "@/app/components/ui/BaseButton";
import { resetPassword } from "../actions/resetpassword-action";
import { Text } from "@mantine/core";

const resetPasswordSchema = z.object({
  email: z.string().min(1, "Email is Required").email("Invalid email format"),
});

export type IResetPasswordData = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: IResetPasswordData) => {
    console.log("Login Data:", data);
    return resetPassword(data.email);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <FormGroup >
          <h1 className="flex flex-col items-center justify-center mb-10 text-xl">
            Password Recovery
          </h1>
          <Text size="md" className="pt-2 pr-2 pb-8">
            Enter your registered email address. We'll send you a link or code to reset your password.
          </Text>

          <FormField
            label="Email"
            name="email"
            error={errors.email?.message}
            required={true}
          >
            <BaseInput
              {...register("email")}
              type="email"
              name="email"
              placeholder="Enter your email..."
            />
          </FormField>
          <BaseButton
            type="submit"
            intent="primary"
            classNames={{
              root: "mb-2 w-full py-2 rounded-md",
            }}
            loading={isSubmitting}
          >
            Enter Email
          </BaseButton>
        </FormGroup>
      </form>
    </>
  );
};

export default ResetPasswordForm;
