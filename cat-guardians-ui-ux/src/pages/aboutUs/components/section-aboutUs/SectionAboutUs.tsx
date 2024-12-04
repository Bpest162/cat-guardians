import React from "react";
import image1 from "src/assets/pexels-lemonzandtea.png";
import image2 from "src/assets/pexels-peng-louis.png";
import { FieldsProps } from "src/pages/adoption/lib/fieldsProps";

import { useStyles } from "./sectionAboutUs.styles";

const SectionAboutUs: React.FC<FieldsProps> = ({ t }) => {
  const { classes } = useStyles();
  return (
    <div className={classes.sectionWrapper}>
      <div className={classes.firstContainer}>
        <div className={classes.imgBox}>
          <img className={classes.image} src={image1} alt="" />
        </div>
        <div className={classes.sectionTextWrap}>
          <p className={classes.sectionText}>{t("pages.aboutUs.textFirst")}</p>
        </div>
      </div>
      <div className={classes.secondContainer}>
        <div className={classes.imgBox}>
          <img className={classes.image} src={image2} alt="" />
        </div>
        <div className={classes.sectionTextWrap}>
          <p className={classes.sectionText}>{t("pages.aboutUs.textSecond")}</p>
        </div>
      </div>
    </div>
  );
};
export default SectionAboutUs;
