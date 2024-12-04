import React, { FC, memo, useMemo } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import { PERMISSIONS } from "src/constants/routing/permissions";
import { PRIVATE_ROUTES_PERMISSIONS } from "src/constants/routing/routes";
import { ROUTES } from "src/constants/routing/urls";

type RouteGuardProps = {
  children: React.ReactNode;
  route: RouteObject;
};

const RouteGuard: FC<RouteGuardProps> = ({ route, children }) => {
  // TODO get from BE
  const permissions = [PERMISSIONS.ADMIN];

  const routesWithPermission = useMemo(() => {
    const getPermissionByRoute = PRIVATE_ROUTES_PERMISSIONS.find(
      (item) => route.path === item.link
    ).permissions;

    for (const item of getPermissionByRoute) {
      if (permissions.indexOf(item) < 0) {
        return true;
      }
    }

    return false;
  }, [permissions]);

  if (routesWithPermission) return <Navigate replace to={ROUTES.ROOT} />;

  return <>{children}</>;
};

export default memo(RouteGuard);
