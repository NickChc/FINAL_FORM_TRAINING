import { createContext } from "react";


interface GlobalContextProps {
  openRegister: boolean;
  setOpenRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalContext = createContext<GlobalContextProps>({
    openRegister: false,
    setOpenRegister: () => {},
});