import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    zIndex: "0"
  },
  container: {
    maxWidth: "116rem",
    width: "100%"
  },
  bgVector: {
    position: "absolute",
    width: "100vw",
    top: "44rem",
    left: "0",
    zIndex: "-1",
    [Theme.breakpoints.down(960)]: {
      display: "none"
    }
  },
  bgColor: {
    display: "none",
    position: "absolute",
    width: "100%",
    height: "70rem",
    left: "0",
    bottom: "0",
    background: colorTheme.color.base.background[50],
    zIndex: "-1",
    [Theme.breakpoints.down(728)]: {
      display: "block"
    }
  },
  smEllipse: {
    position: "absolute",
    top: "-6rem",
    left: "5rem",
    width: "27.8rem",
    height: "27.8rem",
    borderRadius: "50%",
    background: colorTheme.color.base.background[100],
    zIndex: -1,
    [Theme.breakpoints.down(1100)]: {
      width: "20.8rem",
      height: "20.8rem",
      top: "-6rem",
      left: "5rem"
    },
    [Theme.breakpoints.down(960)]: {
      display: "none"
    }
  },
  sectionSlider: {
    marginBottom: "10.8rem",
    padding: Theme.spacing(0, 2.5),
    [Theme.breakpoints.down(960)]: {
      marginBottom: "2.4rem"
    },
    [Theme.breakpoints.down(728)]: {
      padding: Theme.spacing(0, 0, 0, 2.5)
    }
  },
  sectionSliderTitleWrap: {
    textAlign: "center",
    position: "relative",
    marginBottom: "6.4rem",
    [Theme.breakpoints.down(728)]: {
      marginBottom: "0.4rem",
      textAlign: "start"
    }
  },
  sectionSliderTitle: {
    fontSize: Theme.typography.h2.fontSize,
    fontWeight: Theme.typography.h2.fontWeight,
    lineHeight: Theme.typography.h2.lineHeight,
    letterSpacing: Theme.typography.h2.letterSpacing,
    [Theme.breakpoints.down(1100)]: {
      fontSize: Theme.typography.h3.fontSize
    },
    [Theme.breakpoints.down(720)]: {
      fontSize: Theme.typography.h5.fontSize
    }
  }
}));
