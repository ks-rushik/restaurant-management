"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Center, FileButton, Loader } from "@mantine/core";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useState } from "react";
import FormGroup from "@/app/components/forms/ProfileGroup";
import FormField from "@/app/components/forms/FormField";
import BaseInput from "@/app/components/ui/BaseInput";
import BaseButton from "@/app/components/ui/BaseButton";
import { submitUserForm } from "../../features/userprofile/actions/userprofile-action";
import { useUserProfile } from "../../features/userprofile/hook/useUserProfile";
import BaseTextArea from "@/app/components/ui/BaseTextArea";
import { notifications } from "@mantine/notifications";
import { ImSpoonKnife } from "react-icons/im";
import { useRouter } from "next/navigation";

export const userformSchema = z.object({
  name: z.string().min(1, "Name is Required"),
  phone: z
    .string()
    .min(1, "Contact number is required")
    .length(10, "Number is not valid"),
  address: z.string().min(9, "At least 9 characters long"),
});

export type IUserFormData = z.infer<typeof userformSchema>;

const UserProfileForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { data: userData, isLoading, error } = useUserProfile();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUserFormData>({
    resolver: zodResolver(userformSchema),
  });

  if (userData?.logo && !preview) {
    setPreview(userData.logo);
  }

  if (isLoading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader color="blue" />
      </Center>
    );
  }
  if (error) return <p>Error: {error.message}</p>;

  const handleFileChange = (newFile: File | null) => {
    setFile(newFile);
    if (newFile) {
      setPreview(URL.createObjectURL(newFile));
    }
  };

  const onSubmit = async (data: IUserFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    if (file) formData.append("logo", file);
    const { message } = await submitUserForm(formData);
    notifications.show({ message: message });
  };
  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <FormGroup>
          <h2 className="text-3xl font-bold mb-10">My profile</h2>
          <Avatar
            src={preview}
            alt="Uploaded Logo"
            variant="filled"
            size={"xl"}
            className="mb-4 w-48 h-48"
          >
            <ImSpoonKnife />
          </Avatar>

          <FileButton onChange={handleFileChange} accept="image/png,image/jpeg">
            {(props) => (
              <BaseButton {...props} classNames={{ root: "mb-10 mt-4 ml-4" }}>
                Upload Logo
              </BaseButton>
            )}
          </FileButton>
          <FormField
            label="Restaurant Name"
            name="name"
            error={errors.name?.message}
            required
            size="sm"
          >
            <BaseInput
              label="restaurant"
              {...register("name")}
              type="text"
              placeholder="Enter your restaurant name..."
              defaultValue={userData.name}            />
          </FormField>
          <FormField
            label="Contact Number"
            name="phone"
            error={errors.phone?.message}
            required
          >
            <BaseInput
              {...register("phone")}
              type="text"
              placeholder="Enter your Phone number..."
              defaultValue={userData.phone}
            />
          </FormField>
          <FormField
            label="Location"
            name="address"
            error={errors.address?.message}
            required
          >
            <BaseTextArea
              {...register("address")}
              placeholder="Enter your Location..."
              defaultValue={userData.address}
            />
          </FormField>
          <div className="flex flex-row justify-between ">
            <BaseButton
              type="submit"
              loading={isSubmitting}
              classNames={{
                root: "mt-6 h-12 rounded-md w-36",
                inner: "font-bold text-white text-sm",
              }}
            >
              Save Profile
            </BaseButton>
            <div
              onClick={() => handleBack()}
              className="mt-8 flex text-[#737380] opacity-60"
            >
              <IoMdArrowRoundBack size={20} />
              Back to the page
            </div>
          </div>
        </FormGroup>
      </form>
    </>
  );
};

export default UserProfileForm;
