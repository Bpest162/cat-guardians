import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  sectionLinks: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: "6rem",
    marginBottom: "4.8rem",
    [Theme.breakpoints.down(960)]: {
      gap: "3rem",
      marginBottom: "4rem"
    },
    [Theme.breakpoints.down(728)]: {
      flexDirection: "column",
      alignItems: "center",
      gap: "2rem"
    }
  },
  sectionLinksItem: {
    maxWidth: "42.9rem",
    maxHeight: "52rem",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1.9rem",
    borderRadius: "2rem",
    padding: Theme.spacing(15, 5),
    background: colorTheme.color.base.background[0],
    [Theme.breakpoints.down(960)]: {
      padding: Theme.spacing(3)
    }
  },
  buttonsLink: {
    fontSize: Theme.typography.h3.fontSize,
    lineHeight: Theme.typography.h3.lineHeight,
    fontWeight: Theme.typography.h6.fontWeight,
    color: colorTheme.color.base.typography[60],
    [Theme.breakpoints.down(960)]: {
      fontSize: Theme.typography.h4.fontSize
    }
  },
  descriptionText: {
    textAlign: "center",
    fontSize: Theme.typography.h6.fontSize,
    lineHeight: Theme.typography.h6.lineHeight,
    fontWeight: Theme.typography.body1.fontWeight,
    color: colorTheme.color.base.typography[200],
    [Theme.breakpoints.down(960)]: {
      fontSize: Theme.typography.body1.fontSize,
      lineHeight: Theme.typography.body1.lineHeight
    }
  }
}));
