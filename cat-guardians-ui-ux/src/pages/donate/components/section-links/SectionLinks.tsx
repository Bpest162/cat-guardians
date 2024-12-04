import React from "react";
import CustomLinkButton from "src/components/buttons/CustomLinkButton";
import CatIcon from "src/components/icons/CatIcon";
import HomeIcon from "src/components/icons/HomeIcon";
import { ROUTES } from "src/constants/routing/urls";
import { FieldsProps } from "src/pages/adoption/lib/fieldsProps";

import { useStyles } from "./sectionLinks.styles";

const SectionLinks: React.FC<FieldsProps> = ({ t }) => {
  const { classes } = useStyles();
  return (
    <div className={classes.sectionLinks}>
      <div className={classes.sectionLinksItem}>
        <HomeIcon width="99" height="98" />
        <CustomLinkButton
          className={classes.buttonsLink}
          to={ROUTES.DONATEFORM}
          title={t("pages.donate.sectionLinks.linkSupport.title")}
        />
        <p className={classes.descriptionText}>
          {t("pages.donate.sectionLinks.linkSupport.description.main")} <br />{" "}
          {t("pages.donate.sectionLinks.linkSupport.description.additional")}
        </p>
      </div>
      <div className={classes.sectionLinksItem}>
        <CatIcon width="99" height="98" />
        <CustomLinkButton
          className={classes.buttonsLink}
          to={ROUTES.PETSLIST}
          title={t("pages.donate.sectionLinks.linkPets.title")}
        />
        <p className={classes.descriptionText}>
          {t("pages.donate.sectionLinks.linkPets.description.main")} <br />{" "}
          {t("pages.donate.sectionLinks.linkPets.description.additional")}
        </p>
      </div>
    </div>
  );
};

export default SectionLinks;
