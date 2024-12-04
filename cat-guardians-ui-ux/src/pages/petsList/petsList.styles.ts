import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    zIndex: Theme.zIndex.modal,
    background: colorTheme.color.base.background[20],
    padding: Theme.spacing(0, 1.25)
  },
  container: {
    maxWidth: "116rem",
    width: "100%"
  },
  petsListTitleWrap: {
    width: "100%",
    marginBottom: "2rem"
  },
  petsListTitle: {
    fontSize: Theme.typography.h2.fontSize,
    fontWeight: Theme.typography.h1.fontWeight,
    lineHeight: Theme.typography.h2.lineHeight,
    letterSpacing: Theme.typography.h2.letterSpacing,
    color: colorTheme.color.base.typography[300],
    [Theme.breakpoints.down(960)]: {
      fontSize: Theme.typography.h3.fontSize,
      lineHeight: "4.8rem"
    },
    [Theme.breakpoints.down(728)]: {
      fontSize: Theme.typography.h5.fontSize
    }
  },
  pageMainSection: {
    position: "relative"
  },
  petsListwrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    gap: "2rem",
    position: "relative",
    zIndex: "0",
    [Theme.breakpoints.down(900)]: {
      flexDirection: "column",
      gap: "2rem"
    }
  },
  petsListContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "auto",
    gap: "2rem",
    marginBottom: "2.4rem",
    [Theme.breakpoints.down(600)]: {
      gridTemplateColumns: "1fr"
    }
  }
}));
