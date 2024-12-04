import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  editFormContainer: {
    maxWidth: "116rem",
    width: "100%",
    background: colorTheme.color.base.background[0],
    padding: Theme.spacing(3, 4),
    borderRadius: "4rem"
  },
  editForm: {
    display: "flex",
    flexDirection: "column",
    gap: "2.5rem"
  },
  editFormHeader: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "2rem",
    marginBottom: Theme.spacing(5)
  },
  title: {
    fontSize: Theme.typography.h2.fontSize,
    fontWeight: Theme.typography.h6.fontWeight,
    [Theme.breakpoints.down(960)]: {
      fontSize: Theme.typography.body1.fontSize
    }
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
    height: "5.8rem",
    fontSize: Theme.typography.body3.fontSize,
    lineHeight: Theme.typography.body3.lineHeight,
    fontWeight: Theme.typography.body3.fontWeight,
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
  zIndex: {
    zIndex: Theme.zIndex.appBar
  },
  textAreaLabel: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    fontSize: Theme.typography.body3.fontSize,
    lineHeight: Theme.typography.body3.lineHeight,
    fontWeight: Theme.typography.h6.fontWeight,
    color: colorTheme.color.base.typography[300]
  },
  formTextArea: {
    width: "100%",
    height: "13rem",
    fontSize: Theme.typography.body3.fontSize,
    lineHeight: Theme.typography.body3.lineHeight,
    fontWeight: Theme.typography.body3.fontWeight,
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
  saveBtn: {
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
