import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import BaseButton from "@/app/components/ui/BaseButton";
import signout from "../actions/logout-action";

const LogOut = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close} title="Confirm action" size={"md"}  >
        <div className="flex flex-col">
          Are you sure you want to logout?
          <BaseButton
            type="submit"
            intent={"primary"}
            classNames={{root:"w-32 mt-4"}}
            onClick={() => {
              signout();
              close();
            }}
          >
            Logout
          </BaseButton>
        </div>
      </Modal>

      <BaseButton
        intent={"purple"}
        onClick={open}
        classNames={{ root: " w-full " }}
      >
        Logout
      </BaseButton>
    </>
  );
};

export default LogOut;