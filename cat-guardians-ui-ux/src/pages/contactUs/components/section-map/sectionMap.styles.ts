import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((Theme) => ({
  mapContainer: {
    width: "100%",
    height: "45.6rem",
    borderRadius: Theme.spacing(0, 0, 3.75, 3.75),
    [Theme.breakpoints.down(728)]: {
      maxWidth: "100vw",
      width: "100vw",
      margin: "0 calc(-50vw + 50%)",
      borderRadius: "0",
      height: "23.5rem"
    }
  }
}));
