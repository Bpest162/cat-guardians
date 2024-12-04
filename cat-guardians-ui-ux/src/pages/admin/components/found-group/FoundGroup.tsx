import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { CircularProgress } from "@mui/material";
import { Checkbox, FormControlLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "src/components/buttons/CustomButton";
import { foundPetsStatusObj } from "src/constants/adminPage-config/selectFieldValue";
import { deleteFoundPets, getFoundPets } from "src/pages/found/components/store/action";
import {
  selectFoundPetsList,
  selectFoundPetsPageCount,
  selectFoundPetsRequestLoading
} from "src/pages/found/components/store/selectors";
import Pagination from "src/pages/petsList/components/paginationMUI/Pagination";

import EditFoundPets from "./components/edit-foundPets/EditFoundPets";
import { useStyles } from "./foundGroup.styles";

const FoundGroup = () => {
  const { classes } = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedElems, setSelectedElems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingelem, setEditingElem] = useState(null);
  const data = useSelector(selectFoundPetsList);
  const pages = useSelector(selectFoundPetsPageCount);
  const foundPetsListRequestLoading = useSelector(selectFoundPetsRequestLoading);

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
    await dispatch(deleteFoundPets.request({ itemId }));
    setSelectedElems((prev) => prev.filter((id) => id !== itemId));

    dispatch(getFoundPets.request({}));
  };

  const handleDeleteSelectedClick = async () => {
    await Promise.all(selectedElems.map((itemId) => dispatch(deleteFoundPets.request({ itemId }))));
    setSelectedElems([]);
    dispatch(getFoundPets.request({}));
  };

  const handleCheckboxChange = (itemId) => {
    setSelectedElems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  useEffect(() => {
    dispatch(
      getFoundPets.request({
        page: currentPage
      })
    );
  }, [currentPage]);
  return (
    <div className={classes.listWrapper}>
      <div className={classes.deleteBtnWrapper}>
        {selectedElems.length > 0 && (
          <CustomButton
            title="Delete selected items"
            className={classes.deleteBtn}
            handleClick={handleDeleteSelectedClick}
          />
        )}
      </div>
      {foundPetsListRequestLoading ? <CircularProgress /> : null}
      {!foundPetsListRequestLoading && !data.length ? <span>empty list </span> : null}
      {!foundPetsListRequestLoading && data.length
        ? data.map((elem) => (
            <div key={elem.id} className={classes.foundPetsListItemWrapper}>
              <div className={classes.foundPetsListItem}>
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
                  <span className={classes.elemLabel}>
                    Aplication №: <span className={classes.elemValue}>{elem.id}</span>
                  </span>
                </div>
                <span className={classes.elemLabel}>
                  created:{" "}
                  <span className={classes.elemValue}>{elem.created_at.split("T")[0]}</span>
                </span>
                <span className={classes.elemLabel}>
                  status:{" "}
                  <span className={classes.elemValue}>
                    {foundPetsStatusObj[elem.status] || "Unknown"}
                  </span>
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
                  <EditFoundPets elem={editingelem} onClose={handleCloseEdit} photo={elem.photo} />
                )}
              </div>
            </div>
          ))
        : null}
      <Pagination count={pages} page={currentPage} handleClick={onChangePage} />
    </div>
  );
};
export default FoundGroup;
