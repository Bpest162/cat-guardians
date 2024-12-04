import { Box, CircularProgress } from "@mui/material";
import React, { Suspense, useMemo } from "react";
import { Navigate, Outlet, RouteObject } from "react-router-dom";

import RouteGuard from "../components/auth/routeGuard";
import {
  PRIVATE_ROUTE,
  ROUTES_WITH_NAVIGATION,
  ROUTES_WITHOUT_NAVIGATION
} from "../constants/routing/routes";
import { ROUTES } from "../constants/routing/urls";
import Layout from "../layouts/layout";

function renderElement(route, useGuard = false) {
  const element = useGuard ? (
    <RouteGuard route={route}>
      <route.element />
    </RouteGuard>
  ) : (
    <route.element />
  );

  return route.children
    ? {
        ...route,
        element,
        children: route.children.map((item) => renderElement(item, useGuard))
      }
    : {
        ...route,
        element
      };
}

export const useRoutesConfig = (): RouteObject[] => {
  return useMemo(
    () => [
      {
        element: (
          <>
            <SuspenseLoading>
              <Outlet />
            </SuspenseLoading>
          </>
        ),
        children: [...PRIVATE_ROUTE.map((route) => renderElement(route, true))]
      },
      {
        element: (
          <Layout>
            <SuspenseLoading>
              <Outlet />
            </SuspenseLoading>
          </Layout>
        ),
        children: [...ROUTES_WITH_NAVIGATION.map((route) => renderElement(route, false))]
      },
      {
        element: (
          <Layout showNavigation={false}>
            <SuspenseLoading>
              <Outlet />
            </SuspenseLoading>
          </Layout>
        ),
        children: [...ROUTES_WITHOUT_NAVIGATION.map((route) => renderElement(route, false))]
      },

      {
        path: "*",
        element: <Navigate replace to={ROUTES.ROOT} />
      }
    ],
    []
  );
};

const SuspenseLoading = ({ children }) => (
  <Suspense
    fallback={
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 128px)"
        }}
      >
        <CircularProgress />
      </Box>
    }
  >
    {children}
  </Suspense>
);
