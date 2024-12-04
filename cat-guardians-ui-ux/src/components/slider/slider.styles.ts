import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  sliderWrapper: {
    display: "flex",
    justifyContent: "center",
    width: "100%"
  },
  sliderContainer: {
    position: "relative",
    maxWidth: "97rem",
    width: "100%",
    zIndex: "99",
    [Theme.breakpoints.down(1100)]: {
      maxWidth: "80.6rem"
    }
  },
  sliderCard: {
    maxWidth: "46rem",
    width: "100%",
    borderRadius: "2rem",
    boxShadow: `0 .4rem .8rem .1rem ${colorTheme.color.boxShadow[20]}`,
    background: colorTheme.color.base.background[0],
    padding: "3.2rem ",
    [Theme.breakpoints.down(960)]: {
      padding: "2.4rem"
    }
  },
  reviewer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1.2rem"
  },
  reviewerName: {
    fontSize: Theme.typography.body2.fontSize,
    fontWeight: "700",
    color: colorTheme.color.base.typography[200]
  },
  reviewerText: {
    fontSize: Theme.typography.body2.fontSize,
    fontWeight: Theme.typography.body2.fontWeight,
    color: colorTheme.color.base.typography[200],
    lineHeight: Theme.typography.body2.lineHeight,
    [Theme.breakpoints.down(960)]: {
      fontSize: Theme.typography.body3.fontSize
    }
  }
}));
