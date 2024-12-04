import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CloseMenuIcon from "src/components/icons/CloseMenuIcon";
import MenuIcon from "src/components/icons/MenuIcon";
import pagesList from "src/constants/pageList/pageList";
import { ROUTES } from "src/constants/routing/urls";
import { selectAuthUser } from "src/store/sharedStore/authStore/selectors";
import { colorTheme } from "src/theme/themeVariables";

import { useStyles } from "./navigation.styles";

const Navigation: React.FC = () => {
  const [nav, setNav] = useState(false);
  const { classes } = useStyles();
  const { t } = useTranslation();

  const user = useSelector(selectAuthUser);
  const isAdmin = user?.isAdmin === true;

  const handleCloseMenu = () => {
    setNav(false);
  };

  return (
    <Box className={classes.navigationWrapper}>
      <Box
        className={
          nav
            ? [classes.navContainer, classes.activeNavContainer].join(" ")
            : ([classes.navContainer] as never)
        }
      >
        {pagesList.map((page) => (
          <NavLink
            to={page.to}
            key={page.id}
            className={classes.navItemLink}
            onClick={handleCloseMenu}
          >
            {t(`menu.${page.title}`)}
          </NavLink>
        ))}
      </Box>
      {isAdmin && (
        <NavLink to={ROUTES.ADMIN} className={classes.adminPanelWrapper}>
          <AdminPanelSettingsIcon className={classes.adminPanel} />
        </NavLink>
      )}
      <div onClick={() => setNav(!nav)} className={classes.mobileMenu}>
        {nav ? (
          <CloseMenuIcon width="64" height="64" color={colorTheme.color.base.typography[300]} />
        ) : (
          <MenuIcon width="64" height="64" color={colorTheme.color.base.typography[300]} />
        )}
      </div>
    </Box>
  );
};

export default Navigation;
