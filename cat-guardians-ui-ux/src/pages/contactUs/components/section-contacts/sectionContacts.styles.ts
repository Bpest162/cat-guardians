import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  sextionContactsWrapper: {
    background: colorTheme.color.base.background[0],
    borderRadius: Theme.spacing(3.75, 3.75, 0, 0),
    padding: Theme.spacing(12.875, 5, 10.875, 5),
    [Theme.breakpoints.down(728)]: {
      background: colorTheme.color.base.background[20],
      padding: Theme.spacing(0, 0, 2.5, 0)
    }
  },
  menuWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    background: colorTheme.color.base.background[0],
    marginBottom: "7.6rem",
    gap: "4rem",
    [Theme.breakpoints.down(1000)]: {
      flexDirection: "row",
      flexWrap: "wrap"
    },
    [Theme.breakpoints.down(728)]: {
      flexDirection: "column",
      background: colorTheme.color.base.background[20],
      marginBottom: "3.6rem"
    }
  },
  contactsMenu: {
    display: "flex",
    flexDirection: "column",
    gap: "1.6rem",
    [Theme.breakpoints.down(728)]: {
      padding: Theme.spacing(0, 1.25, 2.5, 1.25),
      borderBottom: `.1rem solid ${colorTheme.color.border[30]}`,
      maxWidth: "100vw",
      width: "100vw",
      margin: "0 calc(-50vw + 50%)"
    }
  },
  contactsMenuTitle: {
    fontSize: Theme.typography.h6.fontSize,
    fontWeight: Theme.typography.h4.fontWeight,
    lineHeight: Theme.typography.h6.lineHeight,
    color: colorTheme.color.base.typography[300],
    marginBottom: "1rem",
    [Theme.breakpoints.down(728)]: {
      fontSize: Theme.typography.body1.fontSize,
      fontWeight: Theme.typography.h4.fontWeight,
      lineHeight: Theme.typography.body1.lineHeight
    }
  },
  contactsMenuItem: {
    fontSize: Theme.typography.body3.fontSize,
    fontWeight: Theme.typography.body3.fontWeight,
    lineHeight: Theme.typography.body3.lineHeight,
    color: colorTheme.color.base.typography[200],
    display: "flex",
    alignItems: "center",
    gap: ".8rem"
  },
  locationTextWrapper: {
    width: "100%",
    textAlign: "start"
  },
  locationText: {
    fontSize: Theme.typography.body2.fontSize,
    fontWeight: Theme.typography.body2.fontWeight,
    lineHeight: Theme.typography.body2.lineHeight,
    color: colorTheme.color.base.typography[300]
  }
}));
