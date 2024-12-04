import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: colorTheme.color.base.background[20],
    padding: Theme.spacing(0, 1.25)
  },
  container: {
    maxWidth: "53.2rem",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "3rem",
    borderRadius: "4rem",
    boxShadow: `0 .8rem .4rem 0 ${colorTheme.color.boxShadow[20]}`,
    background: colorTheme.color.base.background[0],
    margin: Theme.spacing(5.625, 0, 14.25),
    padding: Theme.spacing(6, 5),
    [Theme.breakpoints.down(900)]: {
      margin: Theme.spacing(6.25, 0),
      padding: Theme.spacing(5, 3.125)
    }
  },
  loginTitleWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: Theme.spacing(2.25, 0, 2.875)
  },
  loginTitle: {
    fontSize: Theme.typography.h1.fontSize,
    color: colorTheme.color.base.typography[300],
    fontWeight: Theme.typography.h4.fontWeight,
    lineHeight: Theme.typography.h1.lineHeight,
    letterSpacing: Theme.typography.h1.letterSpacing,
    [Theme.breakpoints.down(1100)]: {
      fontSize: Theme.typography.h2.fontSize
    },
    [Theme.breakpoints.down(900)]: {
      fontSize: Theme.typography.h3.fontSize,
      lineHeight: Theme.typography.h4.lineHeight
    }
  },
  offerTextBox: {
    display: "flex",
    flexDirection: "column"
  },
  signUpLink: {
    fontSize: Theme.typography.body4.fontSize,
    fontWeight: Theme.typography.h6.fontWeight,
    color: colorTheme.color.base.typography[500]
  },
  accountText: {
    fontSize: Theme.typography.body4.fontSize,
    fontWeight: Theme.typography.body4.fontWeight,
    color: colorTheme.color.base.typography[30]
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem"
  },
  formLabel: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    fontSize: Theme.typography.body3.fontSize,
    lineHeight: Theme.typography.body3.lineHeight,
    fontWeight: Theme.typography.body3.fontWeight
  },
  formInput: {
    width: "100%",
    height: "5.8rem",
    fontSize: Theme.typography.body3.fontSize,
    lineHeight: Theme.typography.body3.lineHeight,
    fontWeight: Theme.typography.body3.fontWeight,
    border: `.1rem solid ${colorTheme.color.input.boderDefault}`,
    borderRadius: "10rem",
    padding: Theme.spacing(0, 3.125),
    "&::placeholder": {
      fontSize: Theme.typography.body4.fontSize,
      lineHeight: Theme.typography.body4.lineHeight,
      fontWeight: Theme.typography.body4.fontWeight
    },
    "&:focus": {
      outline: "none"
    }
  },
  inputError: {
    outline: "none",
    border: `.1rem solid ${colorTheme.color.input.borderError}`
  },
  errorMsg: {
    position: "absolute",
    fontSize: Theme.typography.body5.fontSize,
    right: "1rem",
    bottom: "-2.5rem",
    color: colorTheme.color.input.borderError
  },
  checkboxWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  checkbox: {
    padding: Theme.spacing(0, 1.25),
    "& .MuiSvgIcon-root": {
      fontSize: Theme.typography.h6.fontSize,
      color: colorTheme.color.base.typography[500]
    }
  },
  checkboxLabelTitle: {
    fontSize: Theme.typography.body4.fontSize,
    lineHeight: Theme.typography.button.lineHeight,
    fontWeight: Theme.typography.body4.fontWeight,
    color: colorTheme.color.base.typography[300]
  },
  forgotText: {
    fontSize: Theme.typography.body4.fontSize,
    lineHeight: Theme.typography.button.lineHeight,
    fontWeight: Theme.typography.body4.fontWeight,
    color: colorTheme.color.base.typography[500]
  },
  buttonSubmit: {
    width: "100%",
    background: colorTheme.color.button.authButton.bg,
    border: "none",
    fontSize: Theme.typography.button.fontSize,
    fontWeight: Theme.typography.h6.fontWeight,
    fontFamily: Theme.typography.fontFamily,
    padding: Theme.spacing(1.875),
    borderRadius: "4rem",
    color: colorTheme.color.base.typography[0],
    cursor: "pointer",
    transition: ".4s",
    "&:hover": {
      color: colorTheme.color.base.typography[300],
      background: colorTheme.color.button.authButton.hover
    }
  },
  socialIconsTextBox: {
    display: "flex",
    flexDirection: "column",
    gap: "2.4rem",
    alignItems: "center"
  },
  iconsBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "2rem"
  },
  iconsText: {
    fontSize: Theme.typography.body3.fontSize,
    lineHeight: Theme.typography.body3.lineHeight,
    fontWeight: Theme.typography.body3.fontWeight,
    color: colorTheme.color.base.typography[30]
  }
}));
