import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Checkbox from "@mui/material/Checkbox";
import React from "react";
import { useTranslation } from "react-i18next";
import CustomLinkButton from "src/components/buttons/CustomLinkButton";
import FemaleIcon from "src/components/icons/FemaleIcon";
import MaleIcon from "src/components/icons/MaleIcon";
import ShareIcon from "src/components/icons/ShareIcon";
import { ROUTES } from "src/constants/routing/urls";
import { Gender, IPets } from "src/pages/petsList/interfaces/pets";
import { colorTheme } from "src/theme/themeVariables";

import { replaceParamsInUrl } from "../../utils/replaceRaramsInUrl";
import { useStyles } from "./petsDescription.styles";

const PetDescription: React.FC<IPets> = ({ name, age, gender, bio, aversions, id }) => {
  const { classes } = useStyles();
  const { t } = useTranslation();

  const params = { id: id };

  const result = replaceParamsInUrl(ROUTES.ADOPTION, params);

  return (
    <div className={classes.patsDescriptionBox}>
      <div className={classes.patsDescriptionBoxHeader}>
        <div className={classes.nameBox}>
          <p className={classes.name}>{name}</p>
          {gender === Gender.male && (
            <MaleIcon width="28" height="28" color={colorTheme.color.base.typography[400]} />
          )}
          {gender === Gender.female && (
            <FemaleIcon width="28" height="28" color={colorTheme.color.base.typography[400]} />
          )}
        </div>
        <div className={classes.shareFavoritBox}>
          <Checkbox
            className={classes.favoriteCheckbox}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
          />
          <ShareIcon width="32" height="32" />
        </div>
      </div>
      <p className={classes.age}>{age}</p>
      <p className={classes.discriptionText}>
        {bio} {aversions}
      </p>
      <div className={classes.linksWrapper}>
        <CustomLinkButton
          to={result}
          className={classes.linksPrimary}
          title={t("pages.petView.linksButton.adoption")}
        />
        <CustomLinkButton
          to={ROUTES.DONATE}
          className={classes.linksSecondary}
          title={t("pages.petView.linksButton.BuyMeTreats")}
        />
      </div>
    </div>
  );
};

export default PetDescription;
