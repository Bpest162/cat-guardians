import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  profileWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: colorTheme.color.base.background[20],
    padding: Theme.spacing(0, 1.25),
    position: "relative",
    zIndex: Theme.zIndex.modal
  },
  container: {
    maxWidth: "116rem",
    width: "100%"
  },
  imgSliderDescBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "8.8rem",
    padding: Theme.spacing(2, 0, 0),
    marginBottom: Theme.spacing(9.5),
    [Theme.breakpoints.down(960)]: {
      gap: "8rem",
      marginBottom: Theme.spacing(5)
    },
    [Theme.breakpoints.down(828)]: {
      gap: "2rem"
    }
  },
  reqComponentWrap: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  firstSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "3rem",
    alignItems: "start",
    [Theme.breakpoints.down(828)]: {
      flexDirection: "column",
      gap: "2rem",
      alignItems: "center"
    }
  },
  similarPetsBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "4.8rem"
  },
  similarPetsBlockTitleWrap: {
    width: "100%",
    textAlign: "start"
  },
  similarPetsBlockTitle: {
    fontSize: Theme.typography.h3.fontSize,
    fontWeight: Theme.typography.h2.fontWeight,
    lineHeight: Theme.typography.h3.lineHeight,
    letterSpacing: Theme.typography.h2.letterSpacing,
    color: colorTheme.color.base.typography[300],
    [Theme.breakpoints.down(960)]: {
      fontSize: Theme.typography.h4.fontSize,
      lineHeight: Theme.typography.h4.lineHeight
    },
    [Theme.breakpoints.down(728)]: {
      fontSize: Theme.typography.h5.fontSize
    }
  },
  bgDecor: {
    clipPath:
      "polygon(33% 22%, 46% 25%, 65% 25%, 81% 23%, 100% 19%, 100% 100%, 0 100%, 0 0, 10% 9%, 21% 17%)",
    background: colorTheme.color.base.background[200],
    position: "absolute",
    bottom: "0",
    right: "0",
    width: "100%",
    height: "35%",
    zIndex: Theme.zIndex.snackbar
  }
}));
