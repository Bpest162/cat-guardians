import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  sectionSupport: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "auto auto",
    gridTemplateRows: "auto",
    gap: "2rem",
    marginBottom: "9.6rem",
    [Theme.breakpoints.down(960)]: {
      marginBottom: "5.6rem"
    },
    [Theme.breakpoints.down(728)]: {
      gridTemplateColumns: "1fr",
      marginBottom: "3.6rem"
    }
  },
  sectionSupportItem: {
    maxWidth: "70rem",
    width: "100%",
    padding: Theme.spacing(7, 3),
    borderRadius: "2rem",
    background: colorTheme.color.base.background[0],
    boxShadow: `0 .2rem .1rem 0 ${colorTheme.color.boxShadow[20]}`,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "1.65rem",
    [Theme.breakpoints.down(960)]: {
      padding: Theme.spacing(4.5, 3)
    }
  },
  SupportItemDesc: {
    display: "flex",
    flexDirection: "column",
    gap: ".3rem",
    [Theme.breakpoints.down(960)]: {
      gap: "1.3rem"
    }
  },
  SupportItemDescTitle: {
    fontSize: Theme.typography.h6.fontSize,
    fontWeight: Theme.typography.h3.fontWeight,
    lineHeight: Theme.typography.h6.lineHeight,
    color: colorTheme.color.base.typography[300],
    [Theme.breakpoints.down(960)]: {
      fontSize: Theme.typography.body2.fontSize,
      fontWeight: Theme.typography.h4.fontWeight,
      lineHeight: Theme.typography.body2.lineHeight
    }
  },
  SupportItemDescText: {
    fontSize: Theme.typography.body3.fontSize,
    fontWeight: Theme.typography.body3.fontWeight,
    lineHeight: Theme.typography.body3.lineHeight,
    color: colorTheme.color.base.typography[300],
    [Theme.breakpoints.down(960)]: {
      fontSize: Theme.typography.body4.fontSize,
      lineHeight: Theme.typography.button.lineHeight
    }
  },
  supportSvg: {
    [Theme.breakpoints.down(960)]: {
      width: "9.6rem",
      height: "9.6rem"
    }
  }
}));
