import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  sectionWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "6.4rem",
    marginBottom: "8rem",
    [Theme.breakpoints.down(960)]: {
      gap: "4rem",
      marginBottom: "4rem"
    },
    [Theme.breakpoints.down(728)]: {
      gap: "2rem"
    }
  },
  firstContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "2rem",
    [Theme.breakpoints.down(960)]: {
      flexDirection: "column-reverse"
    },
    [Theme.breakpoints.down(728)]: {
      gap: "2rem"
    }
  },
  secondContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "2rem",
    [Theme.breakpoints.down(960)]: {
      flexDirection: "column-reverse"
    },
    [Theme.breakpoints.down(728)]: {
      gap: "2rem"
    }
  },
  sectionTextWrap: {
    maxWidth: "52.8rem",
    width: "100%",
    [Theme.breakpoints.down(728)]: {
      maxWidth: "100%"
    }
  },
  sectionText: {
    fontSize: Theme.typography.body1.fontSize,
    lineHeight: Theme.typography.body1.lineHeight,
    fontWeight: Theme.typography.body1.fontWeight,
    color: colorTheme.color.base.typography[300]
  },
  imgBox: {
    position: "relative",
    maxWidth: "57rem",
    width: "100%",
    height: "38rem",
    [Theme.breakpoints.down(728)]: {
      height: "100%"
    }
  },
  image: {
    maxWidth: "57rem",
    width: "100%",
    maxHeight: "38rem",
    objectFit: "cover",
    height: "100%",
    borderRadius: "2rem",
    [Theme.breakpoints.down(728)]: {
      maxWidth: "100vw",
      width: "100vw",
      objectFit: "cover",
      margin: "0 calc(-50vw + 50%)",
      borderRadius: "0"
    }
  }
}));
