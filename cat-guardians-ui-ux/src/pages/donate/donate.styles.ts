import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  wrapper: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    zIndex: Theme.zIndex.modal,
    background: colorTheme.color.base.background[20],
    padding: Theme.spacing(0, 1.25)
  },
  container: {
    maxWidth: "116rem",
    width: "100%"
  },
  donateTitleWrap: {
    width: "100%",
    textAlign: "center",
    marginBottom: "4.8rem",
    [Theme.breakpoints.down(728)]: {
      textAlign: "start",
      marginBottom: "2rem"
    }
  },
  donateTitle: {
    fontSize: Theme.typography.h2.fontSize,
    fontWeight: Theme.typography.h1.fontWeight,
    lineHeight: Theme.typography.h2.lineHeight,
    letterSpacing: Theme.typography.h2.letterSpacing,
    color: colorTheme.color.base.typography[300],
    [Theme.breakpoints.down(960)]: {
      fontSize: Theme.typography.h3.fontSize,
      lineHeight: Theme.typography.h4.lineHeight
    },
    [Theme.breakpoints.down(728)]: {
      fontSize: Theme.typography.h5.fontSize
    }
  },
  secondaryTitleWrap: {
    width: "100%",
    textAlign: "start",
    marginBottom: "4.8rem",
    [Theme.breakpoints.down(960)]: {
      marginBottom: "4rem"
    },
    [Theme.breakpoints.down(728)]: {
      marginBottom: "2rem"
    }
  },
  secondaryTitle: {
    fontSize: Theme.typography.h3.fontSize,
    fontWeight: Theme.typography.h2.fontWeight,
    lineHeight: Theme.typography.h3.lineHeight,
    letterSpacing: Theme.typography.h2.letterSpacing,
    color: colorTheme.color.base.typography[300],
    [Theme.breakpoints.down(960)]: {
      fontSize: Theme.typography.h4.fontSize,
      lineHeight: Theme.typography.h4.lineHeight
    },
    [Theme.breakpoints.down(728)]: {
      fontSize: Theme.typography.h5.fontSize
    }
  },
  donatePageEllipse: {
    position: "absolute",
    top: "12rem",
    right: "10rem",
    width: "69.3rem",
    height: "69.3rem",
    borderRadius: "50%",
    background: colorTheme.color.base.background[200],
    zIndex: Theme.zIndex.snackbar,
    [Theme.breakpoints.down(960)]: {
      display: "none"
    }
  },
  bgDecor: {
    clipPath: "ellipse(67% 98% at 49% 100%)",
    background: colorTheme.color.base.background[200],
    position: "absolute",
    bottom: "0",
    right: "0",
    width: "100%",
    height: "30%",
    zIndex: Theme.zIndex.snackbar
  }
}));
