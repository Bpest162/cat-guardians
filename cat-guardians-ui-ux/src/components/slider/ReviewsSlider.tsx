import React from "react";
import Slider from "react-slick";
import reviewsData from "src/constants/db/reviews-data";
import { colorTheme } from "src/theme/themeVariables";

import AvatarIcon from "../icons/AvatarIcon";
import NextArrow from "../icons/NextArrow";
import PrevArrow from "../icons/PrevArrow";
import { useStyles } from "./slider.styles";

const ReviewsSlider = () => {
  const { classes } = useStyles();
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NextArrow width="48" height="48" color={colorTheme.color.base.typography[200]} />,
    prevArrow: <PrevArrow width="48" height="48" color={colorTheme.color.base.typography[200]} />,
    responsive: [
      {
        breakpoint: 728,
        settings: {
          slidesToShow: 1.3,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className={classes.sliderWrapper}>
      <div className={classes.sliderContainer}>
        <Slider {...settings} className="">
          {reviewsData.map((data) => (
            <div className={classes.sliderCard} key={data.id}>
              <div className={classes.reviewer}>
                <AvatarIcon width="60" height="60" color={colorTheme.color.base.background[10]} />
                <p className={classes.reviewerName}>{data.name}</p>
              </div>
              <p className={classes.reviewerText}>{data.review}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
export default ReviewsSlider;
