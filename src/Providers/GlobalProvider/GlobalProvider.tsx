import { PropsWithChildren, useState } from "react";
import { GlobalContext } from "@src/Providers/GlobalProvider";

export function GlobalProvider({ children }: PropsWithChildren) {
  const [openRegister, setOpenRegister] = useState<boolean>(false);
  const [openLogIn, setOpenLogIn] = useState<boolean>(false);

  return (
    <GlobalContext.Provider
      value={{
        openRegister,
        setOpenRegister,
        openLogIn,
        setOpenLogIn,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
