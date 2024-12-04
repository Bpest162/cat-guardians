import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { CircularProgress } from "@mui/material";
import { Checkbox, FormControlLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "src/components/buttons/CustomButton";
import { deleteAdoption, fetchAdoptionList } from "src/pages/adoption/store/action";
import {
  selectAdoptionList,
  selectAdoptionPageCount,
  selectAdoptionRequestLoading
} from "src/pages/adoption/store/selectors";
import Pagination from "src/pages/petsList/components/paginationMUI/Pagination";

import { useStyles } from "./adoptionGroup.styles";
import EditAdiption from "./components/edit-adoption/EditAdoption";

const AdoptionGroup = () => {
  const { classes } = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedElems, setSelectedElems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingelem, setEditingElem] = useState(null);
  const data = useSelector(selectAdoptionList);
  const pages = useSelector(selectAdoptionPageCount);
  const adoptionListRequestLoading = useSelector(selectAdoptionRequestLoading);

  const dispatch = useDispatch();

  const onChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);

    console.log(event);
  };

  const handleEditClick = (elem) => {
    setEditingElem(elem);
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
    setEditingElem(null);
  };

  const handleDeleteClick = async (itemId) => {
    await dispatch(deleteAdoption.request({ itemId }));
    setSelectedElems((prev) => prev.filter((id) => id !== itemId));

    dispatch(fetchAdoptionList.request({}));
  };

  const handleDeleteSelectedClick = async () => {
    await Promise.all(selectedElems.map((itemId) => dispatch(deleteAdoption.request({ itemId }))));
    setSelectedElems([]);
    dispatch(fetchAdoptionList.request({}));
  };

  const handleCheckboxChange = (itemId) => {
    setSelectedElems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  useEffect(() => {
    dispatch(
      fetchAdoptionList.request({
        page: currentPage
      })
    );
  }, [currentPage]);
  return (
    <div className={classes.listWrapper}>
      <div className={classes.addBtnWrapper}>
        {selectedElems.length > 0 && (
          <CustomButton
            title="Delete selected items"
            className={classes.deletBtn}
            handleClick={handleDeleteSelectedClick}
          />
        )}
      </div>
      {adoptionListRequestLoading ? <CircularProgress /> : null}
      {!adoptionListRequestLoading && !data.length ? <span>empty list </span> : null}
      {!adoptionListRequestLoading && data.length
        ? data.map((elem) => (
            <div key={elem.id} className={classes.adoptionListItemWrapper}>
              <div className={classes.adoptionListItem}>
                <div className={classes.iconsBox}>
                  <FormControlLabel
                    className={classes.formControlLabel}
                    control={
                      <Checkbox
                        className={classes.checkboxMui}
                        checked={selectedElems.includes(elem.id)}
                        onChange={() => handleCheckboxChange(elem.id)}
                      />
                    }
                    label=""
                  />
                  <span className={classes.elemId}>{elem.id}</span>
                  <span className={classes.user}>
                    cat: <span className={classes.catsName}>{elem.cat}</span>
                  </span>
                </div>
                <span className={classes.date}>{elem.request_date}</span>
                <span className={classes.user}>
                  status: <span className={classes.catsName}>{elem.status}</span>
                </span>
                <span className={classes.user}>
                  user: <span className={classes.additionalInfSpan}>{elem.user}</span>
                </span>
                <div className={classes.iconsBox}>
                  <CreateIcon onClick={() => handleEditClick(elem)} className={classes.editIcon} />{" "}
                  <DeleteIcon
                    onClick={() => handleDeleteClick(elem.id)}
                    className={classes.editIcon}
                  />
                </div>
              </div>
              <div>
                {isEditing && editingelem?.id === elem.id && (
                  <EditAdiption elem={editingelem} onClose={handleCloseEdit} />
                )}
              </div>
            </div>
          ))
        : null}
      <Pagination count={pages} page={currentPage} handleClick={onChangePage} />
    </div>
  );
};
export default AdoptionGroup;
