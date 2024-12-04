import { createSelector } from "reselect";
import { selectLoadingState, selectLoadingStatus } from "src/store/sharedStore/loading/selectors";
import { ILoadingState } from "src/types/loading";

import { fetchAdoptionList } from "./action";

export const selectAdoptionState = (state) => state.adoptionReducer;

export const selectAdoption = createSelector(selectAdoptionState, (store) => store.data || null);

export const selectAdoptionList = createSelector(
  selectAdoptionState,
  (store) => store.data?.data || []
);

export const selectAdoptionPageCount = createSelector(
  selectAdoptionState,
  (store) => store.data?.pages || []
);

export const selectAdoptionRequestLoading = createSelector(
  selectLoadingState,
  (loadingState: ILoadingState) => selectLoadingStatus(loadingState, [fetchAdoptionList.name])
);
