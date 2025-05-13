import { FC, useState } from "react";

import BaseButtonLoader from "@components/ui/BaseButtonLoader";
import BaseModal from "@components/ui/BaseModal";
import { useDisclosure } from "@mantine/hooks";

import { IMessages } from "@/app/[locale]/messages";
import signout from "@/app/actions/auth/logout-action";
import BaseButton from "@/app/components/ui/BaseButton";

export type ILogoutProps = {
  lang?: IMessages;
};

const LogOut: FC<ILogoutProps> = (props) => {
  const { lang } = props;
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
            {loading ? <BaseButtonLoader /> : <p>{lang?.navbar.logout}</p>}
          </BaseButton>
        </div>
      </BaseModal>

      <BaseButton onClick={open} classNames={{ root: "w-full" }}>
        {lang?.navbar.logout}
      </BaseButton>
    </>
  );
};

export default LogOut;
