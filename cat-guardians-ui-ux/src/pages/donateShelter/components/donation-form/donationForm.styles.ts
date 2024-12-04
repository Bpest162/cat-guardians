import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  sectionDonationBox: {
    display: "flex",
    justifyContent: "center",
    width: "100%"
  },
  paymentsWrapper: {
    maxWidth: "61.2rem",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1.9rem",
    borderRadius: "2rem 0 0 2rem",
    padding: Theme.spacing(5.3, 5.6, 8.6, 5.6),
    background: colorTheme.color.base.background[0],
    [Theme.breakpoints.down(1100)]: {
      borderRadius: "2rem"
    },
    [Theme.breakpoints.down(728)]: {
      maxWidth: "100vw",
      width: "100vw",
      margin: "0 calc(-50vw + 50%)",
      borderRadius: "0",
      padding: Theme.spacing(5.6)
    }
  },
  horizontalLine: {
    borderTop: `0.1rem solid ${colorTheme.color.border[30]}`,
    width: "100%",
    margin: Theme.spacing(0.9, 0)
  },
  currencySection: {
    width: "100%"
  },
  currencyList: {
    display: "flex",
    fontSize: Theme.typography.body1.fontSize,
    fontWeight: Theme.typography.body1.fontWeight,
    lineHeight: Theme.typography.body1.lineHeight,
    margin: Theme.spacing(1, 0, 4, 0),
    cursor: "pointer",
    listStyleType: "circle"
  },
  amountWrapper: {
    width: "100%",
    flexDirection: "column",
    gap: "1rem",
    margin: Theme.spacing(0, 0, 1.6, 0)
  },
  buttonContainer: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, auto)",
    rowGap: "1.6rem",
    columnGap: "4.6rem",
    margin: Theme.spacing(-0.35, 0, 2, 0),
    [Theme.breakpoints.down(620)]: {
      gridTemplateColumns: "repeat(3, auto)",
      columnGap: "1rem",
      justifyContent: "space-between"
    },
    [Theme.breakpoints.down(520)]: {
      gridTemplateColumns: "repeat(2, auto)",
      justifyContent: "space-between",
      rowGap: "1rem"
    }
  },
  inputCustomAmount: {
    width: "30.2rem",
    height: "4.8rem",
    padding: Theme.spacing(0, 0, 0, 2.5),
    fontSize: Theme.typography.body3.fontSize,
    color: colorTheme.color.base.typography[80],
    borderRadius: ".8rem",
    background: colorTheme.color.base.background[0],
    border: `0.1rem solid ${colorTheme.color.border[40]}`,
    paddingInlineStart: "2.5rem",
    "& .MuiInputBase-input.MuiInput-input": {
      padding: Theme.spacing(1.2, 0, 0, 0),
      fontSize: Theme.typography.body3.fontSize
    },
    "&:hover": {
      background: colorTheme.color.button.secondaryVariant.hover,
      border: `0.1rem solid ${colorTheme.color.border[40]}`
    },
    [Theme.breakpoints.down(520)]: {
      width: "100%"
    }
  },
  commentHeader: {
    fontSize: Theme.typography.body3.fontSize,
    margin: Theme.spacing(3, 0, 0.5, 0)
  },
  inputComment: {
    width: "100%",
    height: "5.8rem",
    padding: Theme.spacing(0, 0, 0, 2.5),
    margin: Theme.spacing(0, 0, 1, 0),
    color: colorTheme.color.base.typography[90],
    borderRadius: ".8rem",
    background: colorTheme.color.base.background[0],
    border: `0.1rem solid ${colorTheme.color.border[40]}`,
    paddingInlineStart: "2.5rem",
    "& .MuiInputBase-input.MuiInput-input": {
      padding: Theme.spacing(2.1, 0, 0, 0),
      fontSize: Theme.typography.body4.fontSize
    },
    "&:hover": {
      background: colorTheme.color.button.secondaryVariant.hover,
      border: `0.1rem solid ${colorTheme.color.border[40]}`
    }
  },
  formLabel: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    margin: Theme.spacing(1, 0, 0, 0),
    gap: "0.4rem",
    fontSize: Theme.typography.body3.fontSize,
    lineHeight: Theme.typography.body3.lineHeight,
    fontWeight: Theme.typography.body3.fontWeight
  },
  linksSecondary: {
    minWidth: "13.6rem",
    width: "100%",
    height: "4.8rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: Theme.typography.button.fontSize,
    color: colorTheme.color.base.typography[300],
    borderRadius: "0.8rem",
    background: colorTheme.color.base.background[0],
    border: `0.1rem solid ${colorTheme.color.border[40]}`,
    "&.MuiFormControlLabel-root": {
      margin: Theme.spacing(0, 0, 0, 0)
    },
    "&:hover": {
      background: colorTheme.color.button.secondaryVariant.hover,
      border: `0.1rem solid ${colorTheme.color.border[40]}`
    },
    [Theme.breakpoints.down(800)]: {
      fontSize: Theme.typography.body3.fontSize
    },
    [Theme.breakpoints.between(450, 520)]: {
      minWidth: "17rem"
    }
  },
  activeButton: {
    background: colorTheme.color.button.secondaryVariant.hover
  },
  linksPrimary: {
    width: "100%",
    padding: Theme.spacing(1.8, 0),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: Theme.typography.button.fontSize,
    color: colorTheme.color.base.typography[300],
    borderRadius: "0.8rem",
    background: colorTheme.color.button.primary.bg,
    border: "none",
    "&:hover": {
      background: colorTheme.color.button.primary.hover,
      color: colorTheme.color.base.typography[0]
    }
  },
  text: {
    color: colorTheme.color.base.typography[300],
    fontSize: Theme.typography.body1.fontSize,
    fontWeight: Theme.typography.body1.fontWeight,
    lineHeight: Theme.typography.body1.lineHeight
  },
  imgBox: {
    position: "relative",
    maxWidth: "57rem",
    width: "100%",
    [Theme.breakpoints.down(1100)]: {
      display: "none"
    }
  },
  image: {
    maxWidth: "100%",
    objectFit: "cover",
    objectPosition: "center",
    height: "100%",
    borderRadius: "0 2rem 2rem 0"
  },
  paymentsTime: {
    display: "flex",
    gap: "5rem"
  },
  paymentsRadioGroup: {
    gap: "4rem"
  },
  customRadioIcon: {
    "& .MuiSvgIcon-root": {
      fontSize: "1.8rem",
      gap: "5rem"
    }
  },
  currencyRadioGroup: {
    gap: "4rem",
    [Theme.breakpoints.down(440)]: {
      gap: "2rem"
    }
  },
  paymentMethodTitleWrapper: {
    width: "100%",
    textAlign: "start",
    margin: Theme.spacing(1, 0, 0, 0)
  },
  paymentMethodTitle: {
    display: "inline-block",
    fontWeight: Theme.typography.body1.fontWeight,
    lineHeight: Theme.typography.body1.lineHeight,
    margin: Theme.spacing(0, 1.7, 0, 0),
    color: colorTheme.color.base.typography[300],
    fontSize: Theme.typography.body1.fontSize
  },
  paymentMethodContainer: {
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    margin: Theme.spacing(0, 0, 3.6, 1)
  },
  gridItem: {
    border: `0.1rem solid ${colorTheme.color.border[50]}`,
    borderRadius: "0.8rem",
    "&:hover": {
      border: `0.1rem solid ${colorTheme.color.border[60]}`
    },
    width: "15.8rem",
    height: "10.6rem",
    margin: Theme.spacing(0, 4.1, 0, 0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  gridItemIsActive: {
    border: `0.1rem solid ${colorTheme.color.border[60]}`
  },
  termsWrapper: {
    width: "100%",
    margin: Theme.spacing(-2.4, 0, 0.5, 0)
  },
  checkbox: {
    "& .MuiSvgIcon-root": {
      fontSize: Theme.typography.h6.fontSize,
      padding: Theme.spacing(0),
      color: colorTheme.color.base.typography[60]
    }
  },
  termsParagraph: {
    color: colorTheme.color.base.typography[600],
    fontSize: Theme.typography.body3.fontSize
  },
  linkTerms: {
    color: colorTheme.color.base.typography[40]
  },
  customRadio: {
    position: "absolute",
    width: "0.1rem",
    height: "0.1rem",
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    "&.Mui-checked": {
      border: `0.1rem solid ${colorTheme.color.border[60]}`
    }
  },
  textFieldBox: {
    display: "flex",
    flexDirection: "column",
    position: "relative"
  },
  errorMessage: {
    position: "absolute",
    bottom: "-3rem",
    left: "4rem",
    fontSize: Theme.typography.body5.fontSize,
    color: colorTheme.color.input.borderError,
    animation: "blink 1s infinite alternate",
    zIndex: "1000"
  }
}));
