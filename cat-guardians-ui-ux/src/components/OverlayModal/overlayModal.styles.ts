import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  wrapper: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: colorTheme.color.overlayModalBackground,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: Theme.spacing(1.25),
    zIndex: Theme.zIndex.appBar
  },
  container: {
    maxWidth: "116rem",
    width: "100%",
    background: colorTheme.color.base.background[0],
    padding: Theme.spacing(8.75),
    borderRadius: "4rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "3rem",
    [Theme.breakpoints.down(960)]: {
      padding: Theme.spacing(3.75)
    }
  },
  modalTitle: {
    color: colorTheme.color.base.typography[40],
    fontSize: Theme.typography.h1.fontSize,
    fontWeight: Theme.typography.h6.fontWeight,
    textAlign: "center",
    [Theme.breakpoints.down(728)]: {
      fontSize: Theme.typography.h4.fontSize
    }
  },
  modalTextBox: {
    width: "70%",
    textAlign: "center",
    marginBottom: Theme.spacing(2)
  },
  modalText: {
    color: colorTheme.color.base.typography[300],
    fontSize: Theme.typography.body1.fontSize,
    fontWeight: Theme.typography.body1.fontWeight,
    lineHeight: Theme.typography.body1.lineHeight
  },
  linkBtn: {
    maxWidth: "100%",
    width: "100%",
    height: "7rem",
    background: colorTheme.color.button.primary.bg,
    fontSize: Theme.typography.h6.fontSize,
    lineHeight: Theme.typography.body2.lineHeight,
    fontWeight: Theme.typography.h3.fontWeight,
    color: colorTheme.color.base.typography[300],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "none",
    borderRadius: "2rem",
    cursor: "pointer",
    transition: ".4s",
    "&:hover": {
      background: colorTheme.color.button.primary.hover,
      color: colorTheme.color.base.typography[0]
    }
  }
}));
