import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Checkbox from "@mui/material/Checkbox";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import FemaleIcon from "src/components/icons/FemaleIcon";
import ImageIcon from "src/components/icons/ImageIcon";
import MaleIcon from "src/components/icons/MaleIcon";
import { ROUTES } from "src/constants/routing/urls";
import { Gender, IPets } from "src/pages/petsList/interfaces/pets";
import { colorTheme } from "src/theme/themeVariables";

import { useStyles } from "./petCard.styles";
import { localStoragesKey } from "./utils/localStoragesKey";

const PetCard: React.FC<IPets> = ({ id, name, gender, age, photos = [] }) => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const { t } = useTranslation();

  const [isFavorite, setIsFavorite] = useState<boolean>(() => {
    const initialFavoriteValue = localStorage.getItem(localStoragesKey(id));
    return initialFavoriteValue === "true";
  });

  const handleNavigate = () => {
    navigate(`${ROUTES.PETSLIST}/${id}`);
  };

  const handleCheckboxChange = () => {
    const newValue = !isFavorite;
    setIsFavorite(newValue);
    localStorage.setItem(localStoragesKey(id), newValue.toString());
  };

  useEffect(() => {
    const storedFavoriteValue = localStorage.getItem(localStoragesKey(id));
    if (storedFavoriteValue !== null) {
      setIsFavorite(storedFavoriteValue === "true");
    }
  }, [id]);

  return (
    <div className={classes.petCart} key={id}>
      <div onClick={handleNavigate} className={classes.petCardImageBox}>
        {photos.length > 0 ? (
          <img className={classes.petImg} src={photos[0]} alt={name} />
        ) : (
          <ImageIcon width="200" height="200" />
        )}
      </div>
      <div className={classes.petInf}>
        <div className={classes.petNameWrap}>
          <p className={classes.petName}>
            {name}
            {gender === Gender.male && (
              <MaleIcon width="28" height="28" color={colorTheme.color.base.typography[400]} />
            )}
            {gender === Gender.female && (
              <FemaleIcon width="28" height="28" color={colorTheme.color.base.typography[400]} />
            )}
          </p>
          <Checkbox
            className={classes.favoriteCheckbox}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            checked={isFavorite}
            onChange={handleCheckboxChange}
          />
        </div>
        <p className={classes.petAge}>{age}</p>
        <NavLink className={classes.petLink} to={`${ROUTES.PETSLIST}/${id}`}>
          {t("pages.availableCats.petsCard.ditailsLink")} &#8594;
        </NavLink>
      </div>
    </div>
  );
};
export default PetCard;
