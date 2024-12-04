import React from "react";
import { useTranslation } from "react-i18next";
import Ellipse from "src/components/bg-decor/Ellipse";

import SectionLinks from "./components/section-links/SectionLinks";
import SectionSupport from "./components/section-support/SectionSupport";
import { useStyles } from "./donate.styles";

const Donate: React.FC = () => {
  const { classes } = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.wrapper}>
      <Ellipse className={classes.donatePageEllipse} />
      <div className={classes.container}>
        <div className={classes.donateTitleWrap}>
          <h2 className={classes.donateTitle}>{t("pages.donate.title.main")}</h2>
        </div>
        <SectionLinks t={t} />
        <div className={classes.secondaryTitleWrap}>
          <p className={classes.secondaryTitle}>{t("pages.donate.title.secondary")}</p>
        </div>
        <SectionSupport t={t} />
      </div>
      <Ellipse className={classes.bgDecor} />
    </div>
  );
};

export default Donate;
