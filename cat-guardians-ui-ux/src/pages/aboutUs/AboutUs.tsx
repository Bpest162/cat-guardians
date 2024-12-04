import React from "react";
import { useTranslation } from "react-i18next";
import Ellipse from "src/components/bg-decor/Ellipse";

import { useStyles } from "./aboutus.styles";
import SectionAboutUs from "./components/section-aboutUs/SectionAboutUs";
import SectionOurTeam from "./components/section-ourTeam/SectionOurTeam";

const AboutUs: React.FC = () => {
  const { classes } = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.wrapper}>
      <Ellipse className={classes.pageEllipse} />
      <div className={classes.container}>
        <div className={classes.aboutUsTitleWrap}>
          <h2 className={classes.aboutUsTitle}>{t("pages.aboutUs.titlePrimary")}</h2>
        </div>
        <SectionAboutUs t={t} />
        <div className={classes.secondaryTitleWrap}>
          <p className={classes.secondaryTitle}>{t("pages.aboutUs.titleSecondary")}</p>
        </div>
        <SectionOurTeam t={t} />
      </div>
      <Ellipse className={classes.bgDecor} />
    </div>
  );
};
export default AboutUs;
