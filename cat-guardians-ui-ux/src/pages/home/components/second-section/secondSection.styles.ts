import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  secondSection: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "8rem",
    padding: Theme.spacing(0, 2.5),
    [Theme.breakpoints.down(1100)]: {
      marginBottom: "3rem"
    },
    [Theme.breakpoints.down(960)]: {
      marginBottom: "0"
    }
  },
  secondSectionTitleWrap: {
    textAlign: "center",
    [Theme.breakpoints.down(960)]: {
      maxWidth: "56.8rem",
      width: "100%",
      textAlign: "start"
    }
  },
  secondSectionTitle: {
    fontSize: Theme.typography.h2.fontSize,
    fontWeight: Theme.typography.h2.fontWeight,
    lineHeight: Theme.typography.h2.lineHeight,
    letterSpacing: Theme.typography.h2.letterSpacing,
    [Theme.breakpoints.down(1100)]: {
      fontSize: Theme.typography.h3.fontSize
    },
    [Theme.breakpoints.down(720)]: {
      fontSize: Theme.typography.h5.fontSize,
      lineHeight: Theme.typography.h5.lineHeight,
      marginBottom: "2.5rem"
    }
  },
  sectionDesc: {
    display: "flex",
    flexDirection: "row",
    gap: "2.5rem",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "6.4rem",
    marginBottom: "4.8rem",
    [Theme.breakpoints.down(960)]: {
      flexWrap: "wrap-reverse",
      justifyContent: "center",
      marginTop: "0",
      marginBottom: "2rem"
    }
  },
  sectionDescTextWrap: {
    maxWidth: "56.8rem",
    width: "100%",
    position: "relative",
    zIndex: 2
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
  imgBox: {
    position: "relative",
    maxWidth: "66.8rem",
    textAlign: "center",
    width: "100%",
    zIndex: 2
  },
  img2: {
    maxWidth: "100%",
    borderRadius: "2rem",
    [Theme.breakpoints.down(728)]: {
      maxWidth: "100vw",
      width: "100vw",
      objectFit: "cover",
      margin: "0 calc(-50vw + 50%)",
      borderRadius: "0"
    }
  },
  secondSectionSecondaryTitleWrap: {
    textAlign: "center",
    [Theme.breakpoints.down(960)]: {
      maxWidth: "61rem",
      width: "100%"
    },
    [Theme.breakpoints.down(600)]: {
      maxWidth: "27rem",
      width: "100%"
    }
  },
  sectionsQuestionsTitle: {
    fontSize: Theme.typography.h3.fontSize,
    fontWeight: Theme.typography.h3.fontWeight,
    lineHeight: Theme.typography.h3.lineHeight,
    letterSpacing: Theme.typography.h3.letterSpacing,
    color: colorTheme.color.base.typography[300],
    marginBottom: "4.4rem",
    [Theme.breakpoints.down(1100)]: {
      fontSize: Theme.typography.h4.fontSize
    },
    [Theme.breakpoints.down(720)]: {
      fontSize: Theme.typography.h5.fontSize
    },
    [Theme.breakpoints.down(600)]: {
      fontSize: Theme.typography.body3.fontSize,
      lineHeight: Theme.typography.body3.lineHeight,
      marginBottom: "1.4rem"
    }
  },
  contactLinks: {
    fontSize: Theme.typography.h3.fontSize,
    fontWeight: Theme.typography.h3.fontWeight,
    lineHeight: Theme.typography.h3.lineHeight,
    letterSpacing: Theme.typography.h3.letterSpacing,
    color: colorTheme.color.base.typography[500],
    [Theme.breakpoints.down(1100)]: {
      fontSize: Theme.typography.h4.fontSize
    },
    [Theme.breakpoints.down(720)]: {
      fontSize: Theme.typography.h5.fontSize
    },
    [Theme.breakpoints.down(600)]: {
      fontSize: Theme.typography.body3.fontSize,
      lineHeight: Theme.typography.body3.lineHeight
    }
  },
  mdEllipse: {
    position: "absolute",
    width: "39.4rem",
    height: "39.4rem",
    top: "-48%",
    right: "0",
    borderRadius: "50%",
    background: colorTheme.color.base.background[100],
    zIndex: -1,
    [Theme.breakpoints.down(1100)]: {
      width: "30.4rem",
      height: "30.4rem",
      top: "-21%",
      right: "10%"
    },
    [Theme.breakpoints.down(960)]: {
      display: "none"
    }
  }
}));
