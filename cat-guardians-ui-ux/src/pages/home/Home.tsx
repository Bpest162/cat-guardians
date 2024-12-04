import React from "react";
import { useTranslation } from "react-i18next";
import Ellipse from "src/components/bg-decor/Ellipse";
import HomeBgVector from "src/components/bg-decor/HomeBgVector";
import ReviewsSlider from "src/components/slider/ReviewsSlider";
import { colorTheme } from "src/theme/themeVariables";

import FirstSection from "./components/first-section/FirstSection";
import SecondSection from "./components/second-section/SecondSection";
import { useStyles } from "./homePage.styles";

const Home: React.FC = () => {
  const { classes } = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.wrapper}>
      <HomeBgVector
        className={classes.bgVector}
        width="100vw"
        height="1335"
        fill={colorTheme.color.base.background[10]}
      />
      <span className={classes.bgColor}></span>
      <div className={classes.container}>
        <FirstSection />
        <SecondSection />
        <div className={classes.sectionSlider}>
          <div className={classes.sectionSliderTitleWrap}>
            <Ellipse className={classes.smEllipse} />
            <h3 className={classes.sectionSliderTitle}>{t("pages.home.slider.title")}</h3>
          </div>
          <ReviewsSlider />
        </div>
      </div>
    </div>
  );
};

export default Home;
