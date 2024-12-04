import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Checkbox, FormControlLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomButton from "src/components/buttons/CustomButton";
import {
  filterAgeList,
  filterColorList,
  filterGenderList
} from "src/constants/filterList/filterList";

import { useStyles } from "./filterList.styles";

const FilterList = ({ onChangeCategories }) => {
  const [filter, setFilter] = useState(false);
  const { classes } = useStyles();
  const { t } = useTranslation();

  const [ageFilters, setAgeFilters] = useState(
    filterAgeList.map((ageFilter) => ({
      label: ageFilter.label,
      value: false,
      propertyName: ageFilter.propertyName
    }))
  );

  const [genderFilters, setGenderFilters] = useState(
    filterGenderList.map((genderFilter) => ({
      label: genderFilter.label,
      value: false,
      propertyName: genderFilter.propertyName
    }))
  );

  const [colorFilters, setColorFilters] = useState(
    filterColorList.map((colorFilter) => ({
      label: colorFilter.label,
      value: false,
      propertyName: colorFilter.propertyName
    }))
  );

  const onSelectAge = (event: React.BaseSyntheticEvent, idx: number) => {
    setAgeFilters((filters) =>
      filters.map((filterAgeGtItem, i) => ({
        ...filterAgeGtItem,
        value: i === idx ? event.target.checked : filterAgeGtItem.value
      }))
    );
  };

  const onSelectGender = (event: React.BaseSyntheticEvent, idx: number) => {
    setGenderFilters((filters) =>
      filters.map((filterG, i) => ({
        ...filterG,
        value: i === idx ? event.target.checked : filterG.value
      }))
    );
  };

  const onSelectColor = (event: React.BaseSyntheticEvent, idx: number) => {
    setColorFilters((filters) =>
      filters.map((filterC, i) => ({
        ...filterC,
        value: i === idx ? event.target.checked : filterC.value
      }))
    );
  };

  useEffect(() => {
    const checkedGenderFilters = genderFilters.filter((f) => f.value);
    const checkedColorFilters = colorFilters.filter((f) => f.value);
    const checkedAgeGtFilters = ageFilters.filter((f) => f.value);

    const filterParams = {
      age_range: checkedAgeGtFilters.map((filterAgegt) => filterAgegt.propertyName),
      gender: checkedGenderFilters.map((filterGender) => filterGender.propertyName),
      color__name: checkedColorFilters.map((filterColor) => filterColor.propertyName)
    };

    onChangeCategories(filterParams);
  }, [ageFilters, genderFilters, colorFilters, onChangeCategories]);

  return (
    <div className={classes.filterWrap}>
      <div className={classes.filterTitleWrap} onClick={() => setFilter(!filter)}>
        <p className={classes.filterTitle}>{t("pages.availableCats.filter.title")}</p>
        {filter ? (
          <ExpandLessIcon className={classes.dropDownIcon} />
        ) : (
          <ExpandMoreIcon className={classes.dropDownIcon} />
        )}
      </div>

      <div
        className={
          filter
            ? [classes.filterListWrap, classes.filterListWrapActive].join(" ")
            : ([classes.filterListWrap] as never)
        }
      >
        <div className={classes.filterListTitleWrap}>
          <h3 className={classes.filterListTitle}>{t("pages.availableCats.filter.title")}</h3>
        </div>
        <form action="" className={classes.form}>
          <div className={classes.categoriesListWrap}>
            <h5 className={classes.categoriesTitle}>{t("pages.availableCats.filter.agetitle")}</h5>
            {ageFilters.map((variant, i) => (
              <FormControlLabel
                checked={variant.value}
                onChange={(event) => onSelectAge(event, i)}
                key={variant.label}
                control={<Checkbox className={classes.checkbox} />}
                label={
                  <p className={classes.labelTitle}>
                    {t(`pages.availableCats.filter.age.${variant.label}`)}
                  </p>
                }
              />
            ))}
          </div>
          <div className={classes.categoriesListWrap}>
            <h5 className={classes.categoriesTitle}>
              {t("pages.availableCats.filter.gendertitle")}
            </h5>
            {genderFilters.map((variant, i) => (
              <FormControlLabel
                checked={variant.value}
                onChange={(event) => onSelectGender(event, i)}
                key={variant.label}
                control={<Checkbox className={classes.checkbox} />}
                label={
                  <p className={classes.labelTitle}>
                    {t(`pages.availableCats.filter.gender.${variant.label}`)}
                  </p>
                }
              />
            ))}
          </div>
          <div className={classes.categoriesListWrap}>
            <h5 className={classes.categoriesTitle}>
              {t("pages.availableCats.filter.colortitle")}
            </h5>
            {colorFilters.map((variant, i) => (
              <FormControlLabel
                checked={variant.value}
                onChange={(event) => onSelectColor(event, i)}
                key={variant.label}
                control={<Checkbox className={classes.checkbox} />}
                label={
                  <p className={classes.labelTitle}>
                    {t(`pages.availableCats.filter.color.${variant.label}`)}
                  </p>
                }
              />
            ))}
          </div>
          <CustomButton
            type="reset"
            className={classes.buttonReset}
            title={t("pages.availableCats.filter.button")}
          />
        </form>
      </div>
    </div>
  );
};
export default FilterList;
