import { createSelector } from "reselect";

export const selectPetsState = (state) => state.petsReducer;

export const selectPets = createSelector(selectPetsState, (store) => store.pets.data || []);

export const selectPetsPageCount = createSelector(
  selectPetsState,
  (store) => store.pets.pages || []
);

export const selectPetsRequestLoading = createSelector(
  selectPetsState,
  (store) => store.loadingPets
);
