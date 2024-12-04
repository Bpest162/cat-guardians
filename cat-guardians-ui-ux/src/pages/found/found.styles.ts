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
  foundTitleWrap: {
    width: "100%",
    textAlign: "start",
    marginBottom: Theme.spacing(6),
    [Theme.breakpoints.down(728)]: {
      marginBottom: Theme.spacing(2.5)
    }
  },
  foundTitle: {
    fontSize: Theme.typography.h3.fontSize,
    fontWeight: Theme.typography.h2.fontWeight,
    lineHeight: Theme.typography.h3.lineHeight,
    letterSpacing: Theme.typography.h3.letterSpacing,
    color: colorTheme.color.base.typography[300],
    [Theme.breakpoints.down(960)]: {
      lineHeight: Theme.typography.h4.lineHeight
    },
    [Theme.breakpoints.down(728)]: {
      fontSize: Theme.typography.h5.fontSize
    }
  },
  bgDecor: {
    width: "100%",
    height: "50rem",
    background: colorTheme.color.base.background[200],
    position: "absolute",
    bottom: "0",
    left: "0",
    zIndex: Theme.zIndex.snackbar,
    clipPath: "ellipse(83% 92% at 70% 92%)",
    [Theme.breakpoints.down(960)]: {
      clipPath: "ellipse(98% 92% at 50% 92%)",
      height: "76rem"
    },
    [Theme.breakpoints.down(728)]: {
      display: "none"
    }
  }
}));
