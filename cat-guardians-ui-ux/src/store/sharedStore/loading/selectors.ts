import some from "lodash/some";
import { ELoadingStatus } from "src/constants/utils/loadingStatus";
import { ILoadingState } from "src/types/loading";

export const selectLoadingState = (state): ILoadingState => state.loading;

export const selectLoadingStatus = (loadingState: ILoadingState, actions: string[]): boolean =>
  some(actions, (item: string) => loadingState[item] === ELoadingStatus.LOADING);

export const selectLoadedStatus = (loadingState: ILoadingState, actions: string[]): boolean =>
  some(actions, (item: string) => loadingState[item] === ELoadingStatus.LOADED);
