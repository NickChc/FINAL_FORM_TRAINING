import { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "@src/Providers/GlobalProvider";
import "@src/assets/global.css";

export function Provider({ children }: PropsWithChildren) {
  return (
    <BrowserRouter>
      <GlobalProvider>{children}</GlobalProvider>
    </BrowserRouter>
  );
}
