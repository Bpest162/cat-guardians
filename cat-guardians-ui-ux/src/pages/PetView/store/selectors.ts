import { createSelector } from "reselect";

export const selectPetState = (state) => state.petReducer;

export const selectPetById = createSelector(selectPetState, (store) => store.pet || {});
