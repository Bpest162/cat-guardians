import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Ellipse from "src/components/bg-decor/Ellipse";

import SimilarPetsSection from "../../components/similarPetsSection/SililarPetsSection";
import PetDescription from "./component/petsDescription/PetsDescription";
import ImagesSlider from "./component/petsImageSlider/ImageSlider";
import Requirements from "./component/requirementsSection/Requirements";
import { useStyles } from "./petView.styles";
import { fetchPetById } from "./store/action";
import { selectPetById } from "./store/selectors";

const PetsProfile = () => {
  const { classes } = useStyles();
  const { id } = useParams();
  const data = useSelector(selectPetById);
  const { i18n, t } = useTranslation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchPetById.request({
        petId: id
      })
    );
  }, [id, i18n.language, dispatch]);

  return (
    <div className={classes.profileWrapper}>
      <div className={classes.container}>
        <div className={classes.imgSliderDescBlock}>
          <div className={classes.firstSection}>
            <ImagesSlider {...data} />
            <PetDescription {...data} />
          </div>
          <div className={classes.reqComponentWrap}>
            <Requirements {...data} />
          </div>
        </div>
        <div className={classes.similarPetsBlock}>
          <div className={classes.similarPetsBlockTitleWrap}>
            <h2 className={classes.similarPetsBlockTitle}>
              {t("pages.petView.similarPetsSlider.title")}{" "}
            </h2>
            <SimilarPetsSection {...data} />
          </div>
        </div>
      </div>
      <Ellipse className={classes.bgDecor} />
    </div>
  );
};

export default PetsProfile;
