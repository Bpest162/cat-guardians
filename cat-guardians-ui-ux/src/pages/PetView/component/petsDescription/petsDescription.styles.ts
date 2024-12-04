import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  patsDescriptionBox: {
    maxWidth: "50.2rem",
    width: "100%",
    background: colorTheme.color.base.background[0],
    borderRadius: "2rem",
    boxShadow: `0 .2rem .1rem 0 ${colorTheme.color.boxShadow[20]}`,
    padding: Theme.spacing(4.5),
    [Theme.breakpoints.down(728)]: {
      padding: Theme.spacing(2.5, 2)
    }
  },
  patsDescriptionBoxHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Theme.spacing(2)
  },
  nameBox: {
    display: "flex",
    alignItems: "center",
    gap: "2rem"
  },
  name: {
    fontSize: Theme.typography.h5.fontSize,
    lineHeight: Theme.typography.h4.lineHeight,
    fontWeight: Theme.typography.h6.fontWeight,
    color: colorTheme.color.base.typography[300],
    [Theme.breakpoints.down(960)]: {
      fontSize: Theme.typography.h6.fontSize,
      lineHeight: Theme.typography.h6.lineHeight
    }
  },
  shareFavoritBox: {
    display: "flex",
    alignItems: "center",
    gap: "1rem"
  },
  favoriteCheckbox: {
    "& .MuiSvgIcon-root": {
      fontSize: Theme.typography.h5.fontSize,
      padding: Theme.spacing(0),
      color: colorTheme.color.base.typography[800]
    }
  },
  age: {
    fontSize: Theme.typography.body1.fontSize,
    lineHeight: Theme.typography.body1.lineHeight,
    fontWeight: Theme.typography.body1.fontWeight,
    color: colorTheme.color.base.typography[300],
    marginBottom: Theme.spacing(2)
  },
  discriptionText: {
    fontSize: Theme.typography.body3.fontSize,
    lineHeight: Theme.typography.body3.lineHeight,
    fontWeight: Theme.typography.body3.fontWeight,
    color: colorTheme.color.base.typography[200],
    marginBottom: Theme.spacing(2)
  },
  linksWrapper: {
    display: "flex",
    justifyContent: "space-between",
    gap: "2rem"
  },
  linksPrimary: {
    maxWidth: "20.5rem",
    width: "100%",
    height: "4.8rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: Theme.typography.body3.fontSize,
    color: colorTheme.color.base.typography[300],
    borderRadius: ".8rem",
    background: colorTheme.color.button.primary.bg,
    "&:hover": {
      background: colorTheme.color.button.primary.hover,
      color: colorTheme.color.base.typography[0]
    }
  },
  linksSecondary: {
    maxWidth: "20.5rem",
    width: "100%",
    height: "4.8rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: Theme.typography.body3.fontSize,
    color: colorTheme.color.base.typography[300],
    borderRadius: ".8rem",
    border: `.1rem solid ${colorTheme.color.border[0]}`,
    "&:hover": {
      background: colorTheme.color.button.secondary.hover,
      border: `.1rem solid ${colorTheme.color.button.secondary.hover}`
    }
  }
}));
