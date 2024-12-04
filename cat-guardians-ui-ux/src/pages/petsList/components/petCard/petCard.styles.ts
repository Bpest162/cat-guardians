import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  petCart: {
    minWidth: "25rem",
    padding: Theme.spacing(3),
    borderRadius: "2rem",
    background: colorTheme.color.base.background[0],
    boxShadow: `0 .4rem .8rem .1rem ${colorTheme.color.boxShadow[10]}`,
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    [Theme.breakpoints.down(960)]: {
      padding: Theme.spacing(2, 3),
      gap: "1rem"
    }
  },
  petCardImageBox: {
    cursor: "pointer"
  },
  petInf: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    [Theme.breakpoints.down(960)]: {
      gap: "0"
    }
  },
  petNameWrap: {
    display: "flex",
    justifyContent: "space-between"
  },
  petName: {
    display: "flex",
    flexDirection: "row",
    gap: "1.5rem",
    alignItems: "center",
    fontSize: Theme.typography.h6.fontSize,
    fontWeight: Theme.typography.h6.fontWeight,
    [Theme.breakpoints.down(960)]: {
      fontSize: Theme.typography.body1.fontSize
    }
  },
  petImgWrap: {
    maxWidth: "100%"
  },
  petImg: {
    maxWidth: "51.3rem",
    width: "100%",
    objectFit: "cover"
  },
  petAge: {
    fontSize: Theme.typography.body1.fontSize,
    lineHeight: Theme.typography.body1.lineHeight,
    fontWeight: Theme.typography.body1.fontWeight,
    marginBottom: "1rem",
    [Theme.breakpoints.down(960)]: {
      fontSize: Theme.typography.body3.fontSize,
      lineHeight: Theme.typography.body3.lineHeight
    }
  },
  petLink: {
    fontSize: Theme.typography.body2.fontSize,
    lineHeight: Theme.typography.body2.lineHeight,
    fontWeight: Theme.typography.body2.fontWeight,
    color: colorTheme.color.base.typography[800],
    [Theme.breakpoints.down(728)]: {
      fontSize: Theme.typography.body4.fontSize,
      lineHeight: Theme.typography.body4.lineHeight
    }
  },
  favoriteCheckbox: {
    "& .MuiSvgIcon-root": {
      fontSize: Theme.typography.h6.fontSize,
      padding: Theme.spacing(0),
      color: colorTheme.color.base.typography[800]
    }
  }
}));
