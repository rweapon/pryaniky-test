import BaseLayout from "@app/layouts/BaseLayout";
import { ErrorPage } from "@pages/Error";
import { Home } from "@pages/Home";
import { AppPaths } from "@shared/model/configs";
import { createBrowserRouter } from "react-router-dom";

export const appRouter = createBrowserRouter([
  {
    element: <BaseLayout />,
    errorElement: <ErrorPage />,
    children: [{ path: AppPaths.HOME, element: <Home /> }],
  },
]);
