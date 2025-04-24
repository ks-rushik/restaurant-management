"use client";
import { z } from "zod";
import FormGroup from "@/app/components/forms/AuthFormGroup";
import FormField from "@/app/components/forms/FormField";
import BaseInput from "@/app/components/ui/BaseInput";
import BaseButton from "@/app/components/ui/BaseButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signUp } from "../../actions/auth/signup-action";
import { notifications } from "@mantine/notifications";
import { redirect } from "next/navigation";

const SignUpSchema = z
  .object({
    name: z.string().min(4, { message: "At least 4 characters long" }),
    email: z.string().min(1, "Email is Required").email("Invalid email format"),
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

export type ISignUpFormData = z.infer<typeof SignUpSchema>;

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ISignUpFormData>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data: ISignUpFormData) => {
    const { message, error } = await signUp(data);
    console.log(error, "error");
    {
      error && notifications.show({ message: error, color: "red" });
    }
    {
      message && notifications.show({ message: message, color: "green" });
      redirect('/auth/login')
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <h2 className="text-3xl font-bold mb-8">Sign Up</h2>
          <FormField
            label="Name"
            name="name"
            error={errors.name?.message}
            required={true}
          >
            <BaseInput
              {...register("name")}
              type="text"
              placeholder="Enter your name..."
              name="name"
            />
          </FormField>
          <FormField
            label="Email"
            name="email"
            error={errors.email?.message}
            required={true}
          >
            <BaseInput
              {...register("email")}
              type="email"
              placeholder="Enter your email..."
              name="email"
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
            classNames={{
              root: "mb-2 w-full py-2 rounded-md h-12",
              inner: "font-bold text-white text-sm",
            }}
            loading={isSubmitting}
          >
            Sign Up
          </BaseButton>
          <div className="flex gap-2 justify-end mb-4 mt-6 text-[#737373] text-md  font-medium">
            <span> Already have an account?</span>
            <Link
              href="/auth/login"
              className="text-[#171717] font-bold  hover:underline"
            >
              Login
            </Link>
          </div>
        </FormGroup>
      </form>
    </>
  );
};

export default SignUpForm;
