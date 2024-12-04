import { IPets } from "src/pages/petsList/interfaces/pets";
import { action } from "src/services/actions/action-creator";
import { TDefaultAPIFailureType } from "src/types/common";
import { ActionType } from "typesafe-actions";

export type GetSimilarPetsParams = {
  breed__name?: string;
  color__name?: string;
};

export type Response = {
  similarPets?: IPets[];
};

export const fetchSimilarPets = action<GetSimilarPetsParams, Response, TDefaultAPIFailureType>(
  "GET_SIMILAR_PETS"
);

export type TFetchSimilarPetsRequest = ActionType<typeof fetchSimilarPets.request>;
export type TFetchSimilarPetsSuccess = ActionType<typeof fetchSimilarPets.success>;
export type TFetchSimilarPetsFail = ActionType<typeof fetchSimilarPets.failed>;
