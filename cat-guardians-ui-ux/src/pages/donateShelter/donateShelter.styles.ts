import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    zIndex: Theme.zIndex.modal,
    background: colorTheme.color.base.background[20],
    padding: Theme.spacing(3, 1.25),
    position: "relative"
  },
  container: {
    maxWidth: "116rem",
    width: "100%"
  },
  donateTextWrapper: {
    width: "100%",
    textAlign: "start",
    margin: Theme.spacing(0, 0, 5.1, 0),
    fontSize: Theme.typography.body2.fontSize,
    fontWeight: Theme.typography.body2.fontWeight,
    lineHeight: Theme.typography.body2.lineHeight
  },
  linkWrapper: {
    padding: Theme.spacing(0, 0, 6.25, 0)
  },
  donateText: {
    fontSize: Theme.typography.body2.fontSize,
    fontWeight: Theme.typography.body2.fontWeight,
    lineHeight: Theme.typography.body2.lineHeight,
    margin: Theme.spacing(0, 0, 5.1, 0),
    color: colorTheme.color.base.typography[70]
  },
  similarPetsSectionTitle: {
    fontSize: Theme.typography.h3.fontSize,
    fontWeight: Theme.typography.h2.fontWeight,
    lineHeight: Theme.typography.h3.lineHeight,
    padding: Theme.spacing(0, 0, 3.5, 0),
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
  similarPetsSectionBlock: {
    padding: Theme.spacing(10, 0, 0, 0)
  },
  bgDecor: {
    clipPath: "path('M 0 0 Q 180 650 1500 280 L 1500 1500 L 0 1500  Z')",
    background: colorTheme.color.base.background[200],
    position: "absolute",
    bottom: "0",
    right: "0",
    width: "100%",
    height: "63%",
    zIndex: Theme.zIndex.snackbar
  }
}));
