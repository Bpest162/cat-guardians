import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  addFormContainer: {
    maxWidth: "116rem",
    width: "100%",
    background: colorTheme.color.base.background[0],
    padding: Theme.spacing(3, 4),
    borderRadius: "4rem",
    zIndex: Theme.zIndex.appBar
  },
  addForm: {
    display: "flex",
    flexDirection: "column",
    gap: "2.5rem"
  },
  addFormHeader: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "2rem",
    marginBottom: Theme.spacing(5)
  },
  closeBtn: {
    maxWidth: "15rem",
    width: "100%",
    height: "3rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: Theme.typography.body3.fontSize,
    color: colorTheme.color.base.typography[300],
    borderRadius: ".8rem",
    background: colorTheme.color.button.primary.bg,
    border: "none",
    cursor: "pointer",
    "&:hover": {
      background: colorTheme.color.button.primary.hover,
      color: colorTheme.color.base.typography[0]
    }
  },
  inputBox: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "2rem",
    [Theme.breakpoints.down(960)]: {
      gridTemplateColumns: "1fr"
    }
  },
  formLabel: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    fontSize: Theme.typography.body3.fontSize,
    lineHeight: Theme.typography.body3.lineHeight,
    fontWeight: Theme.typography.h6.fontWeight,
    color: colorTheme.color.base.typography[300]
  },
  formInput: {
    width: "100%",
    height: "4.8rem",
    fontSize: Theme.typography.body4.fontSize,
    lineHeight: Theme.typography.body4.lineHeight,
    fontWeight: Theme.typography.body4.fontWeight,
    border: `.1rem solid ${colorTheme.color.border[70]}`,
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
  textAreaLabel: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    fontSize: Theme.typography.body3.fontSize,
    lineHeight: Theme.typography.body3.lineHeight,
    fontWeight: Theme.typography.h6.fontWeight,
    color: colorTheme.color.base.typography[300]
  },
  formTextArea: {
    width: "100%",
    height: "10rem",
    fontSize: Theme.typography.body4.fontSize,
    lineHeight: Theme.typography.body4.lineHeight,
    fontWeight: Theme.typography.body4.fontWeight,
    border: `.1rem solid ${colorTheme.color.border[70]}`,
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
  fileArea: {
    position: "relative",
    maxWidth: "100%",
    padding: Theme.spacing(4),
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
    gap: "2rem",
    background: colorTheme.color.base.background[300],
    border: `.1rem dashed ${colorTheme.color.base.background[600]}`,
    borderRadius: "1.7rem",
    marginTop: Theme.spacing(2.5),
    [Theme.breakpoints.down(911)]: {
      gridTemplateColumns: "1fr"
    }
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
  imageWrapper: {
    display: "flex",
    gap: "1.5rem",
    flexWrap: "wrap"
  },
  img: {
    width: "12rem",
    height: "12rem",
    objectFit: "cover",
    objectPosition: "center"
  },
  imgContainer: {
    position: "relative"
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
  formErrorMsg: {
    position: "absolute",
    fontSize: Theme.typography.body2.fontSize,
    left: "1rem",
    top: "-3rem",
    color: colorTheme.color.input.borderError
  },
  deleteIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "2rem",
    height: "2rem",
    background: colorTheme.color.button.primary.bg,
    position: "absolute",
    top: ".5rem",
    right: ".5rem",
    cursor: "pointer"
  },
  createBtn: {
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
  }
}));
