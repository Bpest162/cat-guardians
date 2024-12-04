import React, { memo } from "react";
import { useRoutes } from "react-router-dom";
import useAuthCheck from "src/hooks/useAuthCheck";
import { useRoutesConfig } from "src/hooks/useRoutesConfig";

const App: React.FC = () => {
  const routes = useRoutesConfig();
  useAuthCheck();

  return useRoutes(routes);
};

export default memo(App);
