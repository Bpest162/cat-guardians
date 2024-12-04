import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  adoptionMainWrapper: {
    display: "flex",
    justifyContent: "center",
    zIndex: Theme.zIndex.modal,
    background: colorTheme.color.base.background[300],
    padding: Theme.spacing(0, 1.25),
    position: "relative"
  },
  adoptionMainContainer: {
    maxWidth: "116rem",
    width: "100%"
  },
  adoptionTitleWrapper: {
    width: "100%",
    textAlign: "start",
    marginBottom: Theme.spacing(6),
    [Theme.breakpoints.down(960)]: {
      marginBottom: Theme.spacing(5)
    },
    [Theme.breakpoints.down(728)]: {
      marginBottom: Theme.spacing(2.5)
    }
  },
  adoptionTitle: {
    fontSize: Theme.typography.h2.fontSize,
    fontWeight: Theme.typography.h1.fontWeight,
    lineHeight: Theme.typography.h2.lineHeight,
    letterSpacing: Theme.typography.h2.letterSpacing,
    color: colorTheme.color.base.typography[900],
    [Theme.breakpoints.down(960)]: {
      fontSize: Theme.typography.h4.fontSize,
      lineHeight: Theme.typography.h4.lineHeight
    },
    [Theme.breakpoints.down(728)]: {
      fontSize: Theme.typography.h5.fontSize
    }
  },
  adoptionFormMainWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "7.8rem",
    [Theme.breakpoints.down(960)]: {
      gap: "3.6rem"
    }
  },
  adoptionFormContainer: {
    width: "100%",
    borderRadius: "2rem",
    boxShadow: `0 .2rem .1rem 0 ${colorTheme.color.boxShadow[20]}`,
    background: colorTheme.color.base.background[20],
    marginBottom: Theme.spacing(13.5),
    [Theme.breakpoints.down(960)]: {
      marginBottom: Theme.spacing(8.75)
    }
  },
  adoptionForm: {
    width: "100%"
  },
  stepperContainer: {
    width: "100%"
  },
  stepper: {
    "& .MuiStepLabel-iconContainer": {
      width: "3.6rem",
      height: "3.6rem",
      background: colorTheme.color.base.background[0],
      border: `.3rem solid ${colorTheme.color.border[0]}`,
      borderRadius: "50%",
      [Theme.breakpoints.down(728)]: {
        width: "2.4rem",
        height: "2.4rem",
        border: `.2rem solid ${colorTheme.color.border[0]}`
      },
      "& .MuiSvgIcon-root": {
        display: "none"
      }
    },
    "& .MuiStepConnector-root": {
      top: "1.8rem",
      [Theme.breakpoints.down(728)]: {
        top: "1.2rem",
        left: "calc(-50% + 1.3rem)",
        right: "calc(50% + 1.3rem)"
      }
    },
    "& .MuiStepLabel-label": {
      fontSize: Theme.typography.body1.fontSize,
      lineHeight: Theme.typography.body1.lineHeight,
      fontWeight: Theme.typography.body1.fontWeight,
      color: colorTheme.color.base.typography[300],
      [Theme.breakpoints.down(728)]: {
        fontSize: Theme.typography.body4.fontSize,
        lineHeight: Theme.typography.button.lineHeight,
        fontWeight: Theme.typography.body4.fontWeight,
        color: colorTheme.color.base.typography[300]
      }
    },
    "& .Mui-active": {
      "&.MuiStepLabel-iconContainer": {
        background: colorTheme.color.border[0]
      },
      "&.MuiStepLabel-label": {
        fontWeight: Theme.typography.h6.fontWeight
      }
    }
  }
}));
