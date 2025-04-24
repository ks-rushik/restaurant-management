import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import BaseButton from "@/app/components/ui/BaseButton";
import signout from "../../actions/auth/logout-action";
import { useState } from "react";
import BaseButtonLoader from "../ui/BaseButtonLoader";
import BaseModal from "../ui/BaseModal";

const LogOut = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);

  const handlelogout = () => {
    setLoading(true);
    signout();
  };
  return (
    <>
      <BaseModal
        opened={opened}
        onClose={close}
        title="Confirm action"
        size={"md"}
      >
        <div className="flex flex-col ">
          <div className="text-black dark:text-white">
            Are you sure you want to logout?
          </div>
          <BaseButton
            type="submit"
            classNames={{ root: "w-32 mt-4" }}
            onClick={() => handlelogout()}
          >
            {loading ? <BaseButtonLoader /> : <p>Logout</p>}
          </BaseButton>
        </div>
      </BaseModal>

      <BaseButton onClick={open} classNames={{ root: "w-full" }}>
        Logout
      </BaseButton>
    </>
  );
};

export default LogOut;
