import { Outlet } from "react-router-dom";
import { Header } from "@src/components/Header";
import { Modal } from "@src/components/Modal";
import { useGlobalContext } from "@src/Providers/GlobalProvider";
import { RegisterForm } from "@src/modules/RegisterForm";

export function PublicLayout() {
  const { openRegister, setOpenRegister } = useGlobalContext();

  return (
    <div className="w-full min-h-dvh relative">
      <Header />
      <Modal open={openRegister} setOpen={() => setOpenRegister(!openRegister)}>
        <RegisterForm />
      </Modal>
      <Outlet />
    </div>
  );
}
