import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  wrapper: {
    width: "100%",
    [Theme.breakpoints.down(828)]: {
      maxWidth: "50.2rem"
    }
  },
  buttonsWrapper: {
    display: "flex",
    gap: "3rem",
    [Theme.breakpoints.down(828)]: {
      gap: "1rem",
      justifyContent: "space-between"
    }
  },
  button: {
    border: "none",
    background: "none",
    fontSize: Theme.typography.body1.fontSize,
    lineHeight: Theme.typography.body1.lineHeight,
    fontWeight: Theme.typography.h3.fontWeight,
    color: colorTheme.color.base.typography[300],
    padding: Theme.spacing(1.5, 3),
    cursor: "pointer",
    [Theme.breakpoints.down(960)]: {
      fontSize: Theme.typography.body2.fontSize,
      lineHeight: Theme.typography.body2.lineHeight,
      padding: Theme.spacing(2)
    }
  },
  activeButton: {
    border: "none",
    background: colorTheme.color.base.background[0],
    fontSize: Theme.typography.body1.fontSize,
    lineHeight: Theme.typography.body1.lineHeight,
    fontWeight: Theme.typography.h3.fontWeight,
    color: colorTheme.color.base.typography[500],
    borderRadius: "2rem 2rem 0 0",
    padding: Theme.spacing(1.5, 3),
    cursor: "pointer",
    [Theme.breakpoints.down(960)]: {
      fontSize: Theme.typography.body2.fontSize,
      lineHeight: Theme.typography.body2.lineHeight,
      padding: Theme.spacing(2)
    }
  },
  tabsTextWrapper: {
    background: colorTheme.color.base.background[0],
    borderRadius: "0 0 2rem 2rem",
    padding: Theme.spacing(3)
  },
  tabsText: {
    fontSize: Theme.typography.body3.fontSize,
    lineHeight: Theme.typography.body2.lineHeight,
    fontWeight: Theme.typography.body3.fontWeight,
    color: colorTheme.color.base.typography[300]
  }
}));
