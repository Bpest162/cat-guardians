import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  sectionWrapper: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gridTemplateRows: "auto",
    marginBottom: "10.4rem",
    [Theme.breakpoints.down(960)]: {
      gridTemplateColumns: "1fr 1fr",
      justifyItems: "center",
      gap: "2rem",
      marginBottom: "8rem"
    },
    [Theme.breakpoints.down(728)]: {
      marginBottom: "5rem"
    }
  },
  sectionItem: {
    maxWidth: "25.6rem",
    width: "100%",
    maxHeight: "33rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.2rem",
    [Theme.breakpoints.down(728)]: {
      gap: ".4rem"
    }
  },
  imgBox: {
    maxWidth: "25.6rem"
  },
  sectionItemImg: {
    maxWidth: "100%",
    width: "100%",
    objectFit: "cover"
  },
  staffName: {
    fontSize: Theme.typography.body1.fontSize,
    fontWeight: Theme.typography.h6.fontWeight,
    lineHeight: Theme.typography.body1.lineHeight,
    color: colorTheme.color.base.typography[300],
    [Theme.breakpoints.down(728)]: {
      textAlign: "center"
    }
  },
  staffJobTitle: {
    fontSize: Theme.typography.body3.fontSize,
    fontWeight: Theme.typography.body3.fontWeight,
    lineHeight: Theme.typography.body3.lineHeight,
    color: colorTheme.color.base.typography[300]
  }
}));
