"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Center, FileButton, Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { ImSpoonKnife } from "react-icons/im";
import { IoMdArrowRoundBack } from "react-icons/io";
import { z } from "zod";

import { submitUserForm } from "@/app/actions/userprofile/userprofile-action";
import { fetchprofiledataQuery } from "@/app/actions/userprofile/userprofile-fetch-query";
import FormField from "@/app/components/forms/FormField";
import FormGroup from "@/app/components/forms/ProfileGroup";
import BaseButton from "@/app/components/ui/BaseButton";
import BaseInput from "@/app/components/ui/BaseInput";
import BaseTextArea from "@/app/components/ui/BaseTextArea";
import validation from "@/app/utils/validation";

export const userformSchema = z.object({
  name: z.string().nonempty(validation("Name", "required")),
  phone: z
    .string()
    .nonempty(validation("Phone number", "required"))
    .length(10, validation("Phone number", "notvalid")),
  address: z.string().min(8, validation("Address", "minLength")),
});

export type IUserFormData = z.infer<typeof userformSchema>;

const UserProfileForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery(fetchprofiledataQuery());

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
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

  const MAX_FILE_SIZE = 1000000;
  const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  const onSubmit = async (data: IUserFormData) => {
    if (!file) {
      return setError("root", { message: "Image is required" });
    } else if (file?.size! >= MAX_FILE_SIZE) {
      return setError("root", { message: "Max size of image is 1MB" });
    } else if (ACCEPTED_IMAGE_TYPES.includes(file?.type!)) {
      return setError("root", {
        message: "Only .jpg, .jpeg, .png and .webp formats are supported.",
      });
    }
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
              {...register("name")}
              type="text"
              placeholder="Enter your restaurant name..."
              defaultValue={userData?.name}
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
              defaultValue={userData?.phone}
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
              defaultValue={userData?.address}
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
              className="mt-8 flex text-[#737380] dark:text-gray-200 opacity-60"
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
