import { desctopPaths, mobilePaths } from "src/constants/footer-config/paths";
import { ROUTES } from "src/constants/routing/urls";
import { colorTheme } from "src/theme/themeVariables";

export const getFooterColorByPathname = (pathname: string): string => {
  if (pathname.endsWith("/adoption-form")) {
    return colorTheme.color.base.background[400];
  }
  if (desctopPaths.find((path) => path === pathname)) {
    return colorTheme.color.base.background[20];
  }

  switch (pathname) {
    case ROUTES.ROOT:
      return colorTheme.color.base.background[0];
    default:
      return colorTheme.color.base.background[200];
  }
};

export const getFooterColorByPathnameOnBreakpoints = (pathname: string): string => {
  if (pathname.endsWith("/adoption-form")) {
    return colorTheme.color.base.background[300];
  }
  if (mobilePaths.find((path) => path === pathname)) {
    return colorTheme.color.base.background[20];
  }

  switch (pathname) {
    case ROUTES.ROOT:
      return colorTheme.color.base.background[50];
    default:
      return colorTheme.color.base.background[200];
  }
};
