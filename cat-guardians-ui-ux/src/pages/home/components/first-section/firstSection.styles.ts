import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  firstSection: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "4.8rem",
    padding: Theme.spacing(0, 2.5),
    [Theme.breakpoints.down(960)]: {
      flexWrap: "wrap",
      justifyContent: "center",
      marginBottom: "4.8rem"
    },
    [Theme.breakpoints.down(600)]: {
      marginBottom: ".8rem"
    }
  },
  firstSectionLeftWrap: {
    maxWidth: "47.2rem",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "3.2rem",
    [Theme.breakpoints.down(960)]: {
      maxWidth: "56.8rem",
      gap: "2rem"
    }
  },
  leftWrapTitle: {
    fontSize: Theme.typography.h1.fontSize,
    color: colorTheme.color.base.typography[300],
    fontWeight: Theme.typography.h1.fontWeight,
    lineHeight: Theme.typography.h1.lineHeight,
    letterSpacing: Theme.typography.h1.letterSpacing,
    [Theme.breakpoints.down(1100)]: {
      fontSize: Theme.typography.h2.fontSize
    },
    [Theme.breakpoints.down(900)]: {
      fontSize: Theme.typography.h3.fontSize,
      lineHeight: "4.8rem"
    }
  },
  text: {
    fontSize: Theme.typography.body1.fontSize,
    fontWeight: Theme.typography.body1.fontWeight,
    lineHeight: Theme.typography.body1.lineHeight,
    [Theme.breakpoints.down(1100)]: {
      fontSize: Theme.typography.body2.fontSize
    },
    [Theme.breakpoints.down(900)]: {
      fontSize: Theme.typography.body3.fontSize,
      lineHeight: Theme.typography.body3.lineHeight
    }
  },
  linksWrap: {
    maxWidth: "60rem",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "2rem"
  },
  linksPrimary: {
    width: "100%",
    padding: "1.8rem 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: Theme.typography.button.fontSize,
    color: colorTheme.color.base.typography[300],
    borderRadius: ".8rem",
    background: colorTheme.color.button.primary.bg,
    "&:hover": {
      background: colorTheme.color.button.primary.hover,
      color: colorTheme.color.base.typography[0]
    },
    [Theme.breakpoints.down(900)]: {
      fontSize: Theme.typography.body3.fontSize
    },
    [Theme.breakpoints.down(600)]: {
      fontSize: "1.4rem",
      padding: "1.35rem 0"
    }
  },
  linksSecondary: {
    width: "100%",
    padding: "1.8rem 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: Theme.typography.button.fontSize,
    color: colorTheme.color.base.typography[300],
    borderRadius: ".8rem",
    border: `1px solid ${colorTheme.color.border[0]}`,
    "&:hover": {
      background: colorTheme.color.button.secondary.hover,
      border: `1px solid ${colorTheme.color.button.secondary.hover}`
    },
    [Theme.breakpoints.down(900)]: {
      fontSize: Theme.typography.body3.fontSize
    },
    [Theme.breakpoints.down(600)]: {
      fontSize: "1.4rem",
      padding: "1.35rem 0"
    }
  },
  imgBox: {
    position: "relative",
    maxWidth: "66.8rem",
    textAlign: "center",
    width: "100%",
    zIndex: 2
  },
  img: {
    maxWidth: "100%"
  }
}));
