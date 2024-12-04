import React from "react";
import { useTranslation } from "react-i18next";
import CustomLinkButton from "src/components/buttons/CustomLinkButton";
import { ROUTES } from "src/constants/routing/urls";

import catImage from "../../../../assets/catImg.png";
import { useStyles } from "./firstSection.styles";

const FirstSection = () => {
  const { classes } = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.firstSection}>
      <div className={classes.firstSectionLeftWrap}>
        <h1 className={classes.leftWrapTitle}>
          {t("pages.home.WelcomeMessage")} <br /> Cat Guardians
        </h1>
        <p className={classes.text}>{t("pages.home.supportText")}</p>
        <div className={classes.linksWrap}>
          <CustomLinkButton
            className={classes.linksPrimary}
            to={ROUTES.DONATE}
            title={t("pages.home.Donate")}
          />
          <CustomLinkButton
            className={classes.linksSecondary}
            to={ROUTES.PETSLIST}
            title={t("pages.home.checkOurCats")}
          />
        </div>
      </div>
      <div className={classes.imgBox}>
        <img className={classes.img} src={catImage} alt="cat" />
      </div>
    </div>
  );
};
export default FirstSection;
