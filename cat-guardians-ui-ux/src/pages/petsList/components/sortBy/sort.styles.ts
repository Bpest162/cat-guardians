import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  sortWrapper: {
    display: "grid",
    justifyContent: "end",
    marginBottom: "2.4rem",
    [Theme.breakpoints.down(900)]: {
      position: "absolute",
      top: "0",
      right: "0",
      marginBottom: "0"
    }
  },
  sortContainer: {
    width: "15rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    zIndex: Theme.zIndex.appBar,
    background: colorTheme.color.base.background[0],
    borderRadius: ".8rem",
    boxShadow: `0 .4rem .8rem .1rem ${colorTheme.color.boxShadow[10]}`,
    padding: Theme.spacing(1.25, 1.875),
    cursor: "pointer"
  },
  sortTitle: {
    fontSize: Theme.typography.body2.fontSize,
    fontWeight: Theme.typography.body2.fontWeight,
    lineHeight: Theme.typography.body2.lineHeight,
    color: colorTheme.color.base.typography[300]
  },
  dropDownIcon: {
    fontSize: Theme.typography.h6.fontSize
  },
  sortListWrap: {
    width: "23.4rem",
    display: "none",
    flexDirection: "column",
    gap: "1.5rem",
    borderRadius: "2rem",
    boxShadow: `0 .4rem .8rem .1rem ${colorTheme.color.boxShadow[10]}`,
    background: colorTheme.color.base.background[0],
    padding: Theme.spacing(2.5)
  },
  sortListWrapActive: {
    position: "absolute",
    right: "0",
    top: "7rem",
    display: "flex",
    zIndex: "10"
  },
  sortListItem: {
    fontSize: Theme.typography.body3.fontSize,
    fontWeight: Theme.typography.body3.fontWeight,
    lineHeight: Theme.typography.body3.lineHeight,
    color: colorTheme.color.base.typography[600],
    cursor: "pointer"
  }
}));
