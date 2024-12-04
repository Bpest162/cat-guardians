import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import Ellipse from "src/components/bg-decor/Ellipse";
import { ROUTES } from "src/constants/routing/urls";

import catImage2 from "../../../../assets/catsImages.png";
import { useStyles } from "./secondSection.styles";

const SecondSection = () => {
  const { classes } = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.secondSection}>
      <div className={classes.secondSectionTitleWrap}>
        <h2 className={classes.secondSectionTitle}>{t("pages.home.secondTitle")}</h2>
      </div>
      <div className={classes.sectionDesc}>
        <div className={classes.imgBox}>
          <img className={classes.img2} src={catImage2} alt="cats" />
        </div>
        <div className={classes.sectionDescTextWrap}>
          <Ellipse className={classes.mdEllipse} />
          <p className={classes.text}>{t("pages.home.secondSupportText")}</p>
        </div>
      </div>
      <div className={classes.secondSectionSecondaryTitleWrap}>
        <h3 className={classes.sectionsQuestionsTitle}>
          {t("pages.home.haveQuestions")}
          <NavLink to={ROUTES.CONTACTUS} className={classes.contactLinks}>
            {" "}
            {t("pages.home.contactUs")}
          </NavLink>
        </h3>
      </div>
    </div>
  );
};
export default SecondSection;
