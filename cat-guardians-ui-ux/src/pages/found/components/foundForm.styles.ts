import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  formWrapper: {
    width: "100%",
    display: "flex",
    background: colorTheme.color.base.background[0],
    borderRadius: "2rem",
    marginBottom: Theme.spacing(13),
    overflow: "hidden",
    [Theme.breakpoints.down(728)]: {
      background: "none",
      borderRadius: "0"
    }
  },
  form: {
    maxWidth: "56.8rem",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    padding: Theme.spacing(4.75, 6),
    [Theme.breakpoints.down(960)]: {
      maxWidth: "100%"
    },
    [Theme.breakpoints.down(728)]: {
      padding: Theme.spacing(0)
    }
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
    borderRadius: "2rem",
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
    width: "100%",
    height: "5.8rem",
    fontSize: Theme.typography.body3.fontSize,
    lineHeight: Theme.typography.body3.lineHeight,
    fontWeight: Theme.typography.body3.fontWeight,
    border: `.1rem solid ${colorTheme.color.input.borderError}`,
    borderRadius: "2rem",
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
  formTextArea: {
    width: "100%",
    height: "14.4rem",
    fontSize: Theme.typography.body3.fontSize,
    lineHeight: Theme.typography.body3.lineHeight,
    fontWeight: Theme.typography.body3.fontWeight,
    border: `.1rem solid ${colorTheme.color.input.boderDefault}`,
    borderRadius: "2rem",
    padding: Theme.spacing(1.875, 3.125),
    "&::placeholder": {
      fontSize: Theme.typography.body4.fontSize,
      lineHeight: Theme.typography.body4.lineHeight,
      fontWeight: Theme.typography.body4.fontWeight
    },
    "&:focus": {
      outline: "none"
    }
  },
  errorformTextArea: {
    width: "100%",
    height: "14.4rem",
    fontSize: Theme.typography.body3.fontSize,
    lineHeight: Theme.typography.body3.lineHeight,
    fontWeight: Theme.typography.body3.fontWeight,
    border: `.1rem solid ${colorTheme.color.input.borderError}`,
    borderRadius: "2rem",
    padding: Theme.spacing(1.875, 3.125),
    "&::placeholder": {
      fontSize: Theme.typography.body4.fontSize,
      lineHeight: Theme.typography.body4.lineHeight,
      fontWeight: Theme.typography.body4.fontWeight
    },
    "&:focus": {
      outline: "none"
    }
  },
  fileArea: {
    maxWidth: "100%",
    padding: Theme.spacing(4, 0),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "2rem",
    background: colorTheme.color.base.background[300],
    border: `.1rem dashed ${colorTheme.color.base.background[600]}`,
    borderRadius: "1.7rem",
    marginTop: Theme.spacing(2.5)
  },
  fileAreaLabel: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    gap: "2rem"
  },
  uploadInput: {
    position: "absolute",
    clip: "rect(0 0 0 0)",
    width: ".1rem",
    height: ".1rem",
    margin: "-0.1rem"
  },
  submitButton: {
    width: "100%",
    height: "6rem",
    background: colorTheme.color.button.primary.bg,
    fontSize: Theme.typography.body2.fontSize,
    lineHeight: Theme.typography.body2.lineHeight,
    fontWeight: Theme.typography.h3.fontWeight,
    border: "none",
    borderRadius: ".8rem",
    cursor: "pointer",
    transition: ".4s",
    "&:hover": {
      background: colorTheme.color.button.primary.hover,
      color: colorTheme.color.base.typography[0]
    }
  },
  formErrorMsg: {
    position: "absolute",
    fontSize: Theme.typography.body5.fontSize,
    right: "1rem",
    bottom: "-3rem",
    color: colorTheme.color.input.borderError
  },
  imageWrapper: {
    position: "relative",
    maxWidth: "59.1rem",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [Theme.breakpoints.down(960)]: {
      display: "none"
    }
  },
  image: {
    maxWidth: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center"
  },
  imageWrapperMobile: {
    display: "none",
    [Theme.breakpoints.down(960)]: {
      display: "block"
    }
  },
  imageMobile: {
    width: "30rem",
    height: "30rem",
    objectFit: "cover",
    objectPosition: "center"
  },
  dragDropFileText: {
    fontSize: Theme.typography.body3.fontSize,
    lineHeight: Theme.typography.body3.lineHeight,
    fontWeight: Theme.typography.h6.fontWeight,
    color: colorTheme.color.base.typography[300],
    span: {
      fontSize: Theme.typography.body3.fontSize,
      lineHeight: Theme.typography.body3.lineHeight,
      fontWeight: Theme.typography.h6.fontWeight,
      color: colorTheme.color.base.typography[500]
    }
  },
  formatsText: {
    fontSize: Theme.typography.body5.fontSize,
    color: colorTheme.color.base.typography[20]
  },
  fileName: {
    fontSize: Theme.typography.body5.fontSize,
    color: colorTheme.color.base.typography[20],
    display: "flex",
    gap: "3rem"
  },
  fileNameDeleteIcon: {
    cursor: "pointer"
  },
  tgLink: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "2rem",
    color: colorTheme.color.base.typography[30],
    fontSize: Theme.typography.body1.fontSize,
    lineHeight: Theme.typography.body1.lineHeight
  }
}));
