import React from "react";
import Slider from "react-slick";

import { ImageSliderProps } from "../../interfaces/imageSlederProps";
import { useStyles } from "./imageSlider.styles";

const ImagesSlider: React.FC<ImageSliderProps> = ({ photos = [] }) => {
  const { classes } = useStyles();
  const settings = {
    dots: true,
    infinite: false,
    speed: 1000,
    slidesToShow: 1.5,
    slidesToScroll: 1,
    autoplay: false,
    customPaging: (i: number) => {
      return (
        <div>
          <img src={photos[i]} alt="pets image" className={classes.dotsImage} />
        </div>
      );
    },
    dotsClass: "slick-dots slick-thumb",
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          dots: false
        }
      }
    ]
  };

  return (
    <div className={classes.sliderContainer}>
      <Slider {...settings} className="">
        {photos.map((item) => (
          <div className={classes.sliderItem} key={item}>
            <img src={item} alt="petsImage" className={classes.sliderImage} />
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default ImagesSlider;
