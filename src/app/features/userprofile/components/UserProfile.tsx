"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Center, FileButton, Loader, Space, Textarea, Title } from "@mantine/core";
import { useState } from "react";
import Image from "next/image";
import FormGroup from "@/app/components/forms/FormGroup";
import FormField from "@/app/components/forms/FormField";
import BaseInput from "@/app/components/ui/BaseInput";
import BaseButton from "@/app/components/ui/BaseButton";
import { submitUserForm } from "../actions/userprofile-action";
import { useUserProfile } from "../hook/useUserProfile";

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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUserFormData>({
    resolver: zodResolver(userformSchema),
    defaultValues: userData
    ? {
        name: userData.name ?? "",
        phone: userData.phone ?? "",
        address: userData.address ?? "",
      }
    : { name: "", phone: "", address: "" },
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

    return submitUserForm(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <FormGroup>
        <Title order={2}  ta="center" mt="lg" mb={50} >
                 Welcome to Digidine!
               </Title>
        <FormField
          label="Restaurant Name"
          name="name"
          error={errors.name?.message}
          required
          size="sm"
        >
          <BaseInput
            {...register("name")}
            type="text"
            placeholder="Enter your restaurant name..."
          />
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
          />
        </FormField>

        <FormField
          label="Location"
          name="address"
          error={errors.address?.message}
          required
        >
          <Textarea
            {...register("address")}
            placeholder="Enter your Location..."
            classNames={{ input: "bg-blue-50" }}
          />
        </FormField>

        <div className="mb-4">
          {preview && (
            <Image
              src={preview}
              alt="Uploaded Logo"
              width={200}
              height={100}
              className="mt-2 object-cover rounded border-black border-2"
            />
          )}
          <Space h="md" />
          <FileButton onChange={handleFileChange} accept="image/png,image/jpeg">
            {(props) => (
              <BaseButton intent={"default"} {...props}>
                Upload Logo
              </BaseButton>
            )}
          </FileButton>
        </div>

        <BaseButton
          type="submit"
          classNames={{ root: "mb-2 w-full py-2 rounded-md" }}
          loading={isSubmitting}
        >
          Save Profile
        </BaseButton>
      </FormGroup>
    </form>
  );
};

export default UserProfileForm;
