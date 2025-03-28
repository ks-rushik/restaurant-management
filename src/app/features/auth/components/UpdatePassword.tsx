"use client";
import { z } from "zod";
import FormGroup from "@/app/components/forms/FormGroup";
import FormField from "@/app/components/forms/FormField";
import BaseInput from "@/app/components/ui/BaseInput";
import BaseButton from "@/app/components/ui/BaseButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePassword } from "../actions/updatepassword-action";
import { Title } from "@mantine/core";

const ResetPasswordSchema = z
  .object({
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
