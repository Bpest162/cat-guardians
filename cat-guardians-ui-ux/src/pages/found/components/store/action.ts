import { action } from "src/services/actions/action-creator";
import { TDefaultAPIFailureType } from "src/types/common";
import { ActionType } from "typesafe-actions";

export type IFoundPets = {
  id?: number;
  user?: {
    id?: number;
    full_name?: string;
  };
  description?: string;
  address?: string;
  photo?: string;
  created_at?: string;
  status?: string;
  phone_number?: string;
};

export type GetParams = {
  page?: number;
};

export type GetResponse = {
  data?: IFoundPets[];
};

export const getFoundPets = action<GetParams, GetResponse, TDefaultAPIFailureType>(
  "GET_FOUND_PETS"
);
export type TGetFoundPetsRequest = ActionType<typeof getFoundPets.request>;
export type TGetFoundPetsSuccess = ActionType<typeof getFoundPets.success>;
export type TGetFoundPetsFailure = ActionType<typeof getFoundPets.failed>;

export type SubmitFormParams = {
  name: string;
  phone_number: string;
  email: string;
  address: string;
  description: string;
  photo: File;
};

export type PostParams = FormData;

export type PostResponse = {
  data: SubmitFormParams;
};

export const postFoundPets = action<PostParams, PostResponse, TDefaultAPIFailureType>(
  "POST_FOUND_PETS"
);
export type TPostFoundPetsRequest = ActionType<typeof postFoundPets.request>;
export type TPostFoundPetsSuccess = ActionType<typeof postFoundPets.success>;
export type TPostFoundPetsFailure = ActionType<typeof postFoundPets.failed>;

export const fetchClearFoundPets = action<PostParams, PostResponse, TDefaultAPIFailureType>(
  "CLEAR_FOUND"
);
export type TFetchClearFoundPetsSuccess = ActionType<typeof fetchClearFoundPets.success>;

export type EditParams = {
  itemId?: string;
  data?: IFoundPets;
};

export type EditResponse = {
  data?: IFoundPets;
};

export const editFoundPets = action<EditParams, EditResponse, TDefaultAPIFailureType>(
  "EDIT_FOUND_PETS"
);
export type TEditFoundPetsRequest = ActionType<typeof editFoundPets.request>;
export type TEditFoundPetsSuccess = ActionType<typeof editFoundPets.success>;
export type TEditFoundPetsFailure = ActionType<typeof editFoundPets.failed>;

export type DeleteFoundPetsParams = {
  itemId: string;
};

export type DeleteFoundPetsResponse = DeleteFoundPetsParams;

export const deleteFoundPets = action<
  DeleteFoundPetsParams,
  DeleteFoundPetsResponse,
  TDefaultAPIFailureType
>("DELETE_FOUND_PETS");
export type TDeleteFoundPetsRequest = ActionType<typeof deleteFoundPets.request>;
export type TDeleteFoundPetsSuccess = ActionType<typeof deleteFoundPets.success>;
export type TDeleteFoundPetsFail = ActionType<typeof deleteFoundPets.failed>;
