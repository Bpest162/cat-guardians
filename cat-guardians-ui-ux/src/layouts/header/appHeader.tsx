import React from "react"; //without import catch error
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import UserProfileIcon from "src/components/icons/UserProfileIcon";
import { LengEnam } from "src/constants/multiLeng-config/leng-enam";
import { ROUTES } from "src/constants/routing/urls";
import { colorTheme } from "src/theme/themeVariables";

import logo from "../../assets/Logo.svg";
import Navigation from "../navigation/navigation";
import { useStyles } from "./appHeader.styles";

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const { classes } = useStyles({ pathname });
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language;

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div>
          <img className={classes.logo} src={logo} alt="logo" />
        </div>
        <Navigation />
        <div className={classes.multyLengButtonsWrap}>
          <button
            onClick={() => changeLanguage(LengEnam.UA)}
            className={`${classes.multyLengButton} ${
              currentLanguage === LengEnam.UA ? classes.multyLengButtonActive : ""
            }`}
          >
            UA
          </button>
          <button
            onClick={() => changeLanguage(LengEnam.EN)}
            className={`${classes.multyLengButton} ${
              currentLanguage === LengEnam.EN ? classes.multyLengButtonActive : ""
            }`}
          >
            EN
          </button>
        </div>
        <NavLink to={ROUTES.LOGIN} className={classes.userProfile}>
          <UserProfileIcon width="26" height="26" color={colorTheme.color.base.typography[300]} />
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
