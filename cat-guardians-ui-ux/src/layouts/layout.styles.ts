import { Theme } from "@mui/material";
import { colorTheme } from "src/theme/themeVariables";
import { makeStyles } from "tss-react/mui";

interface IStylesProps {
  showNavigation: boolean;
}

export const useStyles = makeStyles<IStylesProps>()(({ zIndex }: Theme, { showNavigation }) => {
  return {
    wrapper: {
      position: "relative",
      height: "auto",
      minHeight: "100vh",
      width: "100%",
      overflow: "hidden"
    },
    container: {
      paddingTop: showNavigation ? "8rem" : "0rem",
      height: "auto",
      width: "100%",
      backgroundColor: colorTheme.color.base.background[0]
    },

    defaultLayout: {
      width: "100%",
      height: "100%"
    },

    secondNavigation: {
      position: "absolute",
      zIndex: zIndex.appBar,
      color: "red",
      margin: "3.125rem 0 0 1.25rem"
    }
  };
});
