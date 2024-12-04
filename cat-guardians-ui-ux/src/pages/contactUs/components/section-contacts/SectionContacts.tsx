import React from "react";
import { Link } from "react-router-dom";
import ClockIcon from "src/components/icons/ClockIcon";
import FaceBookIcon from "src/components/icons/FaceBIcon";
import InstIcon from "src/components/icons/InstIcon";
import MailIcon from "src/components/icons/MailIcon";
import MapPinIcon from "src/components/icons/MapPinIcon";
import PhoneIcon from "src/components/icons/PhoneIcon";
import TgIcon from "src/components/icons/TgIcon";
import { FieldsProps } from "src/pages/adoption/lib/fieldsProps";

import { useStyles } from "./sectionContacts.styles";

const SectionContacts: React.FC<FieldsProps> = ({ t }) => {
  const { classes } = useStyles();
  return (
    <div className={classes.sextionContactsWrapper}>
      <div className={classes.menuWrapper}>
        <ul className={classes.contactsMenu}>
          <h5 className={classes.contactsMenuTitle}>{t("pages.contactUs.menu.contact.title")}</h5>
          <Link to="tel: +380 44 123-45-78" className={classes.contactsMenuItem}>
            <PhoneIcon width="24" height="24" />
            +380 44 123-45-78
          </Link>
          <Link to="mailto: catguardians@email.ua" className={classes.contactsMenuItem}>
            <MailIcon width="24" height="24" />
            catguardians@email.ua
          </Link>
        </ul>
        <ul className={classes.contactsMenu}>
          <h5 className={classes.contactsMenuTitle}>{t("pages.contactUs.menu.visit.title")}</h5>
          <li className={classes.contactsMenuItem}>
            <MapPinIcon width="24" height="24" />
            {t("pages.contactUs.menu.visit.address.street")}
            <br /> {t("pages.contactUs.menu.visit.address.country")}
          </li>
          <li className={classes.contactsMenuItem}>
            <ClockIcon width="24" height="24" />
            {t("pages.contactUs.menu.visit.address.workingHours")}
          </li>
        </ul>
        <ul className={classes.contactsMenu}>
          <h5 className={classes.contactsMenuTitle}>{t("pages.contactUs.menu.socMedia.title")}</h5>
          <Link to="t.me/cat-guardians" className={classes.contactsMenuItem}>
            <TgIcon width="24" height="24" />
            t.me/cat-guardians
          </Link>
          <Link to="https://instagram.com/cat-guardians" className={classes.contactsMenuItem}>
            <InstIcon width="24" height="24" />
            https://instagram.com/cat-guardians
          </Link>
          <Link to="https://facebook.com/catguardians" className={classes.contactsMenuItem}>
            <FaceBookIcon width="24" height="24" />
            https://facebook.com/catguardians
          </Link>
        </ul>
      </div>
      <div className={classes.locationTextWrapper}>
        <p className={classes.locationText}>{t("pages.contactUs.footerText")}</p>
      </div>
    </div>
  );
};
export default SectionContacts;
