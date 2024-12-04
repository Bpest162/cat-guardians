import { createSelector } from "reselect";
import { selectLoadingState, selectLoadingStatus } from "src/store/sharedStore/loading/selectors";
import { ILoadingState } from "src/types/loading";

import { getFoundPets } from "./action";

export const selectFoundState = (state) => state.foundFormReducer;

export const selectFoundForm = createSelector(selectFoundState, (store) => store.data || null);

export const selectFoundPetsList = createSelector(
  selectFoundState,
  (store) => store.data?.data || []
);

export const selectFoundPetsPageCount = createSelector(
  selectFoundState,
  (store) => store.data?.pages || []
);

export const selectFoundPetsRequestLoading = createSelector(
  selectLoadingState,
  (loadingState: ILoadingState) => selectLoadingStatus(loadingState, [getFoundPets.name])
);
