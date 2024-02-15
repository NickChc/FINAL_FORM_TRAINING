import { Outlet } from "react-router-dom";
import { Header } from "@src/components/Header";
import { Modal } from "@src/components/Modal";
import { useGlobalContext } from "@src/Providers/GlobalProvider";
import { RegisterForm } from "@src/modules/RegisterForm";
import { LogInForm } from "@src/modules/LogInForm";

export function PublicLayout() {
  const { openRegister, setOpenRegister, openLogIn, setOpenLogIn } =
    useGlobalContext();

  return (
    <div className="w-full min-h-dvh relative">
      <Header />
      <Modal open={openRegister} setOpen={() => setOpenRegister(!openRegister)}>
        <RegisterForm setModal={setOpenRegister} />
      </Modal>
      <Modal open={openLogIn} setOpen={() => setOpenLogIn(!openLogIn)}>
        <LogInForm setModal={setOpenLogIn} />
      </Modal>
      <Outlet />
    </div>
  );
}
