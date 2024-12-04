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
    width: "100%"
  },
  aboutUsTitleWrap: {
    width: "100%",
    textAlign: "start",
    marginBottom: "4.8rem",
    [Theme.breakpoints.down(728)]: {
      marginBottom: "2rem"
    }
  },
  aboutUsTitle: {
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
    marginBottom: "6.8rem",
    [Theme.breakpoints.down(960)]: {
      marginBottom: "4rem"
    },
    [Theme.breakpoints.down(728)]: {
      marginBottom: "2rem"
    }
  },
  secondaryTitle: {
    fontSize: Theme.typography.h3.fontSize,
    fontWeight: Theme.typography.h3.fontWeight,
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
  pageEllipse: {
    position: "absolute",
    width: "70.1rem",
    height: "70.1rem",
    top: "7rem",
    left: "-11rem",
    borderRadius: "50%",
    zIndex: Theme.zIndex.snackbar,
    background: colorTheme.color.base.background[0],
    [Theme.breakpoints.down(960)]: {
      display: "none"
    }
  },
  bgDecor: {
    width: "100%",
    height: "69rem",
    background: colorTheme.color.base.background[200],
    position: "absolute",
    bottom: "0",
    left: "0",
    zIndex: Theme.zIndex.snackbar,
    clipPath: "ellipse(83% 92% at 36% 92%)",
    [Theme.breakpoints.down(960)]: {
      clipPath: "ellipse(98% 92% at 82% 92%)",
      height: "76rem"
    }
  }
}));
