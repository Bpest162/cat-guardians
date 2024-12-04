import { Box } from "@mui/material";
import React, { FC } from "react";

import Footer from "./footer/appFooter";
import Header from "./header/appHeader";
import { useStyles } from "./layout.styles";

type LayoutProps = {
  children: React.ReactNode;
  showNavigation?: boolean;
};

const Layout: FC<LayoutProps> = ({ children, showNavigation = false }) => {
  const { classes } = useStyles({ showNavigation });

  return (
    <Box className={classes.wrapper}>
      <Header />
      {showNavigation && <span className={classes.secondNavigation}>Second navigation</span>}

      <Box className={classes.container}>
        <Box className={classes.defaultLayout}>{children}</Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
