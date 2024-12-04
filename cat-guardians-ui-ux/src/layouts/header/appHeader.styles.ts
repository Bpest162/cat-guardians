import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

import { StylesProps } from "../interfaces/stylesProps";
import { getHeaderColorByPathname } from "./utils/getHeaderBgColor";

export const useStyles = makeStyles<StylesProps>()((Theme, { pathname }) => ({
  wrapper: {
    width: "100%",
    height: "14rem",
    display: "flex",
    justifyContent: "center",
    padding: Theme.spacing(0, 2.5),
    backgroundColor: getHeaderColorByPathname(pathname)
  },
  container: {
    position: "relative",
    maxWidth: "116rem",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  mobileMenu: {
    display: "none"
  },
  multyLengButtonsWrap: {
    position: "absolute",
    right: "5rem",
    width: "7.6rem",
    display: "flex",
    flexDirection: "row",
    gap: ".5rem",
    [Theme.breakpoints.down(1100)]: {
      right: "12rem"
    },
    [Theme.breakpoints.down(520)]: {
      right: "10rem"
    }
  },
  multyLengButton: {
    fontSize: Theme.typography.body2.fontSize,
    fontWeight: "500",
    fontFamily: "Nunito",
    padding: ".5rem",
    border: "none",
    background: "none",
    cursor: "pointer",
    color: colorTheme.color.base.typography[300],
    "&:hover": {
      outline: `.05rem solid ${colorTheme.color.border[20]}`,
      borderRadius: ".8rem",
      fontWeight: "700",
      padding: ".5rem",
      transition: "all .3s"
    },
    [Theme.breakpoints.down(520)]: {
      fontSize: Theme.typography.body4.fontSize
    }
  },
  multyLengButtonActive: {
    fontSize: Theme.typography.body2.fontSize,
    fontWeight: "700",
    fontFamily: "Nunito",
    color: colorTheme.color.base.typography[300],
    outline: `.05rem solid ${colorTheme.color.border[20]}`,
    borderRadius: ".8rem",
    padding: ".5rem",
    background: colorTheme.color.links.desctop.active,
    [Theme.breakpoints.down(520)]: {
      fontSize: Theme.typography.body4.fontSize
    }
  },
  userProfile: {
    position: "absolute",
    right: "0",
    cursor: "pointer",
    padding: Theme.spacing(0.725),
    "&:hover": {
      outline: `.05rem solid ${colorTheme.color.border[20]}`,
      borderRadius: ".8rem",
      transition: "all .3s"
    },
    "&.active": {
      fontWeight: "700",
      outline: `.05rem solid ${colorTheme.color.border[20]}`,
      borderRadius: ".8rem",
      padding: ".5rem",
      transform: "scale(1.05)",
      background: colorTheme.color.links.desctop.active
    },
    [Theme.breakpoints.down(1100)]: {
      display: "none"
    }
  },
  logo: {
    [Theme.breakpoints.down(720)]: {
      width: "16.1rem",
      height: "4.8rem"
    },
    [Theme.breakpoints.down(520)]: {
      width: "13.1rem",
      height: "3.8rem"
    }
  }
}));
