import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    zIndex: Theme.zIndex.modal,
    background: colorTheme.color.base.background[20],
    padding: Theme.spacing(0, 1.25),
    position: "relative"
  },
  container: {
    maxWidth: "116rem",
    width: "100%",
    marginBottom: "10.4rem",
    [Theme.breakpoints.down(960)]: {
      marginBottom: "8.4rem"
    },
    [Theme.breakpoints.down(728)]: {
      marginBottom: "4.4rem"
    }
  },
  contactUsTitleWrap: {
    width: "100%",
    textAlign: "start",
    margin: Theme.spacing(1.25, 0, 3.5, 0),
    [Theme.breakpoints.down(728)]: {
      margin: Theme.spacing(0, 0, 3.5, 0)
    }
  },
  contactUsTitle: {
    fontSize: Theme.typography.h3.fontSize,
    fontWeight: Theme.typography.h2.fontWeight,
    lineHeight: Theme.typography.h3.lineHeight,
    letterSpacing: Theme.typography.h2.letterSpacing,
    color: colorTheme.color.base.typography[300],
    [Theme.breakpoints.down(960)]: {
      fontSize: Theme.typography.h4.fontSize,
      lineHeight: Theme.typography.h4.lineHeight,
      fontWeight: Theme.typography.h4.fontWeight
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
    fontSize: Theme.typography.body2.fontSize,
    fontWeight: Theme.typography.body2.fontWeight,
    lineHeight: Theme.typography.body2.lineHeight,
    color: colorTheme.color.base.typography[300]
  },
  secondaryTitleLink: {
    fontSize: Theme.typography.body2.fontSize,
    fontWeight: Theme.typography.h6.fontWeight,
    lineHeight: Theme.typography.body2.lineHeight,
    color: colorTheme.color.base.typography[500]
  },
  bgDecor: {
    width: "100%",
    height: "49rem",
    background: colorTheme.color.base.background[200],
    position: "absolute",
    bottom: "0",
    left: "0",
    zIndex: Theme.zIndex.snackbar,
    clipPath: "ellipse(83% 92% at 50% 92%)",
    [Theme.breakpoints.down(960)]: {
      clipPath: "ellipse(83% 118% at 50% 120%)",
      height: "76rem"
    }
  }
}));
