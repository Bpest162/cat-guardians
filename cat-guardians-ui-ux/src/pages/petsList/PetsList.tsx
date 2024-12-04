import { CircularProgress } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import FilterList from "./components/filter/FilterList";
import Pagination from "./components/paginationMUI/Pagination";
import PetCard from "./components/petCard/PetCard";
import SortBy from "./components/sortBy/Sort";
import { useStyles } from "./petsList.styles";
import { fetchPets } from "./store/actions";
import { selectPets, selectPetsPageCount, selectPetsRequestLoading } from "./store/selectors";

const PetsList: React.FC = () => {
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [ordering, setOrdering] = useState("id");
  const { classes } = useStyles();
  const { t } = useTranslation();

  const data = useSelector(selectPets);
  const pages = useSelector(selectPetsPageCount);
  const petsRequestLoading = useSelector(selectPetsRequestLoading);

  const onChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const onChangeSortBy = (value) => {
    setOrdering(value);
  };

  const onChangeCategories = useCallback(
    (filterParams) => {
      setFilters(filterParams);
    },
    [setFilters]
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchPets.request({
        page: currentPage,
        ordering: ordering,
        filters: filters
      })
    );
  }, [currentPage, ordering, filters]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.petsListTitleWrap}>
          <h2 className={classes.petsListTitle}>{t("pages.availableCats.title")}</h2>
        </div>
        <div className={classes.pageMainSection}>
          <SortBy onChahgeSort={onChangeSortBy} />
          <div className={classes.petsListwrapper}>
            <FilterList onChangeCategories={onChangeCategories} />
            <div>
              <div className={classes.petsListContainer}>
                {petsRequestLoading ? <CircularProgress /> : null}
                {!petsRequestLoading && !data.length ? <span>empty list </span> : null}
                {!petsRequestLoading && data.length
                  ? data.map((pet) => <PetCard key={pet.id} {...pet} />)
                  : null}
              </div>
              <Pagination count={pages} page={currentPage} handleClick={onChangePage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetsList;
