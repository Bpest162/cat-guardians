import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { CircularProgress } from "@mui/material";
import { Checkbox, FormControlLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "src/components/buttons/CustomButton";
import Pagination from "src/pages/petsList/components/paginationMUI/Pagination";
import { deletePet, fetchPets } from "src/pages/petsList/store/actions";
import {
  selectPets,
  selectPetsPageCount,
  selectPetsRequestLoading
} from "src/pages/petsList/store/selectors";

import EditPets from "./components/edit-pets/EditPets";
import AddPets from "./components/new-pets/AddPets";
import { useStyles } from "./petsGroup.styles";
import { STORAG_KEY } from "./utils/localStoragesKey";

const PetsGroup = () => {
  const storedPage = localStorage.getItem(STORAG_KEY);
  const initialPage = storedPage ? parseInt(storedPage, 10) : 1;
  const [currentPage, setCurrentPage] = useState(isNaN(initialPage) ? 1 : initialPage);

  const [isEditing, setIsEditing] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const [isAfterDelete, setIsAfterDelete] = useState(false);

  const [selectedPets, setSelectedPets] = useState([]);

  const { classes } = useStyles();

  const data = useSelector(selectPets);
  const pages = useSelector(selectPetsPageCount);
  const petsRequestLoading = useSelector(selectPetsRequestLoading);

  const handleEditClick = (pet) => {
    setEditingPet(pet);
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
    setEditingPet(null);
  };

  const handleAddClick = () => {
    setIsAdding((prev) => !prev);
  };

  const handleAddSuccess = () => {
    setIsAdding(false);
  };

  const onChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const dispatch = useDispatch();

  const handleDeleteClick = (petId) => {
    dispatch(deletePet.request({ petId }));

    setSelectedPets((prev) => prev.filter((id) => id !== petId));
    setIsAfterDelete(true);
  };

  const handleDeleteSelectedClick = () => {
    for (const petId of selectedPets) {
      handleDeleteClick(petId);
    }
    setSelectedPets([]);
  };

  const handleCheckboxChange = (petId) => {
    setSelectedPets((prev) =>
      prev.includes(petId) ? prev.filter((id) => id !== petId) : [...prev, petId]
    );
  };

  useEffect(() => {
    dispatch(fetchPets.request({ page: currentPage }));

    setIsAfterDelete(false);

    localStorage.setItem(STORAG_KEY, currentPage.toString());
  }, [currentPage, dispatch]);

  useEffect(() => {
    if (data.length === 0 && currentPage > 1 && isAfterDelete) {
      setIsAfterDelete(false);
      setCurrentPage((prevCurrentPage) => prevCurrentPage - 1);
    }
  }, [currentPage, data, isAfterDelete, setIsAfterDelete, setCurrentPage]);

  return (
    <div className={classes.listWrapper}>
      <div className={classes.addBtnWrapper}>
        <CustomButton
          title={"Add new cat"}
          className={classes.addBtn}
          handleClick={handleAddClick}
        />
        {isAdding && <AddPets onClose={handleAddSuccess} currentPage={currentPage} />}
        {selectedPets.length > 0 && (
          <CustomButton
            title="Delete selected cats"
            className={classes.deletBtn}
            handleClick={handleDeleteSelectedClick}
          />
        )}
      </div>
      {petsRequestLoading ? <CircularProgress /> : null}
      {!petsRequestLoading && !data.length ? <span>empty list </span> : null}
      {!petsRequestLoading && data.length
        ? data.map((pet) => (
            <div className={classes.petListItemWrapper} key={pet.id}>
              <div className={classes.petListItem} key={pet.id}>
                <div className={classes.iconsBox}>
                  <FormControlLabel
                    className={classes.formControlLabel}
                    control={
                      <Checkbox
                        className={classes.checkboxMui}
                        checked={selectedPets.includes(pet.id)}
                        onChange={() => handleCheckboxChange(pet.id)}
                      />
                    }
                    label=""
                  />
                  <span className={classes.petsId}>{pet.id}.</span>
                  <span className={classes.petsName}>{pet.name}</span>
                </div>
                <span className={classes.additionalInf}>
                  color: <span className={classes.additionalInfSpan}>{pet.color}</span>
                </span>
                <span className={classes.additionalInf}>
                  breed: <span className={classes.additionalInfSpan}>{pet.breed}</span>
                </span>
                <span className={classes.additionalInf}>
                  age: <span className={classes.additionalInfSpan}>{pet.age}</span>
                </span>
                <div className={classes.iconsBox}>
                  <CreateIcon onClick={() => handleEditClick(pet)} className={classes.editIcon} />{" "}
                  <DeleteIcon
                    onClick={() => handleDeleteClick(pet.id)}
                    className={classes.editIcon}
                  />
                </div>
              </div>
              <div>
                {isEditing && editingPet?.id === pet.id && (
                  <EditPets pet={editingPet} onClose={handleCloseEdit} />
                )}
              </div>
            </div>
          ))
        : null}
      <Pagination count={pages} page={currentPage} handleClick={onChangePage} />
    </div>
  );
};
export default PetsGroup;
