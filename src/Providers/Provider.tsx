import { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "@src/Providers/GlobalProvider";
import { AuthProvider } from "./AuthProvider";
import "@src/assets/global.css";

export function Provider({ children }: PropsWithChildren) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalProvider>{children}</GlobalProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
