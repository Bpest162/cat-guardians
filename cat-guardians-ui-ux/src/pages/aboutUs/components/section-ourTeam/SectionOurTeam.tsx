import React from "react";
import staffimg3 from "src/assets/Ellipse-5.png";
import staffimg2 from "src/assets/Ellipse-6.png";
import staffimg4 from "src/assets/Ellipse-7.png";
import staffimg1 from "src/assets/Ellipse-8.png";
import { FieldsProps } from "src/pages/adoption/lib/fieldsProps";

import { useStyles } from "./sectionOurTeam.styles";

const SectionOurTeam: React.FC<FieldsProps> = ({ t }) => {
  const { classes } = useStyles();
  return (
    <div className={classes.sectionWrapper}>
      <div className={classes.sectionItem}>
        <div>
          <img className={classes.sectionItemImg} src={staffimg1} alt="staffimg1" />
        </div>
        <h6 className={classes.staffName}>{t("pages.aboutUs.ourTeam.director.name")}</h6>
        <p className={classes.staffJobTitle}>{t("pages.aboutUs.ourTeam.director.jobTitle")}</p>
      </div>
      <div className={classes.sectionItem}>
        <div>
          <img className={classes.sectionItemImg} src={staffimg2} alt="staffimg2" />
        </div>
        <h6 className={classes.staffName}>{t("pages.aboutUs.ourTeam.manager.name")}</h6>
        <p className={classes.staffJobTitle}>{t("pages.aboutUs.ourTeam.manager.jobTitle")}</p>
      </div>
      <div className={classes.sectionItem}>
        <div>
          <img className={classes.sectionItemImg} src={staffimg3} alt="staffimg3" />
        </div>
        <h6 className={classes.staffName}>{t("pages.aboutUs.ourTeam.caretaker2.name")}</h6>
        <p className={classes.staffJobTitle}>{t("pages.aboutUs.ourTeam.caretaker1.jobTitle")}</p>
      </div>
      <div className={classes.sectionItem}>
        <div>
          <img className={classes.sectionItemImg} src={staffimg4} alt="staffimg4" />
        </div>
        <h6 className={classes.staffName}>{t("pages.aboutUs.ourTeam.caretaker1.name")}</h6>
        <p className={classes.staffJobTitle}>{t("pages.aboutUs.ourTeam.caretaker2.jobTitle")}</p>
      </div>
    </div>
  );
};
export default SectionOurTeam;
