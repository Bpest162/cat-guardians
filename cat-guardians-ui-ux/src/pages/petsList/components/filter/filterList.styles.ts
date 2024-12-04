import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  filterWrap: {
    [Theme.breakpoints.down(900)]: {
      width: "13.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "relative",
      zIndex: "0",
      background: colorTheme.color.base.background[0],
      borderRadius: ".8rem",
      boxShadow: `0 .4rem .8rem .1rem ${colorTheme.color.boxShadow[10]}`,
      padding: Theme.spacing(1.25, 1.875),
      cursor: "pointer"
    }
  },
  filterTitleWrap: {
    display: "none",
    [Theme.breakpoints.down(900)]: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  },
  filterTitle: {
    fontSize: Theme.typography.body2.fontSize,
    fontWeight: Theme.typography.body2.fontWeight,
    lineHeight: Theme.typography.body2.lineHeight,
    color: colorTheme.color.base.typography[300]
  },
  filterListWrap: {
    width: "30.5rem",
    background: colorTheme.color.base.background[0],
    padding: Theme.spacing(2),
    borderRadius: "2rem",
    boxShadow: `0 .4rem .8rem .1rem ${colorTheme.color.boxShadow[10]}`,
    [Theme.breakpoints.down(900)]: {
      display: "none"
    }
  },
  filterListWrapActive: {
    [Theme.breakpoints.down(900)]: {
      position: "absolute",
      display: "block",
      left: "0",
      top: "7rem"
    }
  },
  filterListTitleWrap: {
    marginBottom: "2.6rem",
    [Theme.breakpoints.down(900)]: {
      display: "none"
    }
  },
  filterListTitle: {
    fontSize: Theme.typography.body1.fontSize,
    lineHeight: Theme.typography.body1.lineHeight,
    fontWeight: Theme.typography.h6.fontWeight,
    color: colorTheme.color.base.typography[300]
  },
  dropDownIcon: {
    fontSize: Theme.typography.h6.fontSize
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "2.5rem"
  },
  categoriesListWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem"
  },
  categoriesTitle: {
    fontSize: Theme.typography.body3.fontSize,
    fontWeight: Theme.typography.h6.fontWeight,
    lineHeight: Theme.typography.body3.lineHeight,
    color: colorTheme.color.base.typography[300]
  },
  buttonReset: {
    fontSize: Theme.typography.body4.fontSize,
    fontWeight: Theme.typography.h3.fontWeight,
    color: colorTheme.color.base.typography[300],
    background: colorTheme.color.base.background[0],
    border: `.1rem solid ${colorTheme.color.button.secondary.hover}`,
    borderRadius: ".8rem",
    padding: Theme.spacing(1),
    cursor: "pointer",
    "&:hover": {
      background: colorTheme.color.button.secondary.hover,
      border: `.1rem solid ${colorTheme.color.button.secondary.hover}`
    }
  },
  labelTitle: {
    fontSize: Theme.typography.body3.fontSize,
    fontWeight: Theme.typography.body3.fontWeight,
    lineHeight: Theme.typography.body3.lineHeight,
    color: colorTheme.color.base.typography[600],
    cursor: "pointer"
  },
  checkbox: {
    padding: Theme.spacing(0, 1.25),
    "& .MuiSvgIcon-root": {
      fontSize: Theme.typography.h6.fontSize,
      color: colorTheme.color.base.typography[700]
    }
  }
}));
