import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    body3: React.CSSProperties;
    body4: React.CSSProperties;
    body5: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    body3?: React.CSSProperties;
    body4: React.CSSProperties;
    body5: React.CSSProperties;
  }
}
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    body3: true;
    body4: true;
    body5: true;
  }
}

export default {
  createDefaultTheme() {
    return createTheme({
      palette: {
        primary: {
          light: "#F9F6FF",
          main: "#794FDC",
          dark: "#34225F"
        },
        secondary: {
          main: "#ff8025",
          dark: "#604D8E",
          light: "#DDD5F2"
        }
      },
      zIndex: {
        appBar: 99,
        drawer: 50,
        modal: 0,
        snackbar: -1
      },
      typography: {
        h1: {
          fontSize: 72,
          fontWeight: 500,
          letterSpacing: "-.144rem",
          lineHeight: "7rem"
        },
        h2: {
          fontSize: 60,
          fontWeight: 400,
          lineHeight: "9rem",
          letterSpacing: "-.12rem"
        },
        h3: {
          fontSize: 48,
          lineHeight: "7.2rem",
          letterSpacing: "-.096rem",
          fontWeight: 500
        },
        h4: {
          fontSize: 36,
          lineHeight: "4.8rem",
          letterSpacing: "-0.04em",
          fontWeight: 600
        },
        h5: {
          fontSize: 32,
          lineHeight: "4rem"
        },
        h6: {
          fontSize: 24,
          lineHeight: "3.6rem",
          fontWeight: 700
        },
        body1: {
          fontSize: 20,
          fontWeight: 400,
          lineHeight: "3rem"
        },
        body2: {
          fontSize: 18,
          lineHeight: "2.8rem",
          fontWeight: 400
        },
        body3: {
          fontSize: 16,
          lineHeight: "2.4rem",
          fontWeight: 400
        },
        body4: {
          fontSize: 14,
          lineHeight: ".8rem",
          fontWeight: 400
        },
        body5: {
          fontSize: 12,
          lineHeight: "1.8rem",
          fontWeight: 400
        },
        button: {
          fontSize: 18,
          lineHeight: "2rem",
          fontWeight: 400
        },
        fontFamily: ["Nunito", "-apple-system"].join(",")
      }
    });
  }
};
