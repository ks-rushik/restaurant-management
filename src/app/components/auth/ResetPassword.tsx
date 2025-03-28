"use client";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormGroup from "@/app/components/forms/AuthFormGroup";
import FormField from "@/app/components/forms/FormField";
import BaseInput from "@/app/components/ui/BaseInput";
import BaseButton from "@/app/components/ui/BaseButton";
import { resetPassword } from "../../actions/auth/resetpassword-action";
import { Text, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import Link from "next/link";

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

  const onSubmit = async(data: IResetPasswordData) => {
    const {message} = await resetPassword(data.email);
    notifications.show({ message: message });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <FormGroup>
          <Title order={2} ta="center" mt="lg" mb={50}>
            Password recovery
          </Title>
          <Text size="md" className="pt-2 pr-2 pb-8">
            Enter your registered email address. We'll send you a link or code
            to reset your password.
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
          <div className="flex flex-col sm:flex-row sm:justify-between  text-md mb-4 text-center sm:text-left">
            <BaseButton
              type="submit"
              intent="primary"
              classNames={{
                root: "mb-2 w-full py-2 rounded-md md:w-1/2 h-12 sm:w-1/3",
                inner:'font-bold text-white text-sm'
              }}
              loading={isSubmitting}
            >
              Enter Email
            </BaseButton>

            <Link
              href="/auth/login"
              className="mt-3  sm:justify-start opacity-50"
            >
              Back to the login
            </Link>
          </div>
        </FormGroup>
      </form>
    </>
  );
};

export default ResetPasswordForm;
