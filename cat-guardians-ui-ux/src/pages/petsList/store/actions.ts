import { ICategories } from "src/constants/filterList/filterList";
import { action } from "src/services/actions/action-creator";
import { TDefaultAPIFailureType } from "src/types/common";
import { ActionType } from "typesafe-actions";

import { IPets } from "../interfaces/pets";

export type Params = {
  page?: number;
  ordering?: string;
  filters?: { [key: string]: ICategories[] };
};

export type Response = {
  pets?: IPets[];
};

export const fetchPets = action<Params, Response, TDefaultAPIFailureType>("GET_PETS");

export type TFetchCatsRequest = ActionType<typeof fetchPets.request>;
export type TFetchCatsSuccess = ActionType<typeof fetchPets.success>;
export type TFetchCatsFail = ActionType<typeof fetchPets.failed>;

export type EditParams = {
  petId: string;
  petData: FormData;
};

export type EditResponse = {
  pets?: IPets;
};

export const updatePetById = action<EditParams, EditResponse, TDefaultAPIFailureType>(
  "EDIT_PET_BY_ID"
);

export type TUpdatePetByIdRequest = ActionType<typeof updatePetById.request>;
export type TUpdatePetByIdSuccess = ActionType<typeof updatePetById.success>;
export type TUpdatePetByIdFail = ActionType<typeof updatePetById.failed>;

export type CreateParams = {
  formData: FormData;
  currentPage: number;
};

export type CreateResponse = {
  data?: IPets;
};

export const createNewPets = action<CreateParams, CreateResponse, TDefaultAPIFailureType>(
  "CREATE_PET"
);

export type TCreatePetsRequest = ActionType<typeof createNewPets.request>;
export type TCreatePetsSuccess = ActionType<typeof createNewPets.success>;
export type TCreatePetsFail = ActionType<typeof createNewPets.failed>;

export type DeletePetParams = {
  petId: string;
};

export type DeletePetResponse = DeletePetParams;

export const deletePet = action<DeletePetParams, DeletePetResponse, TDefaultAPIFailureType>(
  "DELETE_PET"
);

export type TDeletePetRequest = ActionType<typeof deletePet.request>;
export type TDeletePetSuccess = ActionType<typeof deletePet.success>;
export type TDeletePetFail = ActionType<typeof deletePet.failed>;
