import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  listWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    maxWidth: "116rem",
    width: "100%",
    borderTop: `1px solid ${colorTheme.color.base.typography[300]}`,
    padding: Theme.spacing(2.5),
    [Theme.breakpoints.down(960)]: {
      marginBottom: Theme.spacing(10.5)
    },
    [Theme.breakpoints.down(728)]: {
      marginBottom: Theme.spacing(5.5)
    }
  },
  foundPetsListItemWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem"
  },
  foundPetsListItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Theme.spacing(2.5),
    gap: "2rem",
    borderBottom: `1px solid ${colorTheme.color.base.typography[300]}`,
    [Theme.breakpoints.down(960)]: {
      flexWrap: "wrap"
    }
  },
  formControlLabel: {
    "& .MuiButtonBase-root": {
      padding: "0"
    }
  },
  checkboxMui: {
    "& .MuiSvgIcon-root": {
      fontSize: Theme.typography.h6.fontSize
    }
  },
  elemValue: {
    fontSize: Theme.typography.h6.fontSize,
    fontWeight: Theme.typography.h6.fontWeight,
    [Theme.breakpoints.down(960)]: {
      fontSize: Theme.typography.body1.fontSize
    }
  },
  elemLabel: {
    fontSize: Theme.typography.body1.fontSize,
    fontWeight: Theme.typography.h3.fontWeight,
    [Theme.breakpoints.down(960)]: {
      fontSize: Theme.typography.body1.fontSize
    }
  },
  editIcon: {
    cursor: "pointer"
  },
  iconsBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "2rem"
  },
  deleteBtnWrapper: {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    marginBottom: Theme.spacing(4),
    zIndex: Theme.zIndex.appBar
  },
  deleteBtn: {
    maxWidth: "23.5rem",
    width: "100%",
    height: "4.8rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: Theme.typography.body3.fontSize,
    color: colorTheme.color.base.typography[0],
    borderRadius: ".8rem",
    background: colorTheme.color.input.borderError,
    border: "none",
    cursor: "pointer",
    padding: Theme.spacing(0, 1),
    marginTop: Theme.spacing(2),
    "&:hover": {
      background: colorTheme.color.button.primary.hover,
      color: colorTheme.color.base.typography[0]
    }
  }
}));
