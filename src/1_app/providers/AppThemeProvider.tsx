import type { ReactNode } from "react";

import { createTheme, ThemeProvider } from "@mui/material";
import { ruRU } from "@mui/x-data-grid/locales";

const theme = createTheme({
  palette: {
    primary: { main: "#000000", contrastText: "#ebebeb" },
    secondary: { main: "#ebebeb", contrastText: "#000000" },
  },
}, ruRU);

type AppProviderProps = {
  children: ReactNode | ReactNode[];
};

export default function AppThemeProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}
