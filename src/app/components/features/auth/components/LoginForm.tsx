"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import FormGroup from "@/app/components/forms/FormGroup";
import FormField from "@/app/components/forms/FormField";
import BaseInput from "@/app/components/ui/BaseInput";
import BaseButton from "@/app/components/ui/BaseButton";
const loginSchema = z.object({
  email: z.string().min(1, "Email is Required").email("Invalid email format"),
  password: z.string().min(1, "Password required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Login Data:", data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <FormGroup>
          <h1 className="flex flex-col items-center justify-center mb-10 text-xl">
            Login Form
          </h1>
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
          <FormField
            label="Password"
            name="password"
            error={errors.password?.message}
            required={true}
          >
            <BaseInput
              {...register("password")}
              type="password"
              name="password"
              placeholder="Enter your Password"
              classNames={{ input: "focus-within " }}
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
            Login
          </BaseButton>
          <div className="flex justify-between text-md mb-4">
            <Link href="/auth/reset-link">Forget password?</Link>
            <div className="flex gap-1 justify-end">
              <span>Don't have account?</span>
              <Link
                href="/auth/signup"
                className="text-blue-600 hover:underline"
              >
                SignUp
              </Link>
            </div>
          </div>
        </FormGroup>
      </form>
    </>
  );
};

export default LoginForm;
