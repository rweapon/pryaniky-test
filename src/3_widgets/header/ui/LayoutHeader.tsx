import { Button } from "@mui/material";
import { AppPaths } from "@shared/model/configs";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function LayoutHeader() {
  const appRoutes: Record<AppPaths, string> = {
    [AppPaths.HOME]: "Список документов",
    [AppPaths.LOGIN]: "Авторизация",
    [AppPaths.ALL]: "404",
  };
  const token = localStorage.getItem("token");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const checkToken = () => {
    if (!token) {
      navigate(AppPaths.LOGIN, { replace: true });
    }
    else {
      navigate(AppPaths.HOME, { replace: true });
    }
  };

  const onClick = () => {
    localStorage.clear();
    navigate(AppPaths.LOGIN, { replace: true });
  };

  useEffect(() => {
    checkToken();
  }, [pathname]);

  return (
    <header className="flex w-full items-center justify-between p-8 pb-0">
      <h1 className="text-2xl font-medium">
        {appRoutes[pathname as AppPaths]}
      </h1>
      {token && (
        <Button
          type="button"
          onClick={onClick}
          variant="contained"
        >
          Выйти
        </Button>
      )}
    </header>
  );
}
