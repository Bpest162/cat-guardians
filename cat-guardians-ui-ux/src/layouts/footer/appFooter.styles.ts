import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

import { StylesProps } from "../interfaces/stylesProps";
import {
  getFooterColorByPathname,
  getFooterColorByPathnameOnBreakpoints
} from "./utils/getFooterBgColor";

export const useStyles = makeStyles<StylesProps>()((Theme, { pathname }) => ({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    marginTop: "auto",
    padding: Theme.spacing(6.25, 2.5),
    backgroundColor: getFooterColorByPathname(pathname),
    [Theme.breakpoints.down(728)]: {
      backgroundColor: getFooterColorByPathnameOnBreakpoints(pathname),
      padding: Theme.spacing(6.25, 2.5, 2.5)
    }
  },
  container: {
    maxWidth: "116rem",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    marginBottom: "17rem",
    [Theme.breakpoints.down(600)]: {
      marginBottom: "5.6rem"
    }
  },
  logoBox: {
    width: "13.2rem",
    height: "3.9rem",
    [Theme.breakpoints.down(960)]: {
      display: "none"
    }
  },
  logo: {
    objectFit: "cover",
    width: "13.2rem",
    height: "3.9rem"
  },
  linksBox: {
    maxWidth: "64.5rem",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "auto auto auto",
    justifyContent: "space-between",
    [Theme.breakpoints.down(960)]: {
      maxWidth: "100%"
    },
    [Theme.breakpoints.down(600)]: {
      gridTemplateColumns: "auto auto",
      gridTemplateRows: "auto auto",
      gridTemplateAreas: `
      "help contact"
      "social social"
      `,
      gap: "3rem"
    }
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem"
  },
  social: {
    [Theme.breakpoints.down(600)]: {
      gridArea: "social"
    }
  },
  help: {
    [Theme.breakpoints.down(600)]: {
      gridArea: "help"
    }
  },
  contact: {
    [Theme.breakpoints.down(600)]: {
      gridArea: "contact"
    }
  },
  menuTitle: {
    fontSize: Theme.typography.body3.fontSize,
    fontWeight: "700",
    color: colorTheme.color.base.typography[100],
    marginBottom: "1.5rem",
    [Theme.breakpoints.down(600)]: {
      fontSize: "1.2rem"
    }
  },
  menuItem: {
    fontSize: Theme.typography.body3.fontSize,
    fontWeight: Theme.typography.body3.fontWeight,
    color: colorTheme.color.base.typography[50],
    lineHeight: "143%",
    [Theme.breakpoints.down(600)]: {
      fontSize: "1.2rem"
    }
  },
  socialIcons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: "2.4rem"
  },
  copyrightBox: {
    maxWidth: "116rem",
    width: "100%",
    textAlign: "start"
  },
  copyrightBoxText: {
    fontSize: Theme.typography.body3.fontSize,
    color: colorTheme.color.base.typography[20],
    fontWeight: "400",
    [Theme.breakpoints.down(600)]: {
      fontSize: "1.2rem"
    }
  },
  socialIcon: {
    width: "3.5rem",
    height: "3.5rem",
    display: "block"
  }
}));
