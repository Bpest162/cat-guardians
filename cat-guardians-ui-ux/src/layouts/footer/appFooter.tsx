import { Box } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import FaceBookIcon from "src/components/icons/FaceBIcon";
import InstIcon from "src/components/icons/InstIcon";
import TgIcon from "src/components/icons/TgIcon";
import { ROUTES } from "src/constants/routing/urls";

import logo from "../../assets/Logo.svg";
import { useStyles } from "./appFooter.styles";

const Footer: React.FC = () => {
  const { pathname } = useLocation();
  const { classes } = useStyles({ pathname });
  const { t } = useTranslation();

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Box className={classes.logoBox}>
          <img className={classes.logo} src={logo} alt="" />
        </Box>
        <div className={classes.linksBox}>
          <ul className={[classes["social"], classes.menu].join(" ")}>
            <h4 className={classes.menuTitle}>{t("footer.socialMedia")}</h4>
            <li className={classes.socialIcons}>
              <Link to="https://facebook.com/catguardians">
                <FaceBookIcon width="41" height="41" />
              </Link>
              <Link to="https://instagram.com/cat-guardians">
                <InstIcon width="35" height="35" />
              </Link>
              <Link to="t.me/cat-guardians">
                <TgIcon width="35" height="35" />
              </Link>
            </li>
          </ul>
          <ul className={[classes["help"], classes.menu].join(" ")}>
            <h4 className={classes.menuTitle}>{t("footer.helpToUs")}</h4>
            <Link to={ROUTES.DONATE} className={classes.menuItem}>
              {t("footer.menuItem.donation")}
            </Link>
            <Link to={ROUTES.PETSLIST} className={classes.menuItem}>
              {t("footer.menuItem.adoption")}
            </Link>
          </ul>
          <ul className={[classes["contact"], classes.menu].join(" ")}>
            <h4 className={classes.menuTitle}>{t("footer.contactUs")}</h4>
            <Link to="mailto: info@catsshelter.com" className={classes.menuItem}>
              info@catsshelter.com
            </Link>
            <Link to="tel: 1-800-200-300" className={classes.menuItem}>
              1-800-200-300
            </Link>
            <li className={classes.menuItem}>
              {t("footer.menuItem.address.street")}
              <br /> {t("footer.menuItem.address.city")}
              <br /> {t("footer.menuItem.address.country")}
            </li>
          </ul>
        </div>
      </div>
      <div className={classes.copyrightBox}>
        <p className={classes.copyrightBoxText}>© Copyright CAT GUARDIANS Inc. </p>
      </div>
    </div>
  );
};

export default Footer;
