import "@app/styles/index.css";
import { appRouter } from "@app/appRouter";
import AppProvider from "@app/providers/AppProvider";
import AppThemeProvider from "@app/providers/AppThemeProvider";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppThemeProvider>
      <AppProvider>
        <RouterProvider router={appRouter} />
      </AppProvider>
    </AppThemeProvider>
  </StrictMode>,
);
