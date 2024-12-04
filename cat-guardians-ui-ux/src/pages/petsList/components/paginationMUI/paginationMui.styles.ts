import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  paginationWrap: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: "10rem",
    [Theme.breakpoints.down(960)]: {
      marginBottom: "7rem"
    },
    [Theme.breakpoints.down(728)]: {
      marginBottom: "4rem"
    }
  }
}));
