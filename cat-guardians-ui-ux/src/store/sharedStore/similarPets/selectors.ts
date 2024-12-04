import { createSelector } from "reselect";
import { selectLoadingState, selectLoadingStatus } from "src/store/sharedStore/loading/selectors";
import { ILoadingState } from "src/types/loading";

import { fetchSimilarPets } from "./actions";

export const selectSimilarPetsState = (state) => state.similarPetsReducer;

export const selectSimilarPets = createSelector(
  selectSimilarPetsState,
  (store) => store.similarPets.data || []
);

export const selectSimilarPetsRequestLoading = createSelector(
  selectLoadingState,
  (loadingState: ILoadingState) => selectLoadingStatus(loadingState, [fetchSimilarPets.name])
);
