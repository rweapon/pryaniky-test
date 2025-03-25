import type { RouteObject } from "react-router-dom";

import BaseLayout from "@app/layouts/BaseLayout";
import { ErrorPage } from "@pages/Error";
import { Home } from "@pages/Home";
import { Login } from "@pages/Login";
import { AppPaths } from "@shared/model/configs";
import { createBrowserRouter, Navigate } from "react-router-dom";

const appPages: Record<AppPaths, RouteObject> = {
  [AppPaths.HOME]: { path: AppPaths.HOME, element: <Home /> },
  [AppPaths.ALL]: { path: AppPaths.ALL, element: (
    <Navigate
      to={AppPaths.HOME}
      replace
    />
  ) },
  [AppPaths.LOGIN]: { path: AppPaths.LOGIN, element: <Login /> },
};

export const appRouter = createBrowserRouter([
  {
    element: <BaseLayout />,
    errorElement: <ErrorPage />,
    children: [appPages[AppPaths.HOME], appPages[AppPaths.LOGIN]],
  },
]);
