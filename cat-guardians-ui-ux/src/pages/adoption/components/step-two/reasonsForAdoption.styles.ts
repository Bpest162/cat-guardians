import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  step: {
    display: "flex",
    flexDirection: "row",
    overflow: "hidden"
  },
  formElementsBox: {
    maxWidth: "59rem",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "2.4rem",
    padding: Theme.spacing(5, 9.75, 9.75, 5),
    [Theme.breakpoints.down(960)]: {
      maxWidth: "100%",
      padding: Theme.spacing(4, 3, 4, 3)
    }
  },
  textAreaLabel: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    fontSize: Theme.typography.body3.fontSize,
    lineHeight: Theme.typography.body3.lineHeight,
    fontWeight: Theme.typography.body3.fontWeight,
    color: colorTheme.color.base.typography[300]
  },
  formTextArea: {
    width: "100%",
    height: "17.6rem",
    fontSize: Theme.typography.body3.fontSize,
    lineHeight: Theme.typography.body3.lineHeight,
    fontWeight: Theme.typography.body3.fontWeight,
    border: `.1rem solid ${colorTheme.color.border[40]}`,
    borderRadius: "2rem",
    padding: Theme.spacing(2, 3.125),
    "&::placeholder": {
      fontSize: Theme.typography.body4.fontSize,
      lineHeight: Theme.typography.body4.lineHeight,
      fontWeight: Theme.typography.body4.fontWeight
    },
    "&:focus": {
      outline: "none"
    }
  },
  buttonsBox: {
    display: "flex",
    flexDirection: "row",
    gap: "1.8rem"
  },
  nextBtn: {
    maxWidth: "23.5rem",
    width: "100%",
    height: "4.8rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: Theme.typography.body3.fontSize,
    color: colorTheme.color.base.typography[300],
    borderRadius: ".8rem",
    background: colorTheme.color.button.primary.bg,
    border: "none",
    cursor: "pointer",
    marginTop: Theme.spacing(2),
    "&:hover": {
      background: colorTheme.color.button.primary.hover,
      color: colorTheme.color.base.typography[0]
    }
  },
  prevBtn: {
    maxWidth: "23.5rem",
    width: "100%",
    height: "4.8rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: Theme.typography.body3.fontSize,
    color: colorTheme.color.base.typography[300],
    borderRadius: ".8rem",
    border: `.1rem solid ${colorTheme.color.border[0]}`,
    background: colorTheme.color.button.secondary.bg,
    cursor: "pointer",
    marginTop: Theme.spacing(2),
    "&:hover": {
      background: colorTheme.color.button.secondary.hover,
      border: `.1rem solid ${colorTheme.color.button.secondary.hover}`
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
    bottom: "-3rem",
    color: colorTheme.color.input.borderError
  },
  imageBox: {
    maxWidth: "57rem",
    width: "100%",
    [Theme.breakpoints.down(960)]: {
      display: "none"
    }
  },
  image: {
    maxWidth: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    borderRadius: "0 2rem 2rem 0"
  }
}));
