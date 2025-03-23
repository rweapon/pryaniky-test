import "@app/index.css";
import { appRouter } from "@app/appRouter";
import AppProvider from "@app/providers/AppProvider";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={appRouter} />
    </AppProvider>
  </StrictMode>,
);
