import { ELoadingStatus } from "src/constants/utils/loadingStatus";
import { fetchPets } from "src/pages/petsList/store/actions";
import { TDefaultAction } from "src/types/common";
import { ILoadingState } from "src/types/loading";
import { createReducer } from "typesafe-actions";

export const loadingInitialState: ILoadingState = {};

export const loadingReducer = createReducer<ILoadingState>(loadingInitialState).handleAction(
  [fetchPets.request, fetchPets.processing, fetchPets.success, fetchPets.failed],
  (state: ILoadingState, { type }: TDefaultAction) => {
    const [, requestName, requestStatus] = type.match(/(.*)_(PROCESSING|SUCCESS|FAIL)/) || [];
    let status = ELoadingStatus.DEFAULT;
    switch (requestStatus) {
      case "PROCESSING":
        status = ELoadingStatus.LOADING;
        break;
      case "SUCCESS":
      case "FAIL":
        status = ELoadingStatus.LOADED;
        break;
    }
    return {
      ...state,
      [requestName ? requestName : type]: status
    };
  }
);
