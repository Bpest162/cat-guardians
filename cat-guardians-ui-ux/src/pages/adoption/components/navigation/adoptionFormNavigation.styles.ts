import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  navigationContainer: {
    width: "100%",
    marginBottom: Theme.spacing(5.875),
    [Theme.breakpoints.down(728)]: {
      display: "none"
    }
  },
  navigationMenu: {
    display: "flex",
    flexDirection: "row",
    gap: "4.5rem"
  },
  navMenuItem: {
    cursor: "pointer",
    border: "none",
    background: "none",
    fontSize: Theme.typography.body2.fontSize,
    lineHeight: Theme.typography.body2.lineHeight,
    fontWeight: Theme.typography.body2.fontWeight,
    color: colorTheme.color.base.typography[70]
  }
}));
