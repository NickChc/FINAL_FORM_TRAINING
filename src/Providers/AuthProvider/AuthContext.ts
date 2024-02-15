import { createContext } from "react";
import { TUserData, TUserTokens } from "@src/@types/requestTypes";



export enum TAuthStage_Enum {
    AUTHORIZED = "authorized",
    UNAUTHORIZED = "unauthorized",
    PENDING = "pending",
}

interface AuthContextProps {
  setAuthData: (arg: TUserTokens) => void;
  authStage: TAuthStage_Enum;
  setAuthStage: React.Dispatch<React.SetStateAction<TAuthStage_Enum>>;
  userData: TUserData | undefined;
  setUserData: React.Dispatch<React.SetStateAction<TUserData | undefined>>;
  logOut: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    setAuthData: () => {},
    authStage: TAuthStage_Enum.UNAUTHORIZED,
    setAuthStage: () => {},
    userData: undefined,
    setUserData: () => {},
    logOut: () => {},
});