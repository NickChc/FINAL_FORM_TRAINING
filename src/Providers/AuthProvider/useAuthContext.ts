import { useContext } from "react";
import { AuthContext } from "@src/Providers/AuthProvider";

export function useAuthContext() {
  const { ...data } = useContext(AuthContext);

  return { ...data };
}
