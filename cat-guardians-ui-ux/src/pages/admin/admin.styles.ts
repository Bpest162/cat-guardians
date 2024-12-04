import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    background: colorTheme.color.base.background[20],
    padding: Theme.spacing(0, 1.25)
  },
  container: {
    maxWidth: "116rem",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "3rem",
    [Theme.breakpoints.down(960)]: {
      marginBottom: "8.4rem"
    },
    [Theme.breakpoints.down(728)]: {
      marginBottom: "4.4rem"
    }
  },
  titleWrap: {
    width: "100%",
    textAlign: "center",
    margin: Theme.spacing(1.25, 0, 3.5, 0),
    [Theme.breakpoints.down(728)]: {
      margin: Theme.spacing(0, 0, 3.5, 0)
    }
  },
  title: {
    fontSize: Theme.typography.h3.fontSize,
    fontWeight: Theme.typography.h6.fontWeight,
    lineHeight: Theme.typography.h3.lineHeight,
    letterSpacing: Theme.typography.h2.letterSpacing,
    color: colorTheme.color.base.typography[40],
    [Theme.breakpoints.down(960)]: {
      fontSize: Theme.typography.h4.fontSize,
      lineHeight: Theme.typography.h4.lineHeight,
      fontWeight: Theme.typography.h4.fontWeight
    },
    [Theme.breakpoints.down(728)]: {
      fontSize: Theme.typography.h5.fontSize
    }
  },
  buttonsWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: "3rem",
    marginBottom: Theme.spacing(5),
    [Theme.breakpoints.down(728)]: {
      flexDirection: "column",
      alignItems: "center"
    }
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "30rem",
    height: "6rem",
    fontSize: Theme.typography.body1.fontSize,
    fontWeight: Theme.typography.h3.fontWeight,
    lineHeight: Theme.typography.body1.lineHeight,
    color: colorTheme.color.base.typography[300],
    borderRadius: ".8rem",
    border: "none",
    background: colorTheme.color.button.primary.bg,
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    "&:hover": {
      background: colorTheme.color.button.primary.hover,
      color: colorTheme.color.base.typography[0],
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)"
    },
    [Theme.breakpoints.down(728)]: {
      fontSize: Theme.typography.body2.fontSize,
      width: "25rem",
      height: "5rem",
      "&:hover": {
        background: colorTheme.color.button.primary.hover,
        color: colorTheme.color.base.typography[0],
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)"
      }
    }
  },
  activeButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "30rem",
    height: "6rem",
    fontSize: Theme.typography.body1.fontSize,
    fontWeight: Theme.typography.h3.fontWeight,
    lineHeight: Theme.typography.body1.lineHeight,
    color: colorTheme.color.base.typography[0],
    borderRadius: ".8rem",
    border: "none",
    background: colorTheme.color.button.primary.hover,
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    [Theme.breakpoints.down(728)]: {
      fontSize: Theme.typography.body2.fontSize,
      width: "25rem",
      height: "5rem"
    }
  }
}));
