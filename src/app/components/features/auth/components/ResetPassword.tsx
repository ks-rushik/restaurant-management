"use client";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormGroup from "@/app/components/forms/FormGroup";
import FormField from "@/app/components/forms/FormField";
import BaseInput from "@/app/components/ui/BaseInput";
import BaseButton from "@/app/components/ui/BaseButton";
import { resetPassword } from "../actions/resetpassword-action";

const resetPasswordSchema = z.object({
  email: z.string()
    .min(1, "Email is Required")
    .email("Invalid email format"),
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
    return resetPassword(data.email)
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <FormGroup>
          <h1 className="flex flex-col items-center justify-center mb-10 text-xl">
            Password Recovery
          </h1>
          <FormField label="Email" name="email" error={errors.email?.message} required={true}>
            <BaseInput
              {...register("email")}
              type="email"
              name="email"
              placeholder="Enter your email..."
             
            />
          </FormField>
          <BaseButton
            type="submit"
            intent="success"
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