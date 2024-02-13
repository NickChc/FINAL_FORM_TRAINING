import React from "react";
import ReactDOM from "react-dom/client";
import App from "@src/App.tsx";
import { Provider } from "@src/Providers/Provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);
