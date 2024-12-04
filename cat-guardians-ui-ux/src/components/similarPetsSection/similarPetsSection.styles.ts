import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  sliderWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: Theme.spacing(8.75),
    [Theme.breakpoints.down(960)]: {
      marginBottom: Theme.spacing(5)
    }
  },
  sliderContainer: {
    width: "90%",
    [Theme.breakpoints.down(728)]: {
      width: "100%"
    }
  }
}));
