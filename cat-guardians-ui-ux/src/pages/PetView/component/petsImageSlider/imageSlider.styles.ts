import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  sliderContainer: {
    maxWidth: "60rem",
    maxHeight: "40.8rem",
    height: "100%",
    width: "100%",
    [Theme.breakpoints.down(1100)]: {
      maxWidth: "50rem"
    },
    [Theme.breakpoints.down(960)]: {
      maxWidth: "40rem"
    },
    [Theme.breakpoints.down(828)]: {
      maxWidth: "50.2rem"
    }
  },
  sliderItem: {
    position: "relative",
    maxWidth: "40rem",
    maxHeight: "40.8rem",
    width: "100%",
    height: "100%",
    borderRadius: "2rem",
    overflow: "hidden",
    margin: "-1.8rem",
    [Theme.breakpoints.down(960)]: {
      margin: "-.8rem"
    }
  },
  sliderImage: {
    width: "40rem",
    height: "40.8rem",
    objectFit: "cover",
    objectPosition: "center",
    borderRadius: "2rem",
    [Theme.breakpoints.down(1100)]: {
      width: "30rem",
      height: "30.8rem"
    },
    [Theme.breakpoints.down(828)]: {
      width: "27.1rem",
      height: "27.7rem"
    }
  },
  dotsImage: {
    width: "4rem",
    height: "4rem",
    objectFit: "cover",
    borderRadius: ".7rem"
  }
}));
