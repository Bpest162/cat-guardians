import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "src/components/buttons/CustomButton";
import CustomLinkButton from "src/components/buttons/CustomLinkButton";
import { ROUTES } from "src/constants/routing/urls";

import { FieldsProps } from "../../lib/fieldsProps";
import { useStyles } from "./adoptionFormNavigation.styles";

const AdoptionFormNavigation: React.FC<FieldsProps> = ({ t }) => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.navigationContainer}>
      <ul className={classes.navigationMenu}>
        <CustomLinkButton
          className={classes.navMenuItem}
          title={t("pages.petView.adoptionForm.navigation.home")}
          to={ROUTES.HOME}
        />
        <CustomLinkButton
          className={classes.navMenuItem}
          title={t("pages.petView.adoptionForm.navigation.petsList")}
          to={ROUTES.PETSLIST}
        />
        <CustomButton
          className={classes.navMenuItem}
          title={t("pages.petView.adoptionForm.navigation.petsProfile")}
          handleClick={() => navigate(-1)}
        />
        <CustomLinkButton
          className={classes.navMenuItem}
          title={t("pages.petView.adoptionForm.navigation.form")}
          to="#"
        />
      </ul>
    </div>
  );
};

export default AdoptionFormNavigation;
