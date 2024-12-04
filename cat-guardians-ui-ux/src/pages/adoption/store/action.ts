import { action } from "src/services/actions/action-creator";
import { TDefaultAPIFailureType } from "src/types/common";
import { ActionType } from "typesafe-actions";

import { AdoptionFormValues } from "../lib/adoptionFormYupSchema";

export type IAdoption = {
  id?: number;
  user?: string;
  cat?: string;
  request_date?: string;
  decision_date?: string;
  phone_number?: string;
  status?: string;
  notes?: string;
};

export type GetParams = {
  page?: number;
};

export type GetResponse = {
  data?: IAdoption[];
};

export const fetchAdoptionList = action<GetParams, GetResponse, TDefaultAPIFailureType>(
  "GET_ADOPTION_LIST"
);

export type TFetchAdoptionListRequest = ActionType<typeof fetchAdoptionList.request>;
export type TFetchAdoptionListSuccess = ActionType<typeof fetchAdoptionList.success>;
export type TFetchAdoptionListFailure = ActionType<typeof fetchAdoptionList.failed>;

export type CreateParams = AdoptionFormValues;

export type CreateResponse = {
  data?: AdoptionFormValues;
};

export const createAdoption = action<CreateParams, CreateResponse, TDefaultAPIFailureType>(
  "ADOPTION_CREATE"
);

export type TCreateAdoptionRequest = ActionType<typeof createAdoption.request>;
export type TCreateAdoptionSuccess = ActionType<typeof createAdoption.success>;
export type TCreateAdoptionFailure = ActionType<typeof createAdoption.failed>;

export const fetchClearAdoption = action<CreateParams, CreateResponse, TDefaultAPIFailureType>(
  "CLEAR_ADOPTION"
);

export type TFetchClearAdoptionSuccess = ActionType<typeof fetchClearAdoption.success>;

export type EditParams = {
  itemId?: string;
  data?: IAdoption;
};

export type EditResponse = {
  data?: IAdoption;
};

export const editAdoption = action<EditParams, EditResponse, TDefaultAPIFailureType>(
  "EDIT_ADOPTION_BY_ID"
);

export type TEditAdoptionRequest = ActionType<typeof editAdoption.request>;
export type TEditAdoptionSuccess = ActionType<typeof editAdoption.success>;
export type TEditAdoptionFail = ActionType<typeof editAdoption.failed>;

export type DeleteAdoptionParams = {
  itemId: string;
};

export type DeleteAdoptionResponse = DeleteAdoptionParams;

export const deleteAdoption = action<
  DeleteAdoptionParams,
  DeleteAdoptionResponse,
  TDefaultAPIFailureType
>("DELETE_ADOPTION");

export type TDeleteAdoptionRequest = ActionType<typeof deleteAdoption.request>;
export type TDeleteAdoptionSuccess = ActionType<typeof deleteAdoption.success>;
export type TDeleteAdoptionFail = ActionType<typeof deleteAdoption.failed>;
