import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import { useTranslation } from "react-i18next";
import { sortListArr } from "src/constants/filterList/sortList";
import useOutsideClick from "src/hooks/useOutsideClick";

import { useStyles } from "./sort.styles";

const SortBy = ({ onChahgeSort }) => {
  const { ref, isActive, setIsActive } = useOutsideClick(false);
  const { classes } = useStyles();
  const { t } = useTranslation();

  const handleSortOpen = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <div className={classes.sortWrapper}>
      <div className={classes.sortContainer} onClick={handleSortOpen} ref={ref}>
        <p className={classes.sortTitle}>{t("pages.availableCats.sort.title")}</p>
        {isActive ? (
          <ExpandLessIcon className={classes.dropDownIcon} />
        ) : (
          <ExpandMoreIcon className={classes.dropDownIcon} />
        )}
        <div
          className={
            isActive
              ? [classes.sortListWrap, classes.sortListWrapActive].join(" ")
              : ([classes.sortListWrap] as never)
          }
        >
          {sortListArr.map((obj) => (
            <li
              className={classes.sortListItem}
              key={obj.name}
              onClick={() => onChahgeSort(obj.sortProperty)}
            >
              {t(`pages.availableCats.sort.sortProperty.${obj.name}`)}
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortBy;
