import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  checkBoxesBlock: {
    maxWidth: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "2.4rem",
    padding: Theme.spacing(5, 9.75, 9.75, 5),
    [Theme.breakpoints.down(960)]: {
      padding: Theme.spacing(4, 3, 4, 3)
    }
  },
  checkboxGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "1.6rem"
  },
  checkboxLabel: {
    fontSize: Theme.typography.body3.fontSize,
    lineHeight: Theme.typography.body3.lineHeight,
    fontWeight: Theme.typography.body3.fontWeight,
    color: colorTheme.color.base.typography[300]
  },
  checkboxMui: {
    "& .MuiSvgIcon-root": {
      fontSize: Theme.typography.h6.fontSize
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
  errorMsg: {
    fontSize: Theme.typography.body3.fontSize,
    lineHeight: Theme.typography.body3.lineHeight,
    fontWeight: Theme.typography.body3.fontWeight,
    color: colorTheme.color.input.borderError
  }
}));
