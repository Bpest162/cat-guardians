import { IPets } from "src/pages/petsList/interfaces/pets";
import { action } from "src/services/actions/action-creator";
import { TDefaultAPIFailureType } from "src/types/common";
import { ActionType } from "typesafe-actions";

export type GetPetByIDParams = {
  petId?: string;
};

export type Response = {
  pet?: IPets;
};

export const fetchPetById = action<GetPetByIDParams, Response, TDefaultAPIFailureType>(
  "GET_PET_BY_ID"
);

export type TFetchPetByIdRequest = ActionType<typeof fetchPetById.request>;
export type TFetchPetByIdSuccess = ActionType<typeof fetchPetById.success>;
export type TFetchPetByIdFail = ActionType<typeof fetchPetById.failed>;
