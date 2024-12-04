import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import NextArrow from "src/components/icons/NextArrow";
import PrevArrow from "src/components/icons/PrevArrow";
import PetCard from "src/pages/petsList/components/petCard/PetCard";
import { colorTheme } from "src/theme/themeVariables";

import { fetchSimilarPets } from "../../store/sharedStore/similarPets/actions";
import {
  selectSimilarPets,
  selectSimilarPetsRequestLoading
} from "../../store/sharedStore/similarPets/selectors";
import { useStyles } from "./similarPetsSection.styles";

const SimilarPetsSection = ({ breed = "" }) => {
  const { classes } = useStyles();
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow width="48" height="48" color={colorTheme.color.base.typography[200]} />,
    prevArrow: <PrevArrow width="48" height="48" color={colorTheme.color.base.typography[200]} />,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 728,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1
        }
      }
    ]
  };

  const data = useSelector(selectSimilarPets);
  const similarPetsRequestLoading = useSelector(selectSimilarPetsRequestLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchSimilarPets.request({
        breed__name: breed
      })
    );
  }, [breed, dispatch]);

  return (
    <div className={classes.sliderWrapper}>
      <div className={classes.sliderContainer}>
        <Slider {...settings}>
          {similarPetsRequestLoading ? <CircularProgress /> : null}
          {!similarPetsRequestLoading && !data.length ? <span>empty list </span> : null}
          {!similarPetsRequestLoading && data.length
            ? data.map((pet) => <PetCard key={pet.id} {...pet} />)
            : null}
        </Slider>
      </div>
    </div>
  );
};

export default SimilarPetsSection;
