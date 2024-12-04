import React from "react";
import { useTranslation } from "react-i18next";
import Ellipse from "src/components/bg-decor/Ellipse";
import CustomLinkButton from "src/components/buttons/CustomLinkButton";
import { ROUTES } from "src/constants/routing/urls";

import SectionContacts from "./components/section-contacts/SectionContacts";
import SectionMap from "./components/section-map/SectionMap";
import { useStyles } from "./contactUs.styles";

const ContactUs = () => {
  const { classes } = useStyles();
  const { t } = useTranslation();
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.contactUsTitleWrap}>
          <h2 className={classes.contactUsTitle}>{t("pages.contactUs.title")}</h2>
        </div>
        <div className={classes.secondaryTitleWrap}>
          <h3 className={classes.secondaryTitle}>
            {t("pages.contactUs.secondaryTitle.header")}{" "}
            <CustomLinkButton
              className={classes.secondaryTitleLink}
              title={t("pages.contactUs.secondaryTitle.link")}
              to={ROUTES.FOUND}
            />
          </h3>
        </div>
        <div>
          <SectionContacts t={t} />
          <SectionMap />
        </div>
      </div>
      <Ellipse className={classes.bgDecor} />
    </div>
  );
};
export default ContactUs;
