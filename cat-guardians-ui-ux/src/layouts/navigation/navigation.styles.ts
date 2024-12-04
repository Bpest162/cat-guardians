import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  navigationWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "2rem",
    maxWidth: "71.2rem",
    marginRight: "15rem"
  },
  navContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "71.2rem",
    width: "100%",
    [Theme.breakpoints.down(1100)]: {
      position: "absolute",
      width: "35rem",
      flexDirection: "column",
      right: "-120%",
      top: "11.5rem",
      padding: Theme.spacing(1.25),
      transition: "right 1s",
      borderRadius: ".8rem",
      background: colorTheme.color.base.background[0],
      zIndex: Theme.zIndex.appBar,
      boxShadow: `0 .2rem .1rem 0 ${colorTheme.color.boxShadow[20]}`
    }
  },
  activeNavContainer: {
    [Theme.breakpoints.down(1100)]: {
      right: "-1.5rem"
    }
  },
  navItemLink: {
    fontSize: Theme.typography.body2.fontSize,
    fontWeight: Theme.typography.h4.fontWeight,
    color: colorTheme.color.base.typography[300],
    boxSizing: "border-box",
    transition: "background-color 0.3s, border-color 0.3s",
    padding: Theme.spacing(0.725),
    "&:hover": {
      outline: `.05rem solid ${colorTheme.color.border[20]}`,
      borderRadius: ".8rem",
      transition: "all .3s"
    },
    "&.active": {
      fontWeight: Theme.typography.h6.fontWeight,
      outline: `.05rem solid ${colorTheme.color.border[20]}`,
      borderRadius: ".8rem",
      background: colorTheme.color.links.desctop.active
    },
    "&:last-child": {
      display: "none"
    },
    [Theme.breakpoints.down(1100)]: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "6rem",
      "&:hover": {
        outline: "none",
        borderRadius: ".8rem",
        background: colorTheme.color.links.mobile.hover,
        fontWeight: Theme.typography.h3.fontWeight,
        transition: "all .5s"
      },
      "&.active": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "6rem",
        outline: "none",
        borderRadius: ".8rem",
        background: colorTheme.color.links.mobile.active,
        fontWeight: Theme.typography.h3.fontWeight,
        transform: "scale(1)"
      },
      "&:last-child": {
        display: "flex"
      }
    }
  },
  mobileMenu: {
    display: "none",
    [Theme.breakpoints.down(1100)]: {
      display: "block",
      position: "absolute",
      right: "0",
      top: "4.1rem",
      cursor: "pointer"
    }
  },
  noAdmin: {
    display: "none"
  },
  adminPanelWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: colorTheme.color.base.typography[300],
    [Theme.breakpoints.down(1100)]: {
      position: "absolute",
      right: "7rem"
    },
    "&:hover": {
      outline: `.05rem solid ${colorTheme.color.border[20]}`,
      borderRadius: ".8rem",
      transition: "all .3s"
    },
    "&.active": {
      fontWeight: Theme.typography.h6.fontWeight,
      outline: `.05rem solid ${colorTheme.color.border[20]}`,
      borderRadius: ".8rem",
      background: colorTheme.color.links.desctop.active
    }
  },
  adminPanel: {
    "&.MuiSvgIcon-root": {
      fontSize: Theme.typography.h5.fontSize,
      cursor: "pointer",
      [Theme.breakpoints.down(520)]: {
        fontSize: Theme.typography.h6.fontSize
      }
    }
  }
}));
