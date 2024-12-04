import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Ellipse from "src/components/bg-decor/Ellipse";
import { ROUTES } from "src/constants/routing/urls";

import SimilarPetsSection from "../../components/similarPetsSection/SililarPetsSection";
import DonationForm from "./components/donation-form/DonationForm";
import { useStyles } from "./donateShelter.styles";

const DonateShelter: React.FC = () => {
  const { classes } = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.donateTextWrapper}>
          <div className={classes.linkWrapper}>
            <Link to={ROUTES.DONATE} className={classes.donateText}>
              {t("pages.donationForm.navigation.donatePage")}
            </Link>
            &nbsp;&nbsp;&gt;&nbsp;&nbsp;
            <Link to="#" className={classes.donateText}>
              {t("pages.donationForm.navigation.donateShelter")}
            </Link>
          </div>
          <DonationForm t={t} />
          <div className={classes.similarPetsSectionBlock}>
            <h2 className={classes.similarPetsSectionTitle}>
              {t("pages.donationForm.petsSliderTitle")}
            </h2>
            <SimilarPetsSection />
          </div>
        </div>
        <Ellipse className={classes.bgDecor} />
      </div>
    </div>
  );
};

export default DonateShelter;
