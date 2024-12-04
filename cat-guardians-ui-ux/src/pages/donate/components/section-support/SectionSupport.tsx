import React from "react";
import calendarSvg from "src/assets/icons/calendar-svg.svg";
import conversationSvg from "src/assets/icons/conversation-svg.svg";
import petFoodSvg from "src/assets/icons/dog-food-pet-svg.svg";
import petShelter from "src/assets/icons/pet-shelter-svg.svg";
import { FieldsProps } from "src/pages/adoption/lib/fieldsProps";

import { useStyles } from "./sectionSupport.styles";

const SectionSupport: React.FC<FieldsProps> = ({ t }) => {
  const { classes } = useStyles();
  return (
    <div className={classes.sectionSupport}>
      <div className={classes.sectionSupportItem}>
        <img src={petShelter} alt="petSheltersvg" className={classes.supportSvg} />
        <div className={classes.SupportItemDesc}>
          <h4 className={classes.SupportItemDescTitle}>
            {t("pages.donate.sectionOtherWay.volunteer.title")}
          </h4>
          <p className={classes.SupportItemDescText}>
            {t("pages.donate.sectionOtherWay.volunteer.text")}
          </p>
        </div>
      </div>
      <div className={classes.sectionSupportItem}>
        <img src={petFoodSvg} alt="petFoodSvg" className={classes.supportSvg} />
        <div className={classes.SupportItemDesc}>
          <h4 className={classes.SupportItemDescTitle}>
            {t("pages.donate.sectionOtherWay.donate.title")}
          </h4>
          <p className={classes.SupportItemDescText}>
            {t("pages.donate.sectionOtherWay.donate.text")}
          </p>
        </div>
      </div>
      <div className={classes.sectionSupportItem}>
        <img src={conversationSvg} alt="conversationSvg" className={classes.supportSvg} />
        <div className={classes.SupportItemDesc}>
          <h4 className={classes.SupportItemDescTitle}>
            {t("pages.donate.sectionOtherWay.spread.title")}
          </h4>
          <p className={classes.SupportItemDescText}>
            {t("pages.donate.sectionOtherWay.spread.text")}
          </p>
        </div>
      </div>
      <div className={classes.sectionSupportItem}>
        <img src={calendarSvg} alt="calendarSvg" className={classes.supportSvg} />
        <div className={classes.SupportItemDesc}>
          <h4 className={classes.SupportItemDescTitle}>
            {t("pages.donate.sectionOtherWay.attend.title")}
          </h4>
          <p className={classes.SupportItemDescText}>
            {t("pages.donate.sectionOtherWay.attend.text")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SectionSupport;
