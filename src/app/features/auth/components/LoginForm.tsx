"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import FormGroup from "@/app/components/forms/AuthFormGroup";
import FormField from "@/app/components/forms/FormField";
import BaseInput from "@/app/components/ui/BaseInput";
import BaseButton from "@/app/components/ui/BaseButton";
import { login } from "../actions/login-action";
import { useState } from "react";
import { Title } from "@mantine/core";
const loginSchema = z.object({
  email: z.string().min(1, "Email is Required").email("Invalid email format"),
  password: z.string().min(1, "Password required"),
});

export type ILoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const [error, setError] = useState("");

  const onSubmit = async (data: ILoginFormData) => {
    const error = await login(data);
    if (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <FormGroup>
          <Title order={2}  ta="center" mt="lg" mb={50} >
          Welcome to Digidine!
        </Title>
          <FormField
            label="Email"
            name="email"
            error={errors.email?.message}
            required={true}
            size="md"
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
            size="md"
          >
            <BaseInput
              {...register("password")}
              type="password"
              name="password"
              placeholder="Enter your Password"
              classNames={{ input: "focus-within " }}
            />
          </FormField>
          <p className="text-red-500 mb-2">{error}</p>

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
          <div className="flex flex-col sm:flex-row sm:justify-between text-md mb-4 text-center sm:text-left">
            <Link href="/auth/resetpassword" className="mb-2 sm:mb-0">
              Forgot password?
            </Link>
            <div className="flex gap-1 justify-center sm:justify-end">
              <span>Not account yet?</span>
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
