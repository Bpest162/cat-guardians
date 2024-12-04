import { ROUTES } from "src/constants/routing/urls";
import { colorTheme } from "src/theme/themeVariables";

export const getHeaderColorByPathname = (pathname: string): string => {
  if (pathname.endsWith("/adoption-form")) {
    return colorTheme.color.base.background[300];
  }

  switch (pathname) {
    case ROUTES.ROOT:
      return colorTheme.color.base.background[0];
    default:
      return colorTheme.color.base.background[20];
  }
};
