import { useContext } from "react";
import { GlobalContext } from "@src/Providers/GlobalProvider";

export function useGlobalContext() {
  const { ...data } = useContext(GlobalContext);

  return { ...data };
}
