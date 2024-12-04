import { action } from "src/services/actions/action-creator";
import { TDefaultAPIFailureType } from "src/types/common";
import { ActionType } from "typesafe-actions";

export type IUSER = {
  email: string;
  fullName?: string;
  id: string;
};

export type Params = {
  paramas?: string;
};

export type Response = {
  data?: IUSER;
};

export const fetchCheckAuth = action<Response, Params, TDefaultAPIFailureType>("CHECK_AUTH");

export type TFetchCheckAuthRequest = ActionType<typeof fetchCheckAuth.request>;
export type TFetchCheckAuthSuccess = ActionType<typeof fetchCheckAuth.success>;
export type TFetchCheckAuthFail = ActionType<typeof fetchCheckAuth.failed>;
