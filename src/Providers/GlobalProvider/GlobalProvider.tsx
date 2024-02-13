import { PropsWithChildren, useState } from "react";
import { GlobalContext } from "@src/Providers/GlobalProvider";

export function GlobalProvider({ children }: PropsWithChildren) {
  const [openRegister, setOpenRegister] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        openRegister,
        setOpenRegister,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
