import type { FC, PropsWithChildren } from "react";
import useAppStore, { selectorToken } from "@/store/app-store";
import { useLocation, Navigate, matchRoutes } from "react-router-dom";
import rooter from "@/router";
const AuthRoot: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const token = useAppStore(selectorToken);
  if (token) {
    return <>{children}</>;
  } else {
    const nextURL = location.pathname + location.search;
    const matchResult = matchRoutes(rooter.routes, nextURL);
    if (
      matchResult &&
      matchResult.length !== 0 &&
      matchResult[matchResult.length - 1].route.path === "*"
    ) {
      return <Navigate to={"/login"} replace />;
    } else {
        const to=nextURL==='/'||nextURL==='/home'? '/login':'login?from='+nextURL
      return <Navigate to={to} replace />;
    }
  }
};
export default AuthRoot;
