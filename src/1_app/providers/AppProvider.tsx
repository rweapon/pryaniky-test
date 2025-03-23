import type { ReactNode } from "react";

import { store } from "@app/appStore";
import { Provider } from "react-redux";

type AppProviderProps = {
  children: ReactNode | ReactNode[];
};

export default function AppProvider({ children }: AppProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
